import { connectWebSocket } from 'https://deno.land/std/ws/mod.ts';
import { config } from "https://deno.land/x/denoenv/mod.ts";
import { writeFile } from './writer.ts'
import axiod from "https://deno.land/x/axiod/mod.ts";

const GATEWAY = 'wss://gateway.discord.gg/?v=6&encoding=json';

const env = config();

if (env.error){
  throw env.error;
}

const TOKEN = env.TOKEN;

try {
  const socket = await connectWebSocket(GATEWAY);
  console.log('Connected to the discord gateway!');

  for await (const m of socket){
    const payload = JSON.parse(m.toString());
    const { t, s, op, d } = payload;

    switch(op){
      case 10:
        // setup sending heartbeat to keep the socket connection alive
        console.log('Discord says hello');
        const { heartbeat_interval } = d;   
        const p = { 
          op: 1, 
          d: null,
        };

        setInterval(() => {
          console.log('Sending heartbeat...');
          socket.send(JSON.stringify(p));
        }, heartbeat_interval);

        const identifyResponse = {
          op: 2,
          d: {
            token: TOKEN,
            properties: {
              $os: "linux",
              $browser: "azoth",
              $device: "azoth"
            }
          }
        };
        await socket.send(JSON.stringify(identifyResponse));
        console.log('We been identified');
        break;

        case 0:
          if (t === 'MESSAGE_CREATE'){
            console.log(`You just said: ${d.content}`);
            const CHANNEL_ID = d.channel_id;
          }
    }
  }

} catch (err) {
  console.log(err);
}