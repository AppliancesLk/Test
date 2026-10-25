import { get } from './request.js';

export function getProfile(cookie) {
  return get('/auth/profile', 'profile: read', {
    Accept: 'application/json',
    Cookie: cookie,
  });
}

