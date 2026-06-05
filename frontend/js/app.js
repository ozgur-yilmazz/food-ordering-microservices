/* ===== Navbar Scroll ===== */
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* ===== Mobile Nav ===== */
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => navMobile.classList.toggle('open'));
}

/* ===== Toast ===== */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || '📢'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = '0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ===== Cart Sidebar ===== */
function openCart() {
  document.querySelector('.cart-overlay')?.classList.add('open');
  document.querySelector('.cart-sidebar')?.classList.add('open');
}
function closeCart() {
  document.querySelector('.cart-overlay')?.classList.remove('open');
  document.querySelector('.cart-sidebar')?.classList.remove('open');
}

/* ===== Auth Helpers ===== */
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('fm_user')); } catch { return null; }
}
function isLoggedIn() { return !!localStorage.getItem('fm_token'); }

function logout() {
  localStorage.removeItem('fm_token');
  localStorage.removeItem('fm_user');
  cart.clear();
  window.location.href = 'index.html';
}

function updateNavAuth() {
  const user = getCurrentUser();
  const authArea = document.querySelector('.nav-auth');
  if (!authArea) return;
  if (user) {
    authArea.innerHTML = `
      <span style="color:var(--text-secondary);font-size:.84rem;font-weight:500">👤 ${user.email.split('@')[0]}</span>
      <button class="btn-ghost" onclick="logout()">Çıkış</button>`;
  }
}

/* ===== Mock Products Data ===== */
const MOCK_PRODUCTS = [
  { id:1,  name:'Klasik Cheeseburger',  category:'burger',  price:129, emoji:'🍔', desc:'Özel sos, çift köfte, çedar peyniri',   rating:4.8, badge:'Popüler' },
  { id:2,  name:'BBQ Smoky Burger',      category:'burger',  price:149, emoji:'🍔', desc:'BBQ sos, karamelize soğan, jalapeño',  rating:4.9, badge:'En İyi' },
  { id:3,  name:'Crispy Chicken Burger', category:'burger',  price:135, emoji:'🍗', desc:'Çıtır tavuk, ranch sos, turşu',         rating:4.7 },
  { id:4,  name:'Margherita Pizza',      category:'pizza',   price:159, emoji:'🍕', desc:'Domates sosu, mozarella, fesleğen',    rating:4.7 },
  { id:5,  name:'Karışık Pizza',         category:'pizza',   price:189, emoji:'🍕', desc:'Sucuk, mantar, biber, zeytin, mısır',  rating:4.6, badge:'Yeni' },
  { id:6,  name:'Pepperoni Pizza',       category:'pizza',   price:179, emoji:'🍕', desc:'Bol pepperoni, özel mozarella',         rating:4.8 },
  { id:7,  name:'Sezar Salata',          category:'salad',   price:89,  emoji:'🥗', desc:'Marul, parmesan, kruton, sezar sos',   rating:4.5 },
  { id:8,  name:'Akdeniz Salata',        category:'salad',   price:99,  emoji:'🥗', desc:'Domates, salatalık, zeytin, beyaz peynir', rating:4.6 },
  { id:9,  name:'Izgara Tavuk',          category:'main',    price:169, emoji:'🍗', desc:'Baharatlı ızgara tavuk, pilav, salata', rating:4.8 },
  { id:10, name:'Dana Biftek',           category:'main',    price:329, emoji:'🥩', desc:'250g et, mantar sos, patates kızartması', rating:4.9, badge:'Premium' },
  { id:11, name:'Makarna Bolonez',       category:'main',    price:139, emoji:'🍝', desc:'Ev yapımı bolonez, parmesan peyniri',   rating:4.6 },
  { id:12, name:'Çikolatalı Lav Kek',   category:'dessert', price:69,  emoji:'🍰', desc:'Sıcak çikolata sosu, dondurma ile',    rating:4.7 },
  { id:13, name:'Cheesecake',            category:'dessert', price:79,  emoji:'🍮', desc:'Taze çilek soslu, ev yapımı',           rating:4.8 },
  { id:14, name:'Taze Limonata',         category:'drink',   price:39,  emoji:'🍋', desc:'Taze sıkılmış limon, nane, buz',       rating:4.6 },
  { id:15, name:'Tropik Smoothie',       category:'drink',   price:49,  emoji:'🥤', desc:'Mango, çilek, muz karışımı',           rating:4.5 },
  { id:16, name:'Türk Kahvesi',          category:'drink',   price:29,  emoji:'☕', desc:'Geleneksel, lokum ile servis',          rating:4.9, badge:'Özel' },
];

const CATEGORY_META = {
  all:     { label:'Tümü',         emoji:'🍽️' },
  burger:  { label:'Burgerler',    emoji:'🍔' },
  pizza:   { label:'Pizzalar',     emoji:'🍕' },
  salad:   { label:'Salatalar',    emoji:'🥗' },
  main:    { label:'Ana Yemekler', emoji:'🍜' },
  dessert: { label:'Tatlılar',     emoji:'🍰' },
  drink:   { label:'İçecekler',    emoji:'🥤' },
};

/* ===== Menu Page ===== */
let currentCategory = 'all';

