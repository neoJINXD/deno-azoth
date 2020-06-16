FROM hayd/alpine-deno:1.1.0

# EXPOSE 
WORKDIR /azoth

USER deno

COPY . .

RUN deno cache src/index.ts

CMD [ "run", "--allow-net", "--allow-env", "--allow-read", "src/index.ts" ]