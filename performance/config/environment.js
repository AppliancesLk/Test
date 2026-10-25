export const BASE_URL = (__ENV.BASE_URL || 'https://appliances-api-dev.graysky-2e2a33e6.centralindia.azurecontainerapps.io').replace(/\/$/, '');
export const TEST_USER_EMAIL = __ENV.TEST_USER_EMAIL || __ENV.PERF_TEST_USER_EMAIL || '';
export const TEST_USER_PASSWORD = __ENV.TEST_USER_PASSWORD || __ENV.PERF_TEST_USER_PASSWORD || '';
export const FRONTEND_ORIGIN = __ENV.FRONTEND_ORIGIN || 'http://localhost:5173';

export function scenarioSettings(name, vus, duration) {
  return { name, vus, duration };
}

