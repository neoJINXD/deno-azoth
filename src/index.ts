import { connectWebSocket } from 'https://deno.land/std/ws/mod.ts';
import "https://deno.land/x/dotenv/load.ts";


const GATEWAY = 'wss://gateway.discord.gg/?v=6&encoding=json';
const TOKEN = Deno.env.get('TOKEN');

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

        //TODO THIS PART IS ERRORING OUT, 
        // SyntaxError: Unexpected token o in JSON at position 1
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
        socket.send(JSON.stringify(identifyResponse));

        break;
    }
    console.log(payload);
  }

} catch (err) {
  console.log(err);
}