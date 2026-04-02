module.exports = register => {
  register('loadBalancers', () => {
    const servers = ['api-1', 'api-2', 'api-3'];
    let pointer = 0;
    return function routeRequest(userId) {
      const target = servers[pointer % servers.length];
      pointer += 1;
      return { userId, target };
    };
  }, 'Fintech transaction API using round-robin load balancing across stateless nodes.');
};
