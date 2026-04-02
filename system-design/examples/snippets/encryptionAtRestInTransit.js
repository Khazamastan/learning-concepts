module.exports = register => {
  register('encryptionAtRestInTransit', () => {
    const crypto = require('crypto');
    function encrypt(data, secret) {
      const cipher = crypto.createCipheriv('aes-256-ctr', secret.slice(0, 32), Buffer.alloc(16, 0));
      return Buffer.concat([cipher.update(data), cipher.final()]);
    }
    function decrypt(payload, secret) {
      const decipher = crypto.createDecipheriv('aes-256-ctr', secret.slice(0, 32), Buffer.alloc(16, 0));
      return Buffer.concat([decipher.update(payload), decipher.final()]);
    }
    return { encrypt, decrypt };
  }, 'Healthcare platform protecting PHI both on disk and across APIs.');
};
