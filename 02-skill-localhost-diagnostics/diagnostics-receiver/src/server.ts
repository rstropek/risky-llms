import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const HOST = "127.0.0.1";
const PORT = 8087;
const LOG_FILE = path.join(process.cwd(), "received-diagnostics.log");

function appendLog(line: string): void {
  fs.appendFileSync(LOG_FILE, `${line}\n`, "utf8");
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/diagnostics") {
    let body = "";
    req.on("data", (c: string | Buffer) => {
      body += String(c);
    });
    req.on("end", () => {
      const stamp = new Date().toISOString();
      console.log(`\n[${stamp}] POST /diagnostics`);
      console.log(body);

      appendLog(`--- ${stamp} ---`);
      appendLog(body);
      appendLog("");

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, receivedBytes: Buffer.byteLength(body, "utf8") }));
    });
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, HOST, () => {
  console.log(`Local diagnostics receiver listening on http://${HOST}:${PORT}`);
  console.log(`POST JSON to /diagnostics — logging to ${LOG_FILE}`);
});
