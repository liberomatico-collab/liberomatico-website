const WHATSAPP_NUMBER = '51993357804';

const ORIGINS_DATA = [
  {
    id: 'blend-kaffata',
    name: 'Blend Kaffata',
    subtitle: 'Firma de la Casa · Grano Seleccionado',
    category: 'firma',
    categoryLabel: 'Firma & Intenso',
    altitude: 'Selección Especial',
    notes: ['Chocolate', 'Tabaco', 'Caramelo', 'Frutos secos'],
    description: 'Frutado y floral, cuerpo intenso y equilibrio ideal para amantes del espresso.',
    prices: { '150g': 23.0, '250g': 36.5, '500g': 65.5, '1kg': 120.0 }
  },
  {
    id: 'jaen',
    name: 'Jaén · Finca Coffee Forest',
    subtitle: 'Cajamarca · Lavado · Catuaí & Típica',
    category: 'chocolatoso',
    categoryLabel: 'Chocolatoso & Dulce',
    altitude: '1,750–1,800 msnm',
    notes: ['Cacao', 'Caramelo', 'Malta', 'Algarrobina'],
    description: 'Taza profunda de dulzor tostado y textura sedosa con carácter de selva alta.',
    prices: { '150g': 21.6, '250g': 36.0, '500g': 64.8, '1kg': 118.0 }
  },
  {
    id: 'puno',
    name: 'Puno · San Pedro',
    subtitle: 'Caficultor Francisco Díaz · Lavado',
    category: 'chocolatoso',
    categoryLabel: 'Chocolatoso & Dulce',
    altitude: '1,850 msnm',
    notes: ['Chocolate', 'Mandarina', 'Caramelo'],
    description: 'Cacao fino armonizado con destellos cítricos suaves y final acaramelado.',
    prices: { '150g': 21.6, '250g': 36.0, '500g': 64.8, '1kg': 118.0 }
  },
  {
    id: 'descafeinado',
    name: 'Descafeinado Italia',
    subtitle: 'Origen Italia · Tueste Clásico',
    category: 'clasico',
    categoryLabel: 'Clásicos & Descafeinado',
    altitude: 'Tueste Italiano',
    notes: ['Aroma suave', 'Cuerpo medio', 'Final limpio'],
    description: 'Disfruta la experiencia aromática del espresso italiano a cualquier hora del día.',
    prices: { '150g': 18.0, '250g': 35.0, '500g': 63.0, '1kg': 114.0 }
  },
  {
    id: 'cuzco',
    name: 'Cuzco · Salkantay',
    subtitle: 'Caficultor Miguel Irias · Típica & Bourbon',
    category: 'chocolatoso',
    categoryLabel: 'Chocolatoso & Dulce',
    altitude: '1,950 msnm',
    notes: ['Chocolate', 'Cerezos'],
    description: 'Elegante perfil de altura con fondo achocolatado y matiz frutal de cereza.',
    prices: { '150g': 19.4, '250g': 32.0, '500g': 57.9, '1kg': 105.0 }
  },
  {
    id: 'granaroma',
    name: 'Granaroma · Mix Importado',
    subtitle: 'Mezcla Aromática Equilibrada',
    category: 'firma',
    categoryLabel: 'Firma & Intenso',
    altitude: 'Mix Internacional',
    notes: ['Aroma intenso', 'Crema densa', 'Balance'],
    description: 'Diseñado para extraer crema generosa y consistencia en máquinas espresso u oficina.',
    prices: { '150g': 19.5, '250g': 31.5, '500g': 56.5, '1kg': 103.0 }
  },
  {
    id: 'pichanaki',
    name: 'Pichanaki · Santa Esmeralda',
    subtitle: 'Lavado · Catuaí & Geisha',
    category: 'citrico',
    categoryLabel: 'Cítrico & Frutal',
    altitude: '1,450 msnm',
    notes: ['Nuez', 'Cacao', 'Dulce frutal'],
    description: 'Varietal Catuaí y Geisha de perfil redondo, fragancia frutal y dulzor amable.',
    prices: { '150g': 18.9, '250g': 30.5, '500g': 55.0, '1kg': 99.0 }
  },
  {
    id: 'cutervo',
    name: 'Cutervo · Fam. Vásquez Cubas',
    subtitle: 'Cajamarca · Lavado · Típica',
    category: 'citrico',
    categoryLabel: 'Cítrico & Frutal',
    altitude: '2,100 msnm',
    notes: ['Mandarina', 'Panela', 'Frutos secos', 'Frambuesa'],
    description: 'Alta montaña cajamarquina con acidez brillante cítrica y dulzor de panela.',
    prices: { '150g': 18.6, '250g': 30.0, '500g': 54.5, '1kg': 98.0 }
  },
  {
    id: 'gourmet',
    name: 'Gourmet · Chanchamayo',
    subtitle: 'Selva Central · Clásico de Altura',
    category: 'clasico',
    categoryLabel: 'Clásicos & Descafeinado',
    altitude: 'Chanchamayo',
    notes: ['Clásico peruano', 'Cuerpo medio', 'Suave'],
    description: 'Perfil versátil para consumo diario en cafetera pasada, prensa francesa o moka.',
    prices: { '150g': 17.8, '250g': 29.0, '500g': 52.9, '1kg': 96.0 }
  },
  {
    id: 'exportacion',
    name: 'Exportación · Villa Rica',
    subtitle: 'Oxapampa · Grano de Exportación',
    category: 'clasico',
    categoryLabel: 'Clásicos & Descafeinado',
    altitude: 'Villa Rica',
    notes: ['Balanceado', 'Aromático', 'Versátil'],
    description: 'Grano tradicional de Villa Rica tostado para ofrecer rendimiento constante en taza.',
    prices: { '150g': 19.0, '250g': 28.5, '500g': 52.0, '1kg': 95.0 }
  }
];

