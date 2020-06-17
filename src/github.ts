import { writeFile, writeJson } from './writer.ts';
// import { writeJson, writeJsonSync } from "https://deno.land/std/fs/mod.ts";
import { BOT_URI, GITHUB_TOKEN } from './config.ts';

const example: string = 'https://github.com/neoJINXD/test';

const GITHUB_API: string = 'https://api.github.com';


// Getting the username and repo name from a github repo url
const url: string[] = example.split(/[/:]/g).filter((e) => e != '');
const [ scheme, domain, username, repo ] = url;

console.log(url);


try {
  // getting info for the repo
  {
  const result = await fetch(`${GITHUB_API}/repos/${username}/${repo}`);
  
  const jsonGet = await result.json();
  // console.log(jsonGet);
  }
  // writeJson('./github-response.json', json);


  //create a webhook to the repo provided
  const hookCreateBody = {
    config: {
      'url': BOT_URI,
      'content_type': 'json',
      'events': [
        "push",
        "pull_requests",
        "issues"
      ],
      'active': true
    }
  };

  const result = await fetch(`${GITHUB_API}/repos/${username}/${repo}/hooks`, {
    method: 'POST',
    headers: {
      'Content-type': 'json',
      'Authorization': `token ${GITHUB_TOKEN}`
    },
    body: JSON.stringify(hookCreateBody)
  });

  const json = await result.json();
  console.log(json);
  
  //listen to said webhook
  // by running an http server
  // preferably with ssl

  //will need to parse out 
  //iterate over commits
  //commits.committer.name
  //commits.message



} catch (err) {
  console.log(err);
}




