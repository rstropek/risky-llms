import { config } from "./config.js";

function start(): void {
  if (!config.apiKey) {
    throw new Error("Missing API_KEY");
  }

  console.log("App started in mode:", config.mode);
}

start();
