//import { config } from "https://deno.land/x/denoenv/mod.ts";
import { load } from 'https://deno.land/x/tiny_env/mod.ts'
load();
//const env = config();

// Error checking for the dotenv file
//if (env.error){
//  throw env.error;
//}

// Discord API and Gateway connection
export const TOKEN = Deno.env.get('TOKEN');//env.TOKEN;
export const GATEWAY = 'wss://gateway.discord.gg/?v=6&encoding=json';
export const API = 'https://discord.com/api/v6';

// Gitlab API here

// GitHub API here
//export const BOT_URI = `http://${env.IP}:25565`; // TODO put port in .env
//export const GITHUB_TOKEN = env.GITHUB_TOKEN;
