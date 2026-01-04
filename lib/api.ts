// API Client for Frontend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Products API
export const productsAPI = {
  getAll: (category?: string, status = 'approved') => 
    fetchAPI(`/products?${category && category !== 'الكل' ? `category=${encodeURIComponent(category)}&` : ''}status=${status}`),
  
  getById: (id: string) => 
    fetchAPI(`/products/${id}`),
  
  create: (product: any) => 
    fetchAPI('/products', { method: 'POST', body: JSON.stringify(product) }),
  
  update: (id: string, updates: any) => 
    fetchAPI(`/products/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  
  delete: (id: string) => 
    fetchAPI(`/products/${id}`, { method: 'DELETE' }),
  
  approve: (id: string) => 
    fetchAPI(`/products/${id}/approve`, { method: 'PATCH' }),
  
  reject: (id: string) => 
    fetchAPI(`/products/${id}/reject`, { method: 'PATCH' }),
};

// Users API
export const usersAPI = {
  getAll: () => 
    fetchAPI('/users'),
  
  getById: (id: string) => 
    fetchAPI(`/users/${id}`),
  
  getByEmail: (email: string) => 
    fetchAPI(`/users/email/${encodeURIComponent(email)}`),
  
  create: (user: any) => 
    fetchAPI('/users', { method: 'POST', body: JSON.stringify(user) }),
  
  update: (id: string, updates: any) => 
    fetchAPI(`/users/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
};

// Orders API
export const ordersAPI = {
  getAll: (userId?: string, status?: string) => {
    const params = new URLSearchParams();
    if (userId) params.append('user_id', userId);
    if (status) params.append('status', status);
    return fetchAPI(`/orders?${params.toString()}`);
  },
  
  getById: (id: string) => 
    fetchAPI(`/orders/${id}`),
  
  create: (order: any) => 
    fetchAPI('/orders', { method: 'POST', body: JSON.stringify(order) }),
  
  updateStatus: (id: string, status: string) => 
    fetchAPI(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

// Affiliates API
export const affiliatesAPI = {
  getAll: () => 
    fetchAPI('/affiliates'),
  
  getByCode: (code: string) => 
    fetchAPI(`/affiliates/code/${code}`),
  
  getDashboard: (id: string) => 
    fetchAPI(`/affiliates/${id}/dashboard`),
  
  create: (userId: string) => 
    fetchAPI('/affiliates', { method: 'POST', body: JSON.stringify({ user_id: userId }) }),
  
  trackClick: (code: string, productId?: string, userId?: string) => 
    fetchAPI(`/affiliates/${code}/click`, { 
      method: 'POST', 
      body: JSON.stringify({ product_id: productId, user_id: userId }) 
    }),
};

// AI API
export const aiAPI = {
  getAdvice: (params: {
    query: string;
    age_range?: string;
    size?: string;
    favorite_colors?: string;
    budget?: number;
    lang?: 'ar' | 'en';
  }) => 
    fetchAPI('/ai/advice', { method: 'POST', body: JSON.stringify(params) }),
  
  completeLook: (productId: string) => 
    fetchAPI('/ai/complete-look', { method: 'POST', body: JSON.stringify({ product_id: productId }) }),
  
  visualSearch: (image: string, lang?: 'ar' | 'en') => 
    fetchAPI('/ai/visual-search', { method: 'POST', body: JSON.stringify({ image, lang }) }),
};

// External APIs
export const externalAPI = {
  searchAmazon: (keywords: string, category?: string) => 
    fetchAPI('/external/amazon/search', { 
      method: 'POST', 
      body: JSON.stringify({ keywords, category }) 
    }),
  
  searchAliExpress: (keywords: string, category?: string) => 
    fetchAPI('/external/aliexpress/search', { 
      method: 'POST', 
      body: JSON.stringify({ keywords, category }) 
    }),
  
  importProduct: (productData: any) => 
    fetchAPI('/external/import', { 
      method: 'POST', 
      body: JSON.stringify(productData) 
    }),
  
  scrapeProduct: (url: string) => 
    fetchAPI('/external/scrape', { 
      method: 'POST', 
      body: JSON.stringify({ url }) 
    }),
};

