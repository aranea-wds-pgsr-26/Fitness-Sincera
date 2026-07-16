import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../back-end/src/database/client";
import { fitnessFoods } from "../back-end/src/database/schema";

const API_URL = new URL("https://world.openfoodfacts.org/cgi/search.pl");
API_URL.searchParams.set("action", "process");
API_URL.searchParams.set("json", "true");
API_URL.searchParams.set("page_size", "100");
API_URL.searchParams.set("countries_tags_en", "brazil");
API_URL.searchParams.set("fields", "code,product_name,brands,categories,nutriments");

const shouldWrite = process.argv.includes("--write");
const maxRecords = Math.min(Math.max(Number(process.env.FOOD_SEED_LIMIT ?? 60), 1), 100);

type OpenFoodFactsProduct = {
  code?: string;
  product_name?: string;
  brands?: string;
  categories?: string;
  nutriments?: Record<string, number | undefined>;
};

function nutrition(product: OpenFoodFactsProduct, key: string) {
  return Number(product.nutriments?.[`${key}_100g`] ?? 0);
}

async function fetchProducts() {
  let lastStatus = 0;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(API_URL, { headers: { "User-Agent": "FitnessSincera/1.0 (food-seed)" } });
    if (response.ok) return response;
    lastStatus = response.status;
    if (response.status !== 429 && response.status < 500) break;
    await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));
  }
  throw new Error(`Open Food Facts request failed after retries: ${lastStatus}`);
}
async function run() {
  const response = await fetchProducts();
  if (!response.ok) throw new Error(`Open Food Facts request failed: ${response.status}`);

  const payload = await response.json() as { products?: OpenFoodFactsProduct[] };
  const products = (payload.products ?? [])
    .filter((product) => product.code && product.product_name?.trim())
    .slice(0, maxRecords);

  let inserted = 0;
  let skipped = 0;

  for (const product of products) {
    const externalId = product.code!;
    const [existing] = await db
      .select({ id: fitnessFoods.id })
      .from(fitnessFoods)
      .where(and(eq(fitnessFoods.source, "open_food_facts"), eq(fitnessFoods.externalId, externalId)))
      .limit(1);

    if (existing) {
      skipped += 1;
      continue;
    }

    if (shouldWrite) {
      await db.insert(fitnessFoods).values({
        name: product.product_name!.trim(),
        brand: product.brands?.trim() || null,
        category: product.categories?.split(",")[0]?.trim() || null,
        servingSize: 100,
        servingUnit: "g",
        calories: nutrition(product, "energy-kcal"),
        protein: nutrition(product, "proteins"),
        carbs: nutrition(product, "carbohydrates"),
        fat: nutrition(product, "fat"),
        fiber: nutrition(product, "fiber"),
        sodium: nutrition(product, "sodium"),
        source: "open_food_facts",
        externalId,
      });
      inserted += 1;
    }
  }

  console.log(`Open Food Facts: ${products.length} products read, ${skipped} already present, ${shouldWrite ? `${inserted} inserted` : "dry run only"}.`);
  if (!shouldWrite) console.log("Run with --write to persist valid products in Supabase.");
}

run().catch((error) => { console.error("FOOD SEED FAILED", error); process.exit(1); });