import { scenarioSettings } from '../config/environment.js';
import { setupAuthenticated, readOnlyCustomerFlow } from './common.js';
import { summaryHandler } from './summary.js';

const settings = scenarioSettings('load-25', 25, '30s');
export const options = {
  scenarios: { load: { executor: 'ramping-vus', startVUs: 0, stages: [{ duration: '15s', target: 25 }, { duration: settings.duration, target: 25 }, { duration: '10s', target: 0 }], gracefulRampDown: '5s' } },
  thresholds: { http_req_failed: ['rate<0.05'] },
};
export function setup() { return setupAuthenticated(); }
export default function (data) { readOnlyCustomerFlow(data.cookie); }
export const handleSummary = summaryHandler('performance/results/load-25-summary.json', settings.name, settings.vus, settings.duration);

