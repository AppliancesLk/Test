import { get } from './request.js';

export function listOrders(cookie) {
  return get('/orders', 'orders: history', {
    Accept: 'application/json',
    Cookie: cookie,
  });
}

