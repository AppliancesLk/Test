import { get, jsonBody, authenticatedHeaders } from './request.js';

export function listProducts() {
  return get('/products/catalog?limit=12&sort=name', 'products: catalog');
}

export function getProduct(productId) {
  return get(`/products/${productId}`, 'products: detail');
}

export function browseProducts() {
  const response = listProducts();
  const body = jsonBody(response);
  const first = body?.items?.[0];
  if (first?.id) getProduct(first.id);
}

