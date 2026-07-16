import "dotenv/config";
import type { AddressInfo } from "node:net";
import app from "../../app";
import { UserRepository } from "../../repositories/userRepository";
async function run() {
 const server = app.listen(0, "127.0.0.1"); let token = "";
 try { await new Promise<void>((resolve) => server.once("listening", resolve)); const user = await UserRepository.findByEmail("bennet02@gmail.com"); if (!user) throw new Error("Default client missing"); token = await UserRepository.createSession(user); const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`; const headers={ authorization:`Bearer ${token}`, "content-type":"application/json"}; const initial=await fetch(`${base}/api/tracking/today`,{headers}); if(!initial.ok) throw new Error("Tracking read failed"); const before=(await initial.json()).data.waterMl; const updated=await fetch(`${base}/api/tracking/water`,{method:"POST",headers,body:JSON.stringify({amount:250})}); const data=await updated.json(); if(!updated.ok||Number(data.data.waterMl)!==Number(before)+250) throw new Error("Water update failed"); const restored=await fetch(`${base}/api/tracking/today`,{method:"PUT",headers,body:JSON.stringify({waterMl:before})}); if(!restored.ok) throw new Error("Water cleanup failed"); console.log("ALL TESTS PASSED"); } finally { if(token) await UserRepository.revokeSession(token); await new Promise<void>((resolve,reject)=>server.close((e)=>e?reject(e):resolve())); }
}
run().catch((error)=>{console.error(error);process.exit(1)});