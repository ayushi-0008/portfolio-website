/**
 * Interactive Live Demo Engine for Clothing E-Commerce Website
 * Author: Ayushi Vagela Portfolio
 */
window.EcommerceDemo = (function() {
  const products = [
    {
      id: 1,
      name: "Cyber Streetwear Oversized Hoodie",
      category: "men",
      price: 49.99,
      rating: 4.8,
      badge: "Best Seller",
      image: "assets/hoodie.svg",
      desc: "Heavyweight 450GSM cotton fleece with violet contrast stitching and cyberpunk typography accents."
    },
    {
      id: 2,
      name: "Neo-Tech Waterproof Cargo Pants",
      category: "men",
      price: 59.99,
      rating: 4.9,
      badge: "Trending",
      image: "assets/cargos.svg",
      desc: "Multi-pocket tactical design engineered with water-repellent tech weave and adjustable velcro cuffs."
    },
    {
      id: 3,
      name: "Holographic Iridescent Crop Jacket",
      category: "women",
      price: 64.99,
      rating: 4.7,
      badge: "New Arrival",
      image: "assets/jacket.svg",
      desc: "Futuristic iridescent sheen fabric with breathable mesh lining and storm-proof zippers."
    },
    {
      id: 4,
      name: "Minimalist High-Waist Pleated Skirt",
      category: "women",
      price: 34.99,
      rating: 4.6,
      badge: null,
      image: "assets/skirt.svg",
      desc: "Structured A-line silhouette with built-in safety shorts and hidden zip pocket."
    },
    {
      id: 5,
      name: "Junior Pixel Graphic Tee & Shorts Set",
      category: "kids",
      price: 29.99,
      rating: 4.9,
      badge: "Kids Favorite",
      image: "assets/kidset.svg",
      desc: "100% organic combed cotton, ultra-soft and hypoallergenic with fun retro gaming graphics."
    },
    {
      id: 6,
      name: "Cyber Explorer Kids Windbreaker",
      category: "kids",
      price: 39.99,
      rating: 4.5,
      badge: "Popular",
      image: "assets/kidjacket.svg",
      desc: "Reflective safety piping with warm fleece collar and detachable hood for outdoor play."
    },
    {
      id: 7,
      name: "Glow-In-The-Dark Graphic Tee",
      category: "sale",
      price: 19.99,
      oldPrice: 34.99,
      rating: 4.8,
      badge: "40% OFF",
      image: "assets/tee.svg",
      desc: "Reactive luminescent silkscreen print with comfortable drop-shoulder relaxed fit."
    },
    {
      id: 8,
      name: "Tech-Knit Everyday Sneakers",
      category: "sale",
      price: 44.99,
      oldPrice: 79.99,
      rating: 4.9,
      badge: "FLASH SALE",
      image: "assets/sneaker.svg",
      desc: "Ergonomic cloud-foam sole with breathable seamless mesh upper."
    }
  ];

  let cart = JSON.parse(localStorage.getItem('ayushi_demo_cart')) || [];
  let currentFilter = 'all';

  function saveCart() {
    localStorage.setItem('ayushi_demo_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll('.demo-cart-count');
    badges.forEach(b => b.textContent = totalCount);
  }

  function addToCart(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...prod, qty: 1 });
    }
    saveCart();

    if (window.PortfolioApp && window.PortfolioApp.showToast) {
      window.PortfolioApp.showToast(`Added "${prod.name}" to cart!`, 'success');
    }
  }

  function updateQty(productId, change) {
    const item = cart.find(p => p.id === productId);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
      cart = cart.filter(p => p.id !== productId);
    }
    saveCart();
  }

  function removeItem(productId) {
    cart = cart.filter(p => p.id !== productId);
    saveCart();
  }

  function renderProducts(filter = 'all') {
    currentFilter = filter;
    const grid = document.getElementById('demo-products-grid');
    if (!grid) return;

    const filtered = filter === 'all' 
      ? products 
      : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(p => `
      <div class="col-md-6 col-lg-3">
        <div class="card h-100 bg-dark text-light border-secondary shadow-sm" style="background: rgba(22, 27, 46, 0.9) !important; border-color: rgba(139, 92, 246, 0.25) !important;">
          <div class="position-relative p-3 text-center bg-black bg-opacity-25 rounded-top" style="height: 180px; display: flex; align-items: center; justify-content: center;">
            <div style="font-size: 4rem; color: #8b5cf6;">
              ${getProductIcon(p.category)}
            </div>
            ${p.badge ? `<span class="badge position-absolute top-0 start-0 m-2 ${p.badge.includes('OFF') || p.badge.includes('SALE') ? 'bg-danger' : 'bg-primary'}">${p.badge}</span>` : ''}
            <button class="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2" onclick="EcommerceDemo.quickView(${p.id})" title="Quick View">
              <i class="fas fa-eye"></i>
            </button>
          </div>
          <div class="card-body d-flex flex-column justify-content-between p-3">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="text-uppercase small text-info fw-bold">${p.category}</span>
                <span class="text-warning small"><i class="fas fa-star me-1"></i>${p.rating}</span>
              </div>
              <h6 class="card-title text-white mb-2" style="font-size: 0.95rem;">${p.name}</h6>
              <p class="card-text text-secondary small" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${p.desc}
              </p>
            </div>
            <div class="mt-3 pt-2 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
              <div>
                <span class="h6 mb-0 text-white fw-bold">$${p.price.toFixed(2)}</span>
                ${p.oldPrice ? `<small class="text-muted text-decoration-line-through ms-1">$${p.oldPrice.toFixed(2)}</small>` : ''}
              </div>
              <button class="btn btn-sm btn-primary" style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); border: none;" onclick="EcommerceDemo.addToCart(${p.id})">
                <i class="fas fa-shopping-bag me-1"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function getProductIcon(category) {
    switch (category) {
      case 'men': return '<i class="fas fa-tshirt"></i>';
      case 'women': return '<i class="fas fa-vest"></i>';
      case 'kids': return '<i class="fas fa-child"></i>';
      case 'sale': return '<i class="fas fa-tags"></i>';
      default: return '<i class="fas fa-shopping-bag"></i>';
    }
  }

  function renderCart() {
    const list = document.getElementById('demo-cart-items');
    const subtotalEl = document.getElementById('demo-cart-subtotal');
    if (!list) return;

    if (cart.length === 0) {
      list.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="fas fa-shopping-cart fa-3x mb-3 opacity-25"></i>
          <p class="mb-0">Your shopping cart is empty.</p>
          <small>Browse categories to add trendy apparel!</small>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    list.innerHTML = cart.map(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      return `
        <div class="d-flex align-items-center justify-content-between py-2 border-bottom border-secondary border-opacity-25">
          <div class="me-2" style="font-size: 1.8rem; color: #a78bfa; width: 40px; text-align: center;">
            ${getProductIcon(item.category)}
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-0 text-white small">${item.name}</h6>
            <small class="text-muted">$${item.price.toFixed(2)} x ${item.qty}</small>
          </div>
          <div class="d-flex align-items-center gap-1">
            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="EcommerceDemo.updateQty(${item.id}, -1)">-</button>
            <span class="small px-1 text-white">${item.qty}</span>
            <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="EcommerceDemo.updateQty(${item.id}, 1)">+</button>
            <button class="btn btn-sm text-danger ms-1" onclick="EcommerceDemo.removeItem(${item.id})"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  function quickView(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const modalTitle = document.getElementById('quickViewTitle');
    const modalBody = document.getElementById('quickViewBody');
    if (!modalTitle || !modalBody) return;

    modalTitle.textContent = prod.name;
    modalBody.innerHTML = `
      <div class="row g-4 align-items-center">
        <div class="col-md-5 text-center p-4 bg-black bg-opacity-25 rounded">
          <div style="font-size: 6rem; color: #8b5cf6;">
            ${getProductIcon(prod.category)}
          </div>
          ${prod.badge ? `<span class="badge bg-primary mt-3">${prod.badge}</span>` : ''}
        </div>
        <div class="col-md-7">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-secondary text-uppercase">${prod.category}</span>
            <span class="text-warning"><i class="fas fa-star me-1"></i>${prod.rating} / 5.0</span>
          </div>
          <h4 class="text-white mb-2">$${prod.price.toFixed(2)} ${prod.oldPrice ? `<small class="text-muted text-decoration-line-through fs-6">$${prod.oldPrice.toFixed(2)}</small>` : ''}</h4>
          <p class="text-secondary mb-3">${prod.desc}</p>
          <div class="mb-3">
            <label class="form-label small text-muted">Select Size:</label>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-light active">S</button>
              <button class="btn btn-sm btn-outline-light">M</button>
              <button class="btn btn-sm btn-outline-light">L</button>
              <button class="btn btn-sm btn-outline-light">XL</button>
            </div>
          </div>
          <button class="btn btn-primary w-100 py-2" style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); border: none;" onclick="EcommerceDemo.addToCart(${prod.id}); bootstrap.Modal.getInstance(document.getElementById('quickViewModal')).hide();">
            <i class="fas fa-cart-plus me-2"></i> Add To Cart
          </button>
        </div>
      </div>
    `;

    const qvModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    qvModal.show();
  }

  function init() {
    renderProducts('all');
    updateCartCount();
    renderCart();

    const filterBtns = document.querySelectorAll('.demo-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
        filterBtns.forEach(b => b.classList.add('btn-outline-secondary'));
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-outline-secondary');
        const filter = btn.getAttribute('data-filter');
        renderProducts(filter);
      });
    });
  }

  return {
    init,
    addToCart,
    updateQty,
    removeItem,
    quickView,
    renderProducts
  };
})();