const BAR_MENU = {
  calientes: [
    { id: 'bar-espresso', name: 'Espresso', desc: 'Extracción corta concentrada y crema dorada', price: 5.5 },
    { id: 'bar-espresso-doble', name: 'Espresso Doble', desc: 'Doble carga de intensidad aromática', price: 7.5 },
    { id: 'bar-cortado', name: 'Cortado', desc: 'Espresso equilibrado con leche texturizada', price: 7.8 },
    { id: 'bar-americano-r', name: 'Americano Regular', desc: 'Extracción suave en taza regular', price: 8.0 },
    { id: 'bar-americano-l', name: 'Americano Large', desc: 'Extracción suave en formato grande', price: 9.8 },
    { id: 'bar-capuccino-r', name: 'Capuccino Regular', desc: 'Café, leche y espuma sedosa', price: 8.9 },
    { id: 'bar-capuccino-l', name: 'Capuccino Large', desc: 'Formato grande de barra', price: 12.5 },
    { id: 'bar-mocaccino-r', name: 'Mocaccino Regular', desc: 'Espresso, cacao, leche y espuma', price: 9.9 },
    { id: 'bar-mocaccino-l', name: 'Mocaccino Large', desc: 'Formato grande de cacao y café', price: 13.8 },
    { id: 'bar-latte-r', name: 'Latte Regular', desc: 'Leche cremosa con shot de especialidad', price: 11.9 },
    { id: 'bar-latte-l', name: 'Latte Large', desc: 'Formato grande en barra', price: 14.5 },
    { id: 'bar-carajillo-cal', name: 'Carajillo Caliente', desc: 'Espresso de autor fusionado con licor', price: 22.0 }
  ],
  frias: [
    { id: 'bar-americano-frio', name: 'Americano Frío', desc: 'Café filtrado sobre hielo cristalino', price: 10.6 },
    { id: 'bar-latte-frio', name: 'Latte Frío', desc: 'Shot espresso, leche fría y hielo', price: 15.5 },
    { id: 'bar-espresso-tonic', name: 'Espresso Tonic', desc: 'Burbujas cítricas y espresso de especialidad', price: 16.0 },
    { id: 'bar-carajillo-frio', name: 'Carajillo Frío', desc: 'Coctel frío de espresso agitado y licor', price: 25.0 }
  ],
  extras: [
    { id: 'bar-extra-shot', name: 'Extra Shot de Espresso', desc: 'Carga adicional de café de especialidad', price: 3.9 },
    { id: 'bar-leche-avena', name: 'Leche de Avena', desc: 'Opción vegetal cremosa para cualquier bebida', price: 4.8 }
  ]
};

