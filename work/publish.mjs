import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
process.stdout.write('Ready for credentials on stdin\n');
let raw='';for await(const chunk of process.stdin){raw+=chunk;if(raw.includes('\n'))break}
const c=JSON.parse(raw);const cwd=process.cwd();
const git='/Users/david/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/git';
function run(args,env={}){const r=spawnSync(git,args,{cwd,env:{...process.env,...env},encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr);return r.stdout.trim()}
run(['init','-b',c.branch]);run(['config','user.name','Codex']);run(['config','user.email','codex@openai.com']);run(['add','.']);run(['commit','-m','Create Murder Mystery 2 community page']);run(['remote','set-url','origin',c.remote_url]);run(['push','-u','origin',c.branch],{GIT_CONFIG_COUNT:'1',GIT_CONFIG_KEY_0:'http.extraHeader',GIT_CONFIG_VALUE_0:'Authorization: Bearer '+c.token,GIT_TERMINAL_PROMPT:'0'});
const sha=run(['rev-parse','HEAD']);const archive=cwd+'/../../work/mm2-deploy.tar.gz';const t=spawnSync('/usr/bin/tar',['-czf',archive,'.openai/hosting.json','dist'],{cwd,encoding:'utf8'});if(t.status!==0)throw new Error(t.stderr);console.log(JSON.stringify({commit_sha:sha,archive,project_id:JSON.parse(fs.readFileSync('.openai/hosting.json')).project_id}));
