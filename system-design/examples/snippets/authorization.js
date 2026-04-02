module.exports = register => {
  register('authorization', () => {
    function authorize({ roles }, requiredRole) {
      return roles.includes(requiredRole);
    }
    return authorize;
  }, 'Admin dashboard gating access to billing exports by role.');
};