// Estado de la aplicación
const state = {
  filter: 'all',
  barTab: 'calientes',
  cart: [],
  activeScene: 0,
  videoReady: false,
  soundActive: false
};

// Utilidad de moneda
function formatPEN(amount) {
  return `S/ ${amount.toFixed(2)}`;
}

// =========================================================================
// HERO VIVENCIAL: Detección de Video Real + Secuencia 2 Actos + Sonido Web Audio
// =========================================================================
let sceneInterval = null;
let audioCtx = null;
let audioNodes = null;

function initHero() {
  const video = document.getElementById('heroVideo');
  const fallback = document.getElementById('heroFallback');
  const switcher = document.getElementById('sceneSwitcher');
  const slides = document.querySelectorAll('.hero-slide');
  const pills = document.querySelectorAll('.scene-pill');
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundLabel = document.getElementById('soundLabel');

  function activateScene(idx) {
    state.activeScene = idx;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    pills.forEach((p, i) => {
      const active = i === idx;
      p.classList.toggle('is-active', active);
      p.setAttribute('aria-selected', String(active));
    });
  }

  function startSceneLoop() {
    clearInterval(sceneInterval);
    sceneInterval = setInterval(() => {
      if (state.videoReady) return;
      activateScene((state.activeScene + 1) % slides.length);
    }, 5500);
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const target = Number(pill.dataset.target);
      activateScene(target);
      startSceneLoop();
    });
  });

  // Si assets/video/hero.mp4 existe, el evento loadeddata lo activa automáticamente
  if (video) {
    video.addEventListener('loadeddata', () => {
      state.videoReady = true;
      video.classList.add('is-ready');
      fallback.classList.add('is-hidden');
      switcher.style.display = 'none';
      clearInterval(sceneInterval);
    });
  }

  // Sonido orgánico suave para demostración presencial cuando corre con escenas
  function toggleAmbientPourAudio(enable) {
    if (enable) {
      const AudioContextRef = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextRef) return;
      audioCtx = audioCtx || new AudioContextRef();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.03 * white) / 1.03;
        lastOut = output[i];
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 880;
      bandpass.Q.value = 0.7;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.14, audioCtx.currentTime + 0.6);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
      audioNodes = { noise, gain };
    } else if (audioNodes && audioCtx) {
      try {
        audioNodes.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.25);
        const oldNoise = audioNodes.noise;
        setTimeout(() => {
          try { oldNoise.stop(); } catch (_) {}
        }, 280);
      } catch (_) {}
      audioNodes = null;
    }
  }

  soundBtn.addEventListener('click', () => {
    state.soundActive = !state.soundActive;
    soundBtn.classList.toggle('is-playing', state.soundActive);
    soundBtn.setAttribute('aria-pressed', String(state.soundActive));
    soundLabel.textContent = state.soundActive ? 'Audio Activo' : 'Activar Sonido';

    if (state.videoReady && video) {
      video.muted = !state.soundActive;
      if (state.soundActive) video.play().catch(() => {});
    } else {
      toggleAmbientPourAudio(state.soundActive);
    }
  });

  startSceneLoop();
}

