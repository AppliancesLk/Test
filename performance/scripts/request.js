import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../config/environment.js';

export function apiUrl(path) {
  return `${BASE_URL}${path}`;
}

export function publicHeaders() {
  return { Accept: 'application/json' };
}

export function authenticatedHeaders(cookie) {
  return {
    Accept: 'application/json',
    Cookie: cookie,
  };
}

export function mutationHeaders(cookie) {
  return {
    ...authenticatedHeaders(cookie),
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
}

export function jsonBody(response) {
  try {
    return response.json();
  } catch (_) {
    return null;
  }
}

export function checkJson(response, name, expectedStatus = 200) {
  return check(response, {
    [`${name}: status ${expectedStatus}`]: (r) => r.status === expectedStatus,
    [`${name}: JSON body`]: (r) => jsonBody(r) !== null,
  });
}

export function get(path, name, headers = publicHeaders()) {
  const response = http.get(apiUrl(path), { headers, tags: { endpoint: path } });
  checkJson(response, name);
  return response;
}

