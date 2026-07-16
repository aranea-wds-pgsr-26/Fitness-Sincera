import "dotenv/config";
import type { AddressInfo } from "node:net";
import app from "../../app";
import { UserRepository } from "../../repositories/userRepository";

function assertOk(condition: unknown, message: string): asserts condition { if (!condition) throw new Error(message); }
async function request(baseUrl: string, path: string, options: RequestInit = {}) {
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers: { "content-type": "application/json", ...(options.headers ?? {}) } });
  const text = await response.text();
  return { response, body: text ? JSON.parse(text) : null };
}

async function run() {
  const server = app.listen(0, "127.0.0.1");
  const tokens: string[] = [];
  let assignmentId: string | undefined;
  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;
    const [admin, nutritionist, trainer, client] = await Promise.all([
      UserRepository.findByEmail("admin@fitnesssincera.com"),
      UserRepository.findByEmail("sofia.almeida@fitnesssincera.com"),
      UserRepository.findByEmail("ricardo@fitnesssincera.com"),
      UserRepository.findByEmail("bennet02@gmail.com"),
    ]);
    assertOk(admin && nutritionist && trainer && client, "Default users are required. Run db:seed:users first.");
    const [adminToken, nutritionistToken, trainerToken] = await Promise.all([UserRepository.createSession(admin), UserRepository.createSession(nutritionist), UserRepository.createSession(trainer)]);
    tokens.push(adminToken, nutritionistToken, trainerToken);

    const assignment = await request(baseUrl, `/api/clients/${client.id}/assignments`, { method: "POST", headers: { authorization: `Bearer ${adminToken}` }, body: JSON.stringify({ professionalId: nutritionist.id, specialty: "nutrition" }) });
    assertOk(assignment.response.status === 201 && assignment.body.success, "Nutritionist assignment failed.");
    assignmentId = assignment.body.data.id;
    console.log("OK - Client assigned to nutritionist");

    const nutritionClients = await request(baseUrl, "/api/nutritionist/clients", { headers: { authorization: `Bearer ${nutritionistToken}` } });
    assertOk(nutritionClients.response.status === 200 && nutritionClients.body.data.some((item: { id: string }) => item.id === client.id), "Nutritionist cannot list assigned client.");
    console.log("OK - Nutritionist sees assigned client");

    const trainerClients = await request(baseUrl, "/api/trainer/clients", { headers: { authorization: `Bearer ${trainerToken}` } });
    assertOk(trainerClients.response.status === 200 && !trainerClients.body.data.some((item: { id: string }) => item.id === client.id), "Trainer can see an unassigned client.");
    console.log("OK - Trainer isolation verified");

    const removed = await request(baseUrl, `/api/clients/${client.id}/assignments/${assignmentId}`, { method: "DELETE", headers: { authorization: `Bearer ${adminToken}` } });
    assertOk(removed.response.status === 204, "Assignment cleanup failed.");
    assignmentId = undefined;
    console.log("OK - Assignment removed");
    console.log("ALL TESTS PASSED");
  } finally {
    if (assignmentId) await request("http://127.0.0.1:" + ((server.address() as AddressInfo | null)?.port ?? 0), `/api/clients/placeholder/assignments/${assignmentId}`, { method: "DELETE" }).catch(() => undefined);
    await Promise.all(tokens.map((token) => UserRepository.revokeSession(token).catch(() => undefined)));
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}
run().catch((error) => { console.error("PROFESSIONAL CLIENT TEST FAILED", error); process.exit(1); });