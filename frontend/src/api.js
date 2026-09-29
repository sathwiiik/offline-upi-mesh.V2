const JSON_HEADERS = { 'Content-Type': 'application/json' }

async function request(path, options = {}) {
  const res = await fetch(path, options)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed (${res.status})`)
  }
  return res.json()
}

export const api = {
  getServerKey: () => request('/api/server-key'),
  getMeshState: () => request('/api/mesh/state'),
  getAccounts: () => request('/api/accounts'),
  getTransactions: () => request('/api/transactions'),
  sendPayment: (body) =>
    request('/api/demo/send', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(body),
    }),
  gossip: () => request('/api/mesh/gossip', { method: 'POST' }),
  flush: () => request('/api/mesh/flush', { method: 'POST' }),
  reset: () => request('/api/mesh/reset', { method: 'POST' }),
}
