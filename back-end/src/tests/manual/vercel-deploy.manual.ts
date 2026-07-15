import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import type { AddressInfo } from "node:net";
import { createExpressApp } from "../../../../server/app";
import { SiteLeadRepository } from "../../repositories/siteLeadRepository";
import { UserRepository } from "../../repositories/userRepository";

async function requestJson(baseUrl: string, pathName: string) {
  const response = await fetch(`${baseUrl}${pathName}`);
  const body = await response.json();
  return { response, body };
}

async function jsonRequest(
  baseUrl: string,
  pathName: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${baseUrl}${pathName}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const body = await response.json();
  return { response, body };
}

async function run() {
  console.log("======================================");
  console.log(" Fitness Sincera Vercel Deploy Check ");
  console.log("======================================");

  const publicIndex = path.resolve("dist", "public", "index.html");

  if (!fs.existsSync(publicIndex)) {
    throw new Error("dist/public/index.html not found. Run npm.cmd run build first.");
  }

  console.log("OK - Static build output found");

  await SiteLeadRepository.ensureTable();

  const { httpServer } = await createExpressApp({ clientMode: "none" });
  const leadEmail = `vercel-deploy-${Date.now()}@fitnesssincera.local`;
  let token: string | undefined;

  try {
    await new Promise<void>((resolve) => {
      httpServer.listen(0, "127.0.0.1", resolve);
    });

    const { port } = httpServer.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;

    const health = await requestJson(baseUrl, "/api/health");

    if (health.response.status !== 200 || health.body.status !== "ok") {
      throw new Error(`Vercel API health failed: ${JSON.stringify(health.body)}`);
    }

    console.log("OK - Serverless API health route responds");

    const submitted = await jsonRequest(baseUrl, "/api/public/leads", {
      method: "POST",
      body: JSON.stringify({
        name: "Vercel Deploy Test Lead",
        email: leadEmail,
        audience: "client",
        interest: "complete",
        message: "Validacao local do fluxo Vercel + Supabase.",
      }),
    });

    if (submitted.response.status !== 201 || !submitted.body.success) {
      throw new Error(`Vercel public lead failed: ${JSON.stringify(submitted.body)}`);
    }

    console.log("OK - Serverless public lead route writes to Supabase");

    const admin = await UserRepository.findByEmail("admin@fitnesssincera.com");

    if (!admin) {
      throw new Error("Default admin user not found.");
    }

    token = await UserRepository.createSession(admin);

    const leads = await jsonRequest(baseUrl, "/api/admin/site-leads", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (leads.response.status !== 200 || !leads.body.success) {
      throw new Error(`Vercel admin leads failed: ${JSON.stringify(leads.body)}`);
    }

    const createdLead = leads.body.data.find((lead: { email: string }) => lead.email === leadEmail);

    if (!createdLead) {
      throw new Error("Created public lead was not visible through admin API.");
    }

    console.log("OK - Serverless admin route reads Supabase leads");
    console.log("");
    console.log("ALL TESTS PASSED");
  } finally {
    if (token) {
      await UserRepository.revokeSession(token);
    }

    await SiteLeadRepository.deleteByEmail(leadEmail);

    await new Promise<void>((resolve, reject) => {
      httpServer.close((error?: Error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

run().catch((error) => {
  console.error("");
  console.error("VERCEL DEPLOY CHECK FAILED");
  console.error(error);
  process.exit(1);
});
