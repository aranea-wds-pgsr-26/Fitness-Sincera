import "dotenv/config";

import type { AddressInfo } from "node:net";
import app from "../../app";
import { SiteLeadRepository } from "../../repositories/siteLeadRepository";
import { UserRepository } from "../../repositories/userRepository";

async function jsonRequest(
  baseUrl: string,
  path: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${baseUrl}${path}`, {
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
  console.log(" Fitness Sincera Public Site API Test ");
  console.log("======================================");

  await SiteLeadRepository.ensureTable();

  const server = app.listen(0, "127.0.0.1");
  const leadEmail = `public-site-${Date.now()}@fitnesssincera.local`;
  let token: string | undefined;

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;

    const submitted = await jsonRequest(baseUrl, "/api/public/leads", {
      method: "POST",
      body: JSON.stringify({
        name: "Public Site Test Lead",
        email: leadEmail,
        phone: "(11) 99999-0000",
        audience: "client",
        interest: "complete",
        message: "Quero testar o fluxo publico da Sprint 14.",
      }),
    });

    if (submitted.response.status !== 201 || !submitted.body.success) {
      throw new Error(`Public lead submission failed: ${JSON.stringify(submitted.body)}`);
    }

    console.log("OK - Public lead submitted");

    const admin = await UserRepository.findByEmail("admin@fitnesssincera.com");

    if (!admin) {
      throw new Error("Default admin user not found.");
    }

    token = await UserRepository.createSession(admin);

    const adminLeads = await jsonRequest(baseUrl, "/api/admin/site-leads", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (adminLeads.response.status !== 200 || !adminLeads.body.success) {
      throw new Error(`Admin site leads failed: ${JSON.stringify(adminLeads.body)}`);
    }

    const lead = adminLeads.body.data.find((item: { email: string }) => item.email === leadEmail);

    if (!lead) {
      throw new Error("Submitted lead was not visible to admin.");
    }

    console.log("OK - Admin can list public site leads");
    console.log("");
    console.log("ALL TESTS PASSED");
  } finally {
    if (token) {
      await UserRepository.revokeSession(token);
    }

    await SiteLeadRepository.deleteByEmail(leadEmail);

    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

run().catch((error) => {
  console.error("");
  console.error("PUBLIC SITE API TEST FAILED");
  console.error(error);
  process.exit(1);
});
