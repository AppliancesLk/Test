# Appliances.lk performance tests

This directory contains a small, read-heavy k6 suite for the staging API. It measures public catalog reads and authenticated customer reads without creating orders, repairs, cart items, payments, emails, SMS messages, uploads, or AI requests.

## Prerequisites

Install [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) and use a dedicated staging customer account. Do not point these tests at production without explicit approval.

Set credentials in the shell; they are never stored in the repository:

```powershell
$env:TEST_USER_EMAIL = 'dedicated-performance-user@example.com'
$env:TEST_USER_PASSWORD = 'use-a-secret-from-your-password-manager'
$env:BASE_URL = 'https://appliances-api-dev.graysky-2e2a33e6.centralindia.azurecontainerapps.io'
```

`BASE_URL` defaults to the staging API above. `PERF_TEST_USER_EMAIL` and `PERF_TEST_USER_PASSWORD` are accepted aliases for CI.

## Run locally

Run from the repository root:

```sh
k6 run performance/scenarios/smoke.js
k6 run performance/scenarios/baseline.js
k6 run performance/scenarios/load-10.js
k6 run performance/scenarios/load-25.js
k6 run performance/scenarios/load-50.js
```

Smoke uses one VU for 15 seconds. Baseline uses one VU for 45 seconds. The load scenarios ramp up to 10, 25, and 50 VUs, hold for 30 seconds, then ramp down. Each setup logs in once and shares the resulting session cookie with the read-only VUs, avoiding repeated login attempts and rate-limit noise.

JSON summaries are written to `performance/results/`. They include average, median, p95, p99, failed-request rate, request count, request rate, VUs, duration, timestamp, and the base URL. Compare `metrics.httpReqDurationMs.avg` from `baseline-summary.json` and `load-50-summary.json` with:

```text
((load50Average - baselineAverage) / baselineAverage) * 100
```

The 10% degradation requirement is a reporting comparison, not an automatic k6 threshold. A low `httpReqFailedRate` indicates transport/application failures; p95 and p99 show tail latency while average and median show typical latency.

## GitHub Actions

`.github/workflows/performance-test.yml` is manual-only (`workflow_dispatch`). It runs smoke, baseline, 10-user, 25-user, and 50-user tests in order, then uploads all JSON results. Configure repository secrets `PERF_TEST_USER_EMAIL` and `PERF_TEST_USER_PASSWORD`. The workflow only permits the checked-in staging target.