function renderProducts(category = 'all') {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;
  const filtered = category === 'all' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === category);
  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card fade-in" style="animation-delay:${i * 0.06}s">
      <div class="product-image">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <span class="product-price">${p.price} ₺</span>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})">+ Ekle</button>
        </div>
      </div>
    </div>`).join('');
}

function addToCart(id) {
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) return;
  cart.add(product);
  showToast(`${product.emoji} ${product.name} sepete eklendi!`);
}

function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === cat);
  });
  renderProducts(cat);
}

function buildCategoryBar() {
  const bar = document.querySelector('.categories-bar');
  if (!bar) return;
  bar.innerHTML = Object.entries(CATEGORY_META).map(([key, { label, emoji }]) => `
    <button class="category-btn${key === 'all' ? ' active' : ''}" data-category="${key}" onclick="setCategory('${key}')">
      <span>${emoji}</span> ${label}
    </button>`).join('');
}

if (document.querySelector('.products-grid')) {
  buildCategoryBar();
  renderProducts();
}

/* ===== Auth Page ===== */
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.toggle('active', f.id === `${tab}-form`));
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email')?.value;
  const password = document.getElementById('login-password')?.value;
  const btn = e.target.querySelector('.btn-submit');
  if (!btn) return;

  btn.innerHTML = '<span class="spinner"></span> Giriş yapılıyor...';
  btn.disabled = true;

  try {
    const data = await API.auth.login(email, password);
    localStorage.setItem('fm_token', data.token || 'demo-token');
    localStorage.setItem('fm_user', JSON.stringify({ email }));
  } catch {
    localStorage.setItem('fm_token', 'demo-token');
    localStorage.setItem('fm_user', JSON.stringify({ email }));
  }

  showToast('Giriş başarılı! Menüye yönlendiriliyor...');
  setTimeout(() => window.location.href = 'menu.html', 1200);
}

async function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('register-email')?.value;
  const password = document.getElementById('register-password')?.value;
  const confirm = document.getElementById('register-confirm')?.value;

  if (password !== confirm) { showToast('Şifreler eşleşmiyor!', 'error'); return; }
  if (password.length < 6)  { showToast('Şifre en az 6 karakter olmalı!', 'error'); return; }

  const btn = e.target.querySelector('.btn-submit');
  if (!btn) return;
  btn.innerHTML = '<span class="spinner"></span> Kaydediliyor...';
  btn.disabled = true;

  try { await API.auth.register(email, password); } catch { /* demo mode */ }

  showToast('Kayıt başarılı! Giriş yapabilirsiniz.');
  setTimeout(() => { btn.innerHTML = 'Kayıt Ol'; btn.disabled = false; switchTab('login'); }, 1200);
}

/* ===== Orders Page ===== */
const MOCK_ORDERS = [
  { id:'#ORD-2847', items:'Klasik Cheeseburger × 2, Taze Limonata', total:297, date:'05 Haz 2026, 14:32', status:'delivered' },
  { id:'#ORD-2846', items:'Margherita Pizza, Sezar Salata',          total:248, date:'05 Haz 2026, 12:15', status:'preparing' },
  { id:'#ORD-2845', items:'BBQ Smoky Burger, Cheesecake × 2',        total:307, date:'05 Haz 2026, 10:05', status:'pending' },
  { id:'#ORD-2840', items:'Dana Biftek, Türk Kahvesi',               total:358, date:'04 Haz 2026, 20:44', status:'delivered' },
  { id:'#ORD-2835', items:'Karışık Pizza × 2',                       total:378, date:'03 Haz 2026, 19:10', status:'delivered' },
  { id:'#ORD-2821', items:'Izgara Tavuk, Akdeniz Salata, Smoothie',  total:317, date:'02 Haz 2026, 13:22', status:'cancelled' },
];

const STATUS_LABELS = {
  pending:   'Bekliyor',
  preparing: 'Hazırlanıyor',
  delivered: 'Teslim Edildi',
  cancelled: 'İptal',
};

function renderOrders() {
  const grid = document.querySelector('.orders-grid');
  if (!grid) return;
  const orders = isLoggedIn() ? MOCK_ORDERS : [];
  if (orders.length === 0) {
    grid.innerHTML = `
      <div class="orders-empty">
        <span class="orders-empty-icon">📦</span>
        <h3>Henüz siparişiniz yok</h3>
        <p style="margin-bottom:1.5rem">Menüden lezzetli yemekler seçin ve ilk siparişinizi verin!</p>
        <a href="menu.html"><button class="btn-hero-primary">🍽️ Menüye Git</button></a>
      </div>`;
    return;
  }
  grid.innerHTML = orders.map((o, i) => `
    <div class="order-card fade-in" style="animation-delay:${i * 0.07}s">
      <div class="order-id">${o.id}</div>
      <div class="order-info">
        <div class="order-items-text">${o.items}</div>
        <div class="order-date">📅 ${o.date}</div>
      </div>
      <div class="order-total">${o.total} ₺</div>
      <div class="order-status status-${o.status}">${STATUS_LABELS[o.status] || o.status}</div>
    </div>`).join('');
}

if (document.querySelector('.orders-grid')) renderOrders();

/* ===== Checkout (from cart sidebar) ===== */
function checkout() {
  if (!isLoggedIn()) {
    showToast('Sipariş vermek için giriş yapın!', 'error');
    setTimeout(() => window.location.href = 'auth.html', 1500);
    return;
  }
  if (cart.count === 0) {
    showToast('Sepetiniz boş!', 'error');
    return;
  }
  showToast('Siparişiniz alındı! Teşekkürler 🎉');
  cart.clear();
  closeCart();
}

/* ===== Init ===== */
updateNavAuth();
cart.updateUI();
