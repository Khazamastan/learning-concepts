import { FeatureFlagClient } from './featureFlagClient.js';

const client = new FeatureFlagClient({
  'ui:new-dashboard': { enabled: true },
  'beta:smart-search': {
    enabled: true,
    rollout: 0.3,
  },
});

const userContext = { id: '123', email: 'user@example.com' };

console.log('New dashboard enabled?', client.isEnabled('ui:new-dashboard', userContext));
console.log('Smart search enabled?', client.isEnabled('beta:smart-search', userContext));