// =========================================================================
// COTIZADOR B2B DIRECTO A WHATSAPP
// =========================================================================
function initB2BForm() {
  const form = document.getElementById('b2bForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const line = document.getElementById('b2bLine').value;
    const scale = document.getElementById('b2bScale').value;
    const company = document.getElementById('b2bCompany').value.trim();

    let message = `Hola Paul / Kaffata Coffee Market, me interesa una propuesta B2B:\n`;
    message += `• Solución: ${line}\n`;
    message += `• Escala: ${scale}\n`;
    if (company) {
      message += `• Empresa / Contacto: ${company}\n`;
    }
    message += `\nQuedo atento para coordinar detalles.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

// =========================================================================
// SELECTOR DE LOS 10 ORÍGENES
// =========================================================================
function renderOrigins() {
  const grid = document.getElementById('originsGrid');
  const filtered =
    state.filter === 'all'
      ? ORIGINS_DATA
      : ORIGINS_DATA.filter((item) => item.category === state.filter);

  grid.innerHTML = filtered
    .map((origin) => {
      const weights = Object.keys(origin.prices);
      const defaultWeight = '250g';
      const defaultPrice = origin.prices[defaultWeight];
      return `
        <article class="origin-card" data-origin-id="${origin.id}">
          <div>
            <div class="origin-top">
              <span class="origin-badge">${origin.categoryLabel}</span>
              <span class="origin-alt">${origin.altitude}</span>
            </div>
            <h3 class="origin-name">${origin.name}</h3>
            <p class="origin-farm">${origin.subtitle}</p>
            <div class="origin-notes">
              ${origin.notes.map((n) => `<span class="note-chip">${n}</span>`).join('')}
            </div>
          </div>

          <div class="origin-controls">
            <div class="weight-pills" role="group" aria-label="Peso de bolsa">
              ${weights
                .map(
                  (w) => `
                  <button type="button" class="weight-btn ${w === defaultWeight ? 'is-active' : ''}" data-weight="${w}" data-price="${origin.prices[w]}">
                    ${w}
                  </button>`
                )
                .join('')}
            </div>

            <div class="grind-price-row">
              <select class="grind-select" aria-label="Tipo de molienda">
                <option value="Grano entero">Grano entero</option>
                <option value="Molido Fino (Espresso / Moka)">Molido Fino</option>
                <option value="Molido Medio (Filtrado / V60)">Molido Medio</option>
                <option value="Molido Grueso (Prensa / Chemex)">Molido Grueso</option>
              </select>
              <span class="origin-price">${formatPEN(defaultPrice)}</span>
            </div>

            <button type="button" class="btn btn-espresso btn-sm btn-full add-origin-btn">
              Añadir al pedido
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  // Listeners por tarjeta
  grid.querySelectorAll('.origin-card').forEach((card) => {
    const originId = card.dataset.originId;
    const originObj = ORIGINS_DATA.find((o) => o.id === originId);
    const weightBtns = card.querySelectorAll('.weight-btn');
    const priceEl = card.querySelector('.origin-price');
    const grindSelect = card.querySelector('.grind-select');
    const addBtn = card.querySelector('.add-origin-btn');

    let selectedWeight = '250g';
    let selectedPrice = originObj.prices[selectedWeight];

    weightBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        weightBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        selectedWeight = btn.dataset.weight;
        selectedPrice = Number(btn.dataset.price);
        priceEl.textContent = formatPEN(selectedPrice);
      });
    });

    addBtn.addEventListener('click', () => {
      const grind = grindSelect.value;
      addToCart({
        key: `${originObj.id}-${selectedWeight}-${grind}`,
        title: `${originObj.name} (${selectedWeight})`,
        detail: grind,
        price: selectedPrice
      });
    });
  });
}

function initOriginFilters() {
  const filterContainer = document.getElementById('originFilters');
  filterContainer.querySelectorAll('.pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.pill').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.filter = btn.dataset.filter;
      renderOrigins();
    });
  });
}

// =========================================================================
// CARTA REAL DE BARRA
// =========================================================================
function renderBarMenu() {
  const list = document.getElementById('barList');
  const items = BAR_MENU[state.barTab] || [];

  list.innerHTML = items
    .map(
      (item) => `
      <div class="bar-item">
        <div class="bar-item-info">
          <strong>${item.name}</strong>
          <span>${item.desc}</span>
        </div>
        <div class="bar-item-actions">
          <span class="bar-price">${formatPEN(item.price)}</span>
          <button type="button" class="add-mini-btn" data-bar-id="${item.id}">+ Sumar</button>
        </div>
      </div>
    `
    )
    .join('');

  list.querySelectorAll('.add-mini-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = items.find((x) => x.id === btn.dataset.barId);
      if (!item) return;
      addToCart({
        key: item.id,
        title: item.name,
        detail: 'Preparación en Barra',
        price: item.price
      });
    });
  });
}

