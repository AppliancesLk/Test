import { BASE_URL } from '../config/environment.js';

export function summaryHandler(file, testName, vus, duration) {
  return function handleSummary(data) {
    const durationMetric = data.metrics.http_req_duration?.values || {};
    const failedMetric = data.metrics.http_req_failed?.values || {};
    const requestMetric = data.metrics.http_reqs?.values || {};
    const summary = {
      testName,
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      virtualUsers: vus,
      scenarioDuration: duration,
      metrics: {
        httpReqDurationMs: {
          avg: durationMetric.avg ?? null,
          median: durationMetric.med ?? null,
          p95: durationMetric['p(95)'] ?? null,
          p99: durationMetric['p(99)'] ?? null,
        },
        httpReqFailedRate: failedMetric.rate ?? null,
        requestCount: requestMetric.count ?? null,
        requestRate: requestMetric.rate ?? null,
        maxVUs: data.metrics.vus?.values?.max ?? vus,
      },
    };
    return { [file]: JSON.stringify(summary, null, 2) };
  };
}

