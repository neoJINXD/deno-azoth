import { connectWebSocket } from 'https://deno.land/std/ws/mod.ts';

const GATEWAY = 'wss://gateway.discord.gg/?v=6&encoding=json';
const token = 'xsN7rKHIvDORHgR2f_sDUZ2WCkgv5o2P';

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
          d: null
        };

        setInterval(() => {
          console.log('Sending heartbeat...');
          socket.send(JSON.stringify(p));
        }, heartbeat_interval);

        break;
    }
    console.log(m);
  }

} catch (err) {
  console.log(err);
}