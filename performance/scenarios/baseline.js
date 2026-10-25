import { scenarioSettings } from '../config/environment.js';
import { setupAuthenticated, readOnlyCustomerFlow } from './common.js';
import { summaryHandler } from './summary.js';

const settings = scenarioSettings('baseline', 1, '45s');
export const options = {
  scenarios: { baseline: { executor: 'constant-vus', vus: settings.vus, duration: settings.duration } },
  thresholds: { http_req_failed: ['rate<0.05'] },
};
export function setup() { return setupAuthenticated(); }
export default function (data) { readOnlyCustomerFlow(data.cookie); }
export const handleSummary = summaryHandler('performance/results/baseline-summary.json', settings.name, settings.vus, settings.duration);

