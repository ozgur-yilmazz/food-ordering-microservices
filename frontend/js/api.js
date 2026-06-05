const API = {
  BASE: {
    auth: 'http://localhost:8001',
    product: 'http://localhost:8002',
    order: 'http://localhost:8003',
    payment: 'http://localhost:8004',
  },

  async request(url, options = {}) {
    const token = localStorage.getItem('fm_token');
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    try {
      const res = await fetch(url, { ...options, headers });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
      return data;
    } catch (err) {
      if (err.name === 'TypeError') throw new Error('Sunucuya bağlanılamadı (demo mod aktif)');
      throw err;
    }
  },

  auth: {
    login: (email, password) => API.request(`${API.BASE.auth}/login`, {
      method: 'POST', body: JSON.stringify({ email, password }),
    }),
    register: (email, password) => API.request(`${API.BASE.auth}/register`, {
      method: 'POST', body: JSON.stringify({ email, password }),
    }),
  },

  products: {
    list: () => API.request(`${API.BASE.product}/products`),
    get: (id) => API.request(`${API.BASE.product}/products/${id}`),
  },

  orders: {
    list: () => API.request(`${API.BASE.order}/orders`),
    create: (data) => API.request(`${API.BASE.order}/orders`, {
      method: 'POST', body: JSON.stringify(data),
    }),
  },

  payments: {
    list: () => API.request(`${API.BASE.payment}/payments`),
    process: (data) => API.request(`${API.BASE.payment}/payments`, {
      method: 'POST', body: JSON.stringify(data),
    }),
  },
};