function initBarTabs() {
  const tabs = document.querySelectorAll('#barTabs .bar-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      state.barTab = tab.dataset.tab;
      renderBarMenu();
    });
  });
}

// =========================================================================
// CARRITO / DRAWER DE PEDIDO DIRECTO A WHATSAPP
// =========================================================================
function addToCart(entry) {
  const existing = state.cart.find((c) => c.key === entry.key);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...entry, qty: 1 });
  }
  updateCartUI();
  showToast(`Agregado: ${entry.title}`);
}

function changeQty(key, delta) {
  const idx = state.cart.findIndex((c) => c.key === key);
  if (idx === -1) return;
  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) {
    state.cart.splice(idx, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const subtotalEl = document.getElementById('cartSubtotal');
  const container = document.getElementById('cartItemsContainer');
  const floatingBtn = document.getElementById('floatingCartBtn');
  const floatingMeta = document.getElementById('floatingCartMeta');

  const totalQty = state.cart.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  countEl.textContent = String(totalQty);
  subtotalEl.textContent = formatPEN(totalAmount);
  floatingMeta.textContent = `${totalQty} ${totalQty === 1 ? 'ítem' : 'ítems'} · ${formatPEN(totalAmount)}`;
  floatingBtn.classList.toggle('is-visible', totalQty > 0);

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-guide">
        <strong>Tu pedido espera tu primer café o grano</strong>
        <span>Elige alguno de nuestros 10 orígenes a granel o suma una bebida de la barra para enviarlo directo al WhatsApp de Kaffata.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = state.cart
    .map(
      (item) => `
      <div class="cart-item">
        <div class="cart-item-meta">
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </div>
        <div class="cart-item-controls">
          <button type="button" class="qty-btn" data-action="dec" data-key="${item.key}" aria-label="Disminuir cantidad">−</button>
          <span class="qty-val">${item.qty}</span>
          <button type="button" class="qty-btn" data-action="inc" data-key="${item.key}" aria-label="Aumentar cantidad">+</button>
          <span class="cart-item-price">${formatPEN(item.price * item.qty)}</span>
        </div>
      </div>
    `
    )
    .join('');

  container.querySelectorAll('.qty-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const delta = btn.dataset.action === 'inc' ? 1 : -1;
      changeQty(btn.dataset.key, delta);
    });
  });
}

function initCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const openBtn = document.getElementById('openCartBtn');
  const floatingBtn = document.getElementById('floatingCartBtn');
  const closeBtn = document.getElementById('closeCartBtn');
  const sendWaBtn = document.getElementById('sendWhatsappOrderBtn');

  function openDrawer() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  openBtn.addEventListener('click', openDrawer);
  floatingBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  sendWaBtn.addEventListener('click', () => {
    const delivery = document.getElementById('deliveryMode').value;
    let text = `Hola Kaffata Coffee Market, deseo realizar el siguiente pedido:\n\n`;

    if (state.cart.length > 0) {
      state.cart.forEach((item) => {
        text += `• ${item.qty}x ${item.title} (${item.detail}) — ${formatPEN(item.price * item.qty)}\n`;
      });
      const total = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      text += `\nSubtotal estimado: ${formatPEN(total)}\n`;
    } else {
      text += `• Consulta general de disponibilidad y asesoría de compra\n`;
    }

    text += `• Modalidad: ${delivery}\n`;
    text += `\nMuchas gracias.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  });
}

// =========================================================================
// UTILIDADES: Toast, Menú Móvil y Reveal al Scroll
// =========================================================================
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  toast.textContent = msg;
  toast.classList.add('is-shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-shown');
  }, 2400);
}

function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  items.forEach((el) => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initB2BForm();
  initOriginFilters();
  renderOrigins();
  initBarTabs();
  renderBarMenu();
  initCartDrawer();
  updateCartUI();
  initMobileMenu();
  initReveal();
});
