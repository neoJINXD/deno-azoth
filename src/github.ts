import { writeFile } from './writer.ts';
import { writeJson, writeJsonSync } from "https://deno.land/std/fs/mod.ts";

const example: string = 'https://github.com/neoJINXD/deno-azoth';

const GITHUB_API: string = 'https://api.github.com';


// Getting the username and repo name from a github repo url
const url: string[] = example.split(/[/:]/g).filter((e) => e != '');
const [ scheme, domain, username, repo ] = url;

// console.log(url);


try {
  const result = await fetch(`${GITHUB_API}/repos/${username}/${repo}`);
  
  const json = await result.json();
  
  console.log(json);
  // writeFile('./github-response.json', json);
  await writeJson('./github-response.json', json);


  //create a webhook to the repo provided
  
  
  //listen to said webhook



} catch (err) {
  console.log(err);
}




