class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('fm_cart') || '[]');
  }

  save() {
    localStorage.setItem('fm_cart', JSON.stringify(this.items));
    this.updateUI();
  }

  add(product) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) existing.qty++;
    else this.items.push({ ...product, qty: 1 });
    this.save();
  }

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.remove(id);
    else this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  get total() {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  get count() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  }

  updateUI() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const n = this.count;
      badge.textContent = n;
      badge.style.display = n > 0 ? 'flex' : 'none';
    }
    this.renderItems();
  }

  renderItems() {
    const container = document.querySelector('.cart-items');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <span class="cart-empty-icon">🛒</span>
          <p>Sepetiniz boş</p>
          <small>Menüden lezzetli yemekler ekleyin!</small>
        </div>`;
    } else {
      container.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <span class="cart-item-emoji">${item.emoji}</span>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${(item.price * item.qty).toFixed(0)} ₺</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="cart.updateQty(${item.id}, -1)">−</button>
              <span class="qty-value">${item.qty}</span>
              <button class="qty-btn" onclick="cart.updateQty(${item.id}, 1)">+</button>
            </div>
          </div>
        </div>`).join('');
    }

    const totalEl = document.querySelector('.cart-total-price');
    if (totalEl) totalEl.textContent = `${this.total.toFixed(0)} ₺`;
  }
}

const cart = new Cart();
