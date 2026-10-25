import { get } from './request.js';

export function listRepairs(cookie) {
  return get('/repairs', 'repairs: history', {
    Accept: 'application/json',
    Cookie: cookie,
  });
}

