import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, TEST_USER_EMAIL, TEST_USER_PASSWORD } from '../config/environment.js';
import { apiUrl, jsonBody } from './request.js';

export function login() {
  if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
    throw new Error('Set TEST_USER_EMAIL and TEST_USER_PASSWORD before running performance tests.');
  }

  const response = http.post(
    apiUrl('/auth/login'),
    JSON.stringify({ username: TEST_USER_EMAIL, password: TEST_USER_PASSWORD }),
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      tags: { endpoint: '/auth/login' },
    },
  );

  check(response, {
    'login: status 201 or 200': (r) => r.status === 200 || r.status === 201,
    'login: user returned': (r) => Boolean(jsonBody(r)?.user),
    'login: session cookie returned': (r) => Boolean(r.cookies.appliances_session?.[0]?.value),
  });

  if (response.status !== 200 && response.status !== 201) {
    throw new Error(`Login failed with HTTP ${response.status}`);
  }

  const cookie = response.cookies.appliances_session?.[0]?.value;
  if (!cookie) throw new Error('Login succeeded but no appliances_session cookie was returned.');
  return `appliances_session=${cookie}`;
}

export function validateSession(cookie) {
  const response = http.get(`${BASE_URL}/auth/profile`, {
    headers: { Accept: 'application/json', Cookie: cookie },
    tags: { endpoint: '/auth/profile' },
  });
  check(response, {
    'profile: authenticated': (r) => r.status === 200,
    'profile: JSON body': (r) => jsonBody(r) !== null,
  });
  if (response.status !== 200) throw new Error(`Authenticated profile check failed with HTTP ${response.status}`);
}

