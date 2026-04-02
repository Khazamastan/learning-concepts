module.exports = register => {
  register('authentication', () => {
    const users = new Map([
      ['alice@example.com', { passwordHash: 'hash:alice', roles: ['user'] }],
    ]);
    function authenticate(email, passwordHash) {
      const record = users.get(email);
      if (!record) return false;
      return record.passwordHash === passwordHash;
    }
    return authenticate;
  }, 'Customer portal validating credentials before issuing JWTs.');
};
