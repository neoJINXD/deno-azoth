import { connectWebSocket } from 'https://deno.land/std/ws/mod.ts';
import { writeFile } from './writer.ts'
import { TOKEN, GATEWAY, API } from './config.ts';

//import { existsSync, readJsonSync, writeJsonSync } from "https://deno.land/std/fs/mod.ts"

let isReady = false;

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
          if (t === 'MESSAGE_CREATE' && isReady){
            //only send message if the last message was not from the bot itself
            //otherwise this the bots own response with trigger another post request to occure
            if (d.author.username !== 'neo bot'){ //TODO should not have bot name hard coded
              if (d.content[0] === '\`'){
                const CHANNEL_ID = d.channel_id;
                console.log(`You just said: ${d.content} in channel: ${CHANNEL_ID}`);
                console.log(payload);
                
                //right now just sending back whatever was last said
                
                let content;
                if (d.content === '\`ping'){
                  content = 'fuck';
                } else {
                  content = 'ok boomer'
                }

                const response = await fetch(`${API}/channels/${CHANNEL_ID}/messages`, {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bot ${TOKEN}`
                  },
                  body: JSON.stringify({
                    'content': content,
                    'tts': false
                  })
                });
                const json = await response.json();
                console.log(json);
              }
            }
            
          }
          else if (t === 'READY'){
            console.log(payload);
            isReady = true;
          }
    }
  }

} catch (err) {
  console.log(err);
}