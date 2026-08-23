import { access, cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, '..');

const banner = `\nVIBE//BREAKER\nYour AI said "it works." Make it prove it.\n`;

const masterPrompt = `Run the full VibeBreaker 20-Pass Protocol defined in .vibebreaker/AUDIT_PROTOCOL.md.\nStay read-only. Execute passes 01 through 20 in order.\nWrite raw pass results under .vibebreaker/raw/ and the final report to .vibebreaker/FINAL_REPORT.md.\nDo not fix anything until the final report is complete.\nPass 20 is the adversarial verifier and is the only pass allowed to finalize finding status.`;

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyRequired(source, target) {
  if (!(await exists(source))) throw new Error(`Missing packaged file: ${source}`);
  await cp(source, target, { recursive: true, force: true });
}

async function initProject(cwd) {
  const target = join(cwd, '.vibebreaker');
  await mkdir(target, { recursive: true });
  await mkdir(join(target, 'raw'), { recursive: true });

  await copyRequired(join(packageRoot, 'AUDIT_PROTOCOL.md'), join(target, 'AUDIT_PROTOCOL.md'));
  await copyRequired(join(packageRoot, 'PROMPT_PACK.md'), join(target, 'PROMPT_PACK.md'));
  await copyRequired(join(packageRoot, 'prompts'), join(target, 'prompts'));
  await copyRequired(join(packageRoot, 'templates'), join(target, 'templates'));

  const config = {
    protocol: 'VibeBreaker 20-Pass Protocol',
    version: '0.2.0',
    mode: 'FULL',
    output: '.vibebreaker/FINAL_REPORT.md',
    readOnlyAudit: true
  };
  await writeFile(join(target, 'config.json'), `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  await writeFile(join(target, 'AGENT_PROMPT.txt'), `${masterPrompt}\n`, 'utf8');

  console.log(banner);
  console.log('Initialized .vibebreaker/ in this project.');
  console.log('\nNext:');
  console.log('  npx vibebreaker prompt');
}

async function printPrompt(cwd) {
  const localPrompt = join(cwd, '.vibebreaker', 'AGENT_PROMPT.txt');
  console.log(banner);
  if (await exists(localPrompt)) {
    console.log((await readFile(localPrompt, 'utf8')).trim());
  } else {
    console.log(masterPrompt);
    console.log('\nTip: run `npx vibebreaker init` first.');
  }
}

async function doctor(cwd) {
  const checks = [
    ['.vibebreaker', await exists(join(cwd, '.vibebreaker'))],
    ['AUDIT_PROTOCOL.md', await exists(join(cwd, '.vibebreaker', 'AUDIT_PROTOCOL.md'))],
    ['20 prompt pack', await exists(join(cwd, '.vibebreaker', 'prompts', '20-verification-false-positive-filter.md'))],
    ['agent prompt', await exists(join(cwd, '.vibebreaker', 'AGENT_PROMPT.txt'))]
  ];

  console.log(banner);
  console.log('PROJECT CHECK\n');
  for (const [label, ok] of checks) {
    console.log(`${ok ? '✓' : '✕'} ${label}`);
  }

  if (checks.every(([, ok]) => ok)) {
    console.log('\nREADY — give the generated prompt to your coding agent.');
    return;
  }

  console.log('\nNOT READY — run `npx vibebreaker init`.');
  process.exitCode = 1;
}

function help() {
  console.log(banner);
  console.log(`Usage:\n  vibebreaker <command>\n\nCommands:\n  init      Install the audit protocol into .vibebreaker/\n  prompt    Print the master prompt to give your coding agent\n  doctor    Verify the local VibeBreaker setup\n  help      Show this help\n\nExamples:\n  npx vibebreaker init\n  npx vibebreaker prompt\n  npx vibebreaker doctor`);
}

export async function runCli(args, cwd = process.cwd()) {
  const [command = 'help'] = args;

  switch (command) {
    case 'init':
      return initProject(cwd);
    case 'prompt':
      return printPrompt(cwd);
    case 'doctor':
      return doctor(cwd);
    case 'help':
    case '--help':
    case '-h':
      return help();
    case '--version':
    case '-v':
      console.log('0.2.0');
      return;
    default:
      help();
      throw new Error(`Unknown command: ${command}`);
  }
}
