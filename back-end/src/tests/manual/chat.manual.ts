import "dotenv/config";

import type { AddressInfo } from "node:net";
import app from "../../app";
import type { UserRole } from "../../modules/auth/types";
import { ChatRepository } from "../../repositories/chatRepository";
import { UserRepository } from "../../repositories/userRepository";

interface TestUser {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  prompt: string;
  expected: string;
}

const testUsers: TestUser[] = [
  {
    role: "client",
    name: "Chat Test Client",
    email: `chat-client-${Date.now()}@fitnesssincera.local`,
    password: "chat-test-password",
    prompt: "Quero melhorar minha dieta e bater proteina.",
    expected: "nutricionista",
  },
  {
    role: "nutritionist",
    name: "Chat Test Nutritionist",
    email: `chat-nutritionist-${Date.now()}@fitnesssincera.local`,
    password: "chat-test-password",
    prompt: "Me ajude a montar uma dieta com substituicoes.",
    expected: "dieta personalizada",
  },
  {
    role: "trainer",
    name: "Chat Test Trainer",
    email: `chat-trainer-${Date.now()}@fitnesssincera.local`,
    password: "chat-test-password",
    prompt: "Preciso criar um treino de hipertrofia para um aluno.",
    expected: "treino sob medida",
  },
  {
    role: "admin",
    name: "Chat Test Admin",
    email: `chat-admin-${Date.now()}@fitnesssincera.local`,
    password: "chat-test-password",
    prompt: "Quais metricas devo olhar no painel admin?",
    expected: "painel admin",
  },
];

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
  console.log("===============================");
  console.log(" Fitness Sincera Chat API Test ");
  console.log("===============================");

  const server = app.listen(0, "127.0.0.1");
  const tokens: string[] = [];

  try {
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const { port } = server.address() as AddressInfo;
    const baseUrl = `http://127.0.0.1:${port}`;

    console.log(`Backend started locally at ${baseUrl}`);

    for (const testUser of testUsers) {
      const user = await UserRepository.create(testUser);
      const token = await UserRepository.createSession(user);
      tokens.push(token);

      const chat = await jsonRequest(baseUrl, "/api/chatbot/message", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: testUser.prompt }),
      });

      if (chat.response.status !== 200) {
        throw new Error(`${testUser.role} chat failed: ${JSON.stringify(chat.body)}`);
      }

      if (!String(chat.body.reply).toLowerCase().includes(testUser.expected)) {
        throw new Error(`${testUser.role} reply did not include expected context.`);
      }

      const history = await jsonRequest(baseUrl, "/api/chatbot/history", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (history.response.status !== 200) {
        throw new Error(`${testUser.role} history failed: ${JSON.stringify(history.body)}`);
      }

      if (!Array.isArray(history.body) || history.body.length !== 2) {
        throw new Error(`${testUser.role} history should include user and assistant messages.`);
      }

      console.log(`OK - ${testUser.role} chat reply and history validated`);

      await ChatRepository.deleteByUser(user.id);
    }

    console.log("");
    console.log("ALL TESTS PASSED");
  } finally {
    for (const token of tokens) {
      await UserRepository.revokeSession(token);
    }

    for (const testUser of testUsers) {
      await UserRepository.deleteByEmail(testUser.email);
    }

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
  console.error("CHAT API TEST FAILED");
  console.error(error);
  process.exit(1);
});
