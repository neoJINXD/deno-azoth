import { config } from "https://deno.land/x/denoenv/mod.ts";
const env = config();

// Error checking for the dotenv file
if (env.error){
  throw env.error;
}

// Discord API and Gateway connection
export const TOKEN = env.TOKEN;
export const BOT_URI = env.IP;

export const GATEWAY = 'wss://gateway.discord.gg/?v=6&encoding=json';
export const API = 'https://discord.com/api/v6';


// Gitlab API here


// GitHub API here


