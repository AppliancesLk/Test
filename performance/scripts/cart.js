import { get } from './request.js';

export function getCart(cookie) {
  return get('/cart', 'cart: read', {
    Accept: 'application/json',
    Cookie: cookie,
  });
}

