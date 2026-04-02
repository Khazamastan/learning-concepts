import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const keyPath = join(__dirname, 'key.pem');
const certPath = join(__dirname, 'cert.pem');

if (existsSync(keyPath) && existsSync(certPath)) {
  console.log('Certificates already exist. Delete them if you need to regenerate.');
  process.exit(0);
}

const command = 'openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/CN=localhost"';

try {
  execSync(command, { stdio: 'inherit', cwd: __dirname });
  console.log(`Created key.pem and cert.pem in ${__dirname}`);
} catch (error) {
  console.error('Failed to generate certificate. Ensure OpenSSL is installed.', error);
  process.exit(1);
}
