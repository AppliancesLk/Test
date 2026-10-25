import { login, validateSession } from '../scripts/auth.js';
import { browseProducts } from '../scripts/products.js';
import { getProfile } from '../scripts/profile.js';
import { getCart } from '../scripts/cart.js';
import { listOrders } from '../scripts/orders.js';
import { listRepairs } from '../scripts/repairs.js';

export function setupAuthenticated() {
  const cookie = login();
  validateSession(cookie);
  return { cookie };
}

export function readOnlyCustomerFlow(cookie) {
  browseProducts();
  getProfile(cookie);
  getCart(cookie);
  listOrders(cookie);
  listRepairs(cookie);
}

