/**
 * ROXANA STORE - Catálogo Web & Carrito a WhatsApp
 * Conexión nativa a Google Sheets + Fallback local
 */

// ==========================================
// ⚙️ CONFIGURACIÓN DEL NEGOCIO
// ==========================================
const CONFIG = {
  storeName: "Roxana Store",
  tagline: "Accesorios & Joyería Fina",
  whatsappPhone: "51999999999", // 📲 CAMBIAR AQUÍ por el número de Roxana Store (con código 51 de Perú)
  currency: "S/",
  
  // 📊 GOOGLE SHEETS EN VIVO (Opcional):
  // Pega aquí el enlace CSV publicado de Google Sheets para que los productos se sincronicen solos.
  // Déjalo vacío ("") para usar el catálogo local de 'assets/data/products.json'.
  googleSheetCsvUrl: "",

  deliveryOptions: {
    lima: { label: "Lima Metropolitana (Olva / Motorizado)", cost: 10.00 },
    provincias: { label: "Provincias (Olva Courier / Shalom)", cost: 18.00 },
    recojo: { label: "Coordinar entrega / Recojo gratis", cost: 0.00 }
  }
};

// ==========================================
// 📦 ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================
const state = {
  products: [],
  filteredProducts: [],
  currentCategory: "todos",
  searchQuery: "",
  cart: JSON.parse(localStorage.getItem("roxana_cart") || "[]"),
  selectedDelivery: "lima",
  customerName: "",
  customerAddress: "",
  selectedProductModal: null
};

// ==========================================
// 🚀 INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
  setupEventListeners();
  updateCartBadge();
  await loadProducts();
});

// ==========================================
// 📥 BASE DE DATOS DE RESPALDO (Protocolo file:/// y Offline)
// ==========================================
const FALLBACK_PRODUCTS = [
  {
    "id": "COL-01",
    "nombre": "Collar Largo Cascada Círculos Dorados",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 45.00,
    "precio_regular": 55.00,
    "imagen": "assets/img/01_collar_largo_circulos_800x800.jpg",
    "descripcion": "Elegante collar largo estilo corbatero con medallas redondas pulidas en acabado dorado brillante. Ideal para combinar con blazers o blusas con escote en V.",
    "disponible": true,
    "badge": "Más Vendido",
    "material": "Acero con baño de oro"
  },
  {
    "id": "COL-02",
    "nombre": "Gargantilla Aros Concéntricos Martillados",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 42.00,
    "precio_regular": 50.00,
    "imagen": "assets/img/02_collar_aros_martillados_800x800.jpg",
    "descripcion": "Gargantilla con dije de aros concéntricos texturados al martillo y cordón marrón trenzado suave. Cierre ajustable.",
    "disponible": true,
    "badge": "Tendencia",
    "material": "Acero bañado en oro y cordón trenzado"
  },
  {
    "id": "COL-03",
    "nombre": "Collar Aros Geométricos Bicolor Ébano & Oro",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 48.00,
    "precio_regular": 58.00,
    "imagen": "assets/img/03_collar_aros_geometricos_800x800.jpg",
    "descripcion": "Maxi collar con aros entrelazados en acabado dorado brillante y aros en tono negro mate. Un diseño moderno con presencia.",
    "disponible": true,
    "badge": "Exclusivo",
    "material": "Aleación metálica con baño de oro"
  },
  {
    "id": "COL-04",
    "nombre": "Collar Lazo Trenzado Oro con Esfera Deslizante",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 45.00,
    "precio_regular": 55.00,
    "imagen": "assets/img/04_collar_lazo_trenzado_800x800.jpg",
    "descripcion": "Collar largo con cadenas múltiples de malla fina dorada y esfera central ajustable para regular la caída del lazo.",
    "disponible": true,
    "badge": "Nuevo",
    "material": "Acero inoxidable dorado"
  },
  {
    "id": "COL-05",
    "nombre": "Set Aretes & Medallón Martillado Rústico",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 50.00,
    "precio_regular": 65.00,
    "imagen": "assets/img/05_collar_set_aretes_medalla_800x800.jpg",
    "descripcion": "Dúo coordinado de aretes colgantes y cadena dorada con dije de disco martillado artesanal. Brillo con textura orgánica.",
    "disponible": true,
    "badge": "Set Completo",
    "material": "Acero inoxidable bañado en oro"
  },
  {
    "id": "COL-06",
    "nombre": "Collar Gargantilla Eslabones Ovales & Disco",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 42.00,
    "precio_regular": 52.00,
    "imagen": "assets/img/06_collar_cordon_ovalo_medalla_800x800.jpg",
    "descripcion": "Collar con cordón negro de alta resistencia, eslabones alargados dorados y medalla martillada colgante.",
    "disponible": true,
    "badge": "",
    "material": "Cordón reforzado y acero dorado"
  },
  {
    "id": "COL-07",
    "nombre": "Collar Doble Cadena Plana con Dije Espiral Sol",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 46.00,
    "precio_regular": 58.00,
    "imagen": "assets/img/07_collar_doble_cadena_espiral_800x800.jpg",
    "descripcion": "Collar doble nivel en cadena tipo serpiente plana brillante con gran medallón labrado en espiral rayada.",
    "disponible": true,
    "badge": "Favorito",
    "material": "Acero inoxidable dorado"
  },
  {
    "id": "COL-08",
    "nombre": "Collar Eslabones Orgánicos Asimétricos",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 44.00,
    "precio_regular": 54.00,
    "imagen": "assets/img/08_collar_eslabones_organicos_800x800.jpg",
    "descripcion": "Collar geométrico de inspiración escultural con eslabones libres asimétricos bañados en oro brillante.",
    "disponible": true,
    "badge": "",
    "material": "Aleación bañada en oro"
  },
  {
    "id": "COL-09",
    "nombre": "Set Gargantilla & Aretes Corazón Rústico",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 48.00,
    "precio_regular": 60.00,
    "imagen": "assets/img/09_collar_set_corazon_gargantilla_800x800.jpg",
    "descripcion": "Juego moderno de aretes corazón y collar con cuentas tubulares y dije de corazón calado con textura rústica.",
    "disponible": true,
    "badge": "Set Dúo",
    "material": "Acero inoxidable y aleación dorada"
  },
  {
    "id": "COL-10",
    "nombre": "Gargantilla Barra Curva & Trapecios Bicolor",
    "categoria": "collares",
    "categoria_label": "Collares",
    "precio": 45.00,
    "precio_regular": 55.00,
    "imagen": "assets/img/10_collar_geometrico_barra_arco_800x800.jpg",
    "descripcion": "Gargantilla minimalista con barra rígida tubular curvada y colgante de trapecios entrelazados en oro y negro mate.",
    "disponible": true,
    "badge": "Diseño Único",
    "material": "Acero bañado en oro y resina negra"
  },
  {
    "id": "BRA-01",
    "nombre": "Brazalete Ancho Mosaico Discos Calados",
    "categoria": "brazaletes",
    "categoria_label": "Brazaletes",
    "precio": 45.00,
    "precio_regular": 55.00,
    "imagen": "assets/img/11_brazalete_discos_calados_800x800.jpg",
    "descripcion": "Maxi brazalete rígido articulado formado por una cuadrícula de discos dorados martillados que reflejan la luz.",
    "disponible": true,
    "badge": "Top Ventas",
    "material": "Aleación metálica bañada en oro"
  },
  {
    "id": "BRA-02",
    "nombre": "Brazalete Ancho Curvo Espejo Dorado",
    "categoria": "brazaletes",
    "categoria_label": "Brazaletes",
    "precio": 50.00,
    "precio_regular": 65.00,
    "imagen": "assets/img/12_brazalete_brazal_dorado_liso_800x800.jpg",
    "descripcion": "Brazalete de puño ancho con diseño cóncavo de acabado ultra pulido efecto espejo. Elegancia pura para ocasiones especiales.",
    "disponible": true,
    "badge": "Edición Limitada",
    "material": "Acero inoxidable pulido"
  },
  {
    "id": "BRA-03",
    "nombre": "Brazalete Abierto Martillado Orgánico",
    "categoria": "brazaletes",
    "categoria_label": "Brazaletes",
    "precio": 42.00,
    "precio_regular": 52.00,
    "imagen": "assets/img/13_brazalete_abierto_martillado_800x800.jpg",
    "descripcion": "Brazalete abierto de grosor intermedio con textura cráter martillada irregular. Se amolda cómodamente a cualquier muñeca.",
    "disponible": true,
    "badge": "",
    "material": "Aleación metálica dorada"
  },
  {
    "id": "BRA-04",
    "nombre": "Brazalete Rígido Placa Dorada Texturada",
    "categoria": "brazaletes",
    "categoria_label": "Brazaletes",
    "precio": 44.00,
    "precio_regular": 54.00,
    "imagen": "assets/img/14_brazalete_ancho_texturado_800x800.jpg",
    "descripcion": "Brazalete ancho plano de una sola pieza con micropunteado que genera un brillo satinado muy chic.",
    "disponible": true,
    "badge": "",
    "material": "Acero bañado en oro"
  },
  {
    "id": "BRA-05",
    "nombre": "Set de 4 Brazaletes Geométricos y Calados",
    "categoria": "brazaletes",
    "categoria_label": "Brazaletes",
    "precio": 55.00,
    "precio_regular": 70.00,
    "imagen": "assets/img/15_brazalete_set_brazaletes_multiples_800x800.jpg",
    "descripcion": "Colección de 4 brazaletes independientes: alambre fino multilínea, placa lisa, calado geométrico y rejilla.",
    "disponible": true,
    "badge": "Set 4 en 1",
    "material": "Acero y aleación dorada"
  },
  {
    "id": "BRA-06",
    "nombre": "Brazalete Escultural Cinta Cruzada Texturada",
    "categoria": "brazaletes",
    "categoria_label": "Brazaletes",
    "precio": 46.00,
    "precio_regular": 58.00,
    "imagen": "assets/img/16_brazalete_cruzado_lazo_800x800.jpg",
    "descripcion": "Brazalete con diseño de cintas metálicas entrelazadas en forma de lazo con relieve rayado de alta costura.",
    "disponible": true,
    "badge": "Novedad",
    "material": "Aleación con baño de oro"
  },
  {
    "id": "COR-01",
    "nombre": "Correas Anchas en Gamuza con Vistosas Hebillas",
    "categoria": "correas",
    "categoria_label": "Correas",
    "precio": 40.00,
    "precio_regular": 50.00,
    "promo": "1 x S/ 40 | 2 x S/ 70",
    "imagen": "assets/img/17_correas_gamuza_hebillas_800x800.jpg",
    "descripcion": "Correas anchas de gamuza con hebillas orgánicas plateadas de gran impacto. Disponibles en colores Negro, Camel, Beige y Blanco. ¡Aprovecha la promoción de 2 por S/ 70!",
    "disponible": true,
    "badge": "Promoción 2x70",
    "material": "Gamuza de alta calidad y hebilla metálica plateada"
  }
];

// ==========================================
// 📥 CARGA DE PRODUCTOS (Sheets / Local / Fallback)
// ==========================================
async function loadProducts() {
  const container = document.getElementById("productGrid");
  container.innerHTML = `<div class="col-span-full py-16 text-center text-stone-500">Cargando colección exclusiva...</div>`;

  try {
    if (CONFIG.googleSheetCsvUrl && CONFIG.googleSheetCsvUrl.trim() !== "") {
      console.log("Cargando productos desde Google Sheets...");
      state.products = await fetchFromGoogleSheets(CONFIG.googleSheetCsvUrl);
    } else {
      console.log("Cargando productos desde base de datos local...");
      const res = await fetch("assets/data/products.json");
      state.products = await res.json();
    }
  } catch (err) {
    console.warn("Fallo al conectar con fuente externa o bloqueo de protocolo file://, cargando catálogo de respaldo...", err);
    try {
      const res = await fetch("assets/data/products.json");
      state.products = await res.json();
    } catch (e) {
      console.log("Activando base de datos embebida con 17 piezas.");
      state.products = FALLBACK_PRODUCTS;
    }
  }

  if (!state.products || state.products.length === 0) {
    state.products = FALLBACK_PRODUCTS;
  }

  updateCategoryCounts();
  filterProducts();
}

/**
 * Lector y conversor de CSV de Google Sheets a JSON
 * Soporta celdas con comillas y comas en descripciones
 */
async function fetchFromGoogleSheets(csvUrl) {
  const response = await fetch(csvUrl);
  const text = await response.text();
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase());
  const items = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const row = parseCSVLine(lines[i]);
    if (row.length < headers.length) continue;

    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx];
    });

    if (obj.nombre && obj.nombre !== "") {
      items.push({
        id: obj.id || `PROD-${i}`,
        nombre: obj.nombre,
        categoria: (obj.categoria || "otros").toLowerCase(),
        categoria_label: obj.categoria_label || obj.categoria || "Accesorio",
        precio: parseFloat(obj.precio) || 0,
        precio_regular: parseFloat(obj.precio_regular || obj.precio_antiguo) || 0,
        imagen: formatImageUrl(obj.imagen || obj.foto),
        descripcion: obj.descripcion || "",
        disponible: (obj.disponible || "si").toLowerCase().startsWith("s") || obj.disponible === "true",
        badge: obj.badge || "",
        material: obj.material || "Acero inoxidable"
      });
    }
  }
  return items;
}

/**
 * Parsea una línea de CSV respetando comillas y comas internas
 */
function parseCSVLine(text) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));
  return result;
}

/**
 * Si pegan un link de Google Drive, lo convierte a imagen web directa automáticamente
 */
function formatImageUrl(url) {
  if (!url || !url.trim()) return "assets/img/01_collar_largo_circulos_800x800.jpg";
  const cleanUrl = url.trim();
  if (cleanUrl.includes("drive.google.com")) {
    const match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return cleanUrl;
}

// ==========================================
// 🔍 FILTRADO Y BÚSQUEDA
// ==========================================
function filterProducts() {
  const query = state.searchQuery.toLowerCase().trim();

  state.filteredProducts = state.products.filter(p => {
    const matchesCategory = state.currentCategory === "todos" || p.categoria === state.currentCategory;
    const matchesSearch = query === "" || 
      p.nombre.toLowerCase().includes(query) || 
      (p.descripcion && p.descripcion.toLowerCase().includes(query)) ||
      (p.material && p.material.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  renderProductGrid();
}

function updateCategoryCounts() {
  const counts = {
    todos: state.products.length,
    collares: state.products.filter(p => p.categoria === "collares").length,
    brazaletes: state.products.filter(p => p.categoria === "brazaletes").length,
    correas: state.products.filter(p => p.categoria === "correas").length
  };

  document.querySelectorAll("[data-category-count]").forEach(el => {
    const cat = el.getAttribute("data-category-count");
    if (counts[cat] !== undefined) {
      el.textContent = `(${counts[cat]})`;
    }
  });
}

// ==========================================
// 🎨 RENDERIZADO DEL CATÁLOGO
// ==========================================
function renderProductGrid() {
  const container = document.getElementById("productGrid");
  const countEl = document.getElementById("resultsCount");
  
  if (countEl) {
    countEl.textContent = `${state.filteredProducts.length} ${state.filteredProducts.length === 1 ? "pieza disponible" : "piezas disponibles"}`;
  }

  if (state.filteredProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #78716c;">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 1.3rem; font-weight: 600; color: #1c1917; margin-bottom: 6px;">No encontramos coincidencias</h3>
        <p style="font-size: 0.9rem;">Prueba con otra palabra clave o selecciona otra categoría.</p>
        <button onclick="resetFilters()" style="margin-top: 16px; background: #1c1917; color: white; border: none; padding: 8px 18px; border-radius: 999px; cursor: pointer; font-size: 0.85rem;">Ver todas las joyas</button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.filteredProducts.map(p => {
    const isPromo = p.badge && p.badge.toLowerCase().includes("promoc");
    const badgeClass = isPromo ? "promo" : "gold";

    return `
      <article class="product-card" data-id="${p.id}">
        <div class="card-img-wrap" onclick="openProductModal('${p.id}')">
          <img src="${p.imagen}" alt="${p.nombre}" class="card-img" loading="lazy" />
          ${p.badge ? `<span class="card-badge ${badgeClass}">${p.badge}</span>` : ""}
          ${!p.disponible ? `<span class="card-badge" style="background:#dc2626;">Agotado</span>` : ""}
        </div>
        
        <div class="card-info">
          <span class="card-category">${p.categoria_label || p.categoria}</span>
          <h3 class="card-title" onclick="openProductModal('${p.id}')" title="${p.nombre}">${p.nombre}</h3>
          
          <div class="card-price-row">
            <span class="card-price">${CONFIG.currency} ${p.precio.toFixed(2)}</span>
            ${p.precio_regular && p.precio_regular > p.precio ? `<span class="card-price-old">${CONFIG.currency} ${p.precio_regular.toFixed(2)}</span>` : ""}
          </div>

          <div class="card-actions">
            ${p.disponible ? `
              <button class="btn-add-cart" onclick="addToCart('${p.id}')">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                Añadir al Carrito
              </button>
            ` : `
              <button class="btn-add-cart" disabled style="opacity: 0.5; cursor: not-allowed;">
                Agotado Temporalmente
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function resetFilters() {
  state.searchQuery = "";
  state.currentCategory = "todos";
  document.querySelectorAll(".search-input").forEach(i => i.value = "");
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-category") === "todos");
  });
  filterProducts();
}

// ==========================================
// 🛒 LÓGICA DEL CARRITO DE COMPRAS
// ==========================================
function addToCart(productId, qty = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product || !product.disponible) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      qty: qty
    });
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast(`✨ Añadido: ${product.nombre}`);
}

function updateQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function saveCart() {
  localStorage.setItem("roxana_cart", JSON.stringify(state.cart));
}

function updateCartBadge() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.textContent = totalItems;
  }
}

function openCart() {
  renderCartDrawer();
  document.getElementById("cartDrawerOverlay").classList.add("active");
  document.getElementById("cartDrawer").classList.add("active");
}

function closeCart() {
  document.getElementById("cartDrawerOverlay").classList.remove("active");
  document.getElementById("cartDrawer").classList.remove("active");
}

function renderCartDrawer() {
  const container = document.getElementById("cartItemsContainer");
  const footer = document.getElementById("cartFooter");

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛍️</div>
        <h4 style="font-weight: 600; color: #1c1917; margin-bottom: 6px;">Tu carrito está vacío</h4>
        <p style="font-size: 0.88rem;">Explora nuestra colección y añade tus joyas favoritas.</p>
      </div>
    `;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-thumb" />
      <div class="cart-item-info">
        <h5 class="cart-item-title">${item.nombre}</h5>
        <div class="cart-item-price">${CONFIG.currency} ${(item.precio * item.qty).toFixed(2)}</div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Eliminar">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </div>
  `).join("");

  // Subtotal and Total calculations
  const subtotal = state.cart.reduce((sum, item) => sum + (item.precio * item.qty), 0);
  const deliveryInfo = CONFIG.deliveryOptions[state.selectedDelivery] || CONFIG.deliveryOptions.lima;
  const deliveryCost = deliveryInfo.cost;
  const total = subtotal + deliveryCost;

  document.getElementById("cartSubtotalVal").textContent = `${CONFIG.currency} ${subtotal.toFixed(2)}`;
  document.getElementById("cartDeliveryVal").textContent = deliveryCost === 0 ? "Gratis" : `${CONFIG.currency} ${deliveryCost.toFixed(2)}`;
  document.getElementById("cartTotalVal").textContent = `${CONFIG.currency} ${total.toFixed(2)}`;

  // Update WhatsApp checkout link
  updateWhatsAppLink(subtotal, deliveryInfo, total);
}

// ==========================================
// 📲 GENERADOR DE MENSAJE WHATSAPP
// ==========================================
function updateWhatsAppLink(subtotal, deliveryInfo, total) {
  const btn = document.getElementById("btnWhatsAppCheckout");
  if (!btn) return;

  const nameInput = document.getElementById("clientNameInput");
  const addressInput = document.getElementById("clientAddressInput");
  const name = nameInput ? nameInput.value.trim() : "";
  const address = addressInput ? addressInput.value.trim() : "";

  let msg = `✨ *NUEVO PEDIDO - ${CONFIG.storeName.toUpperCase()}* ✨\n\n`;
  msg += `🛍️ *Productos solicitados:*\n`;

  state.cart.forEach((item, idx) => {
    msg += `  ${idx + 1}. ${item.qty}x ${item.nombre} — S/ ${(item.precio * item.qty).toFixed(2)}\n`;
  });

  msg += `\n📦 *Subtotal:* S/ ${subtotal.toFixed(2)}\n`;
  msg += `🚚 *Envío:* ${deliveryInfo.label} (${deliveryInfo.cost === 0 ? "Gratis" : "S/ " + deliveryInfo.cost.toFixed(2)})\n`;
  msg += `💰 *TOTAL A PAGAR: S/ ${total.toFixed(2)}*\n\n`;

  if (name) msg += `👤 *Cliente:* ${name}\n`;
  if (address) msg += `📍 *Dirección:* ${address}\n`;

  msg += `💳 *Método de pago preferido:* Yape / Plin / Transferencia BCP\n\n`;
  msg += `¿Me confirman disponibilidad y sus datos de Yape para transferir?`;

  const encodedUrl = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(msg)}`;
  btn.href = encodedUrl;
}

// ==========================================
// 🔍 MODAL VISTA RÁPIDA DE PRODUCTO
// ==========================================
function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProductModal = product;
  document.getElementById("modalImg").src = product.imagen;
  document.getElementById("modalCategory").textContent = product.categoria_label || product.categoria;
  document.getElementById("modalTitle").textContent = product.nombre;
  document.getElementById("modalPrice").textContent = `${CONFIG.currency} ${product.precio.toFixed(2)}`;
  
  const oldPriceEl = document.getElementById("modalOldPrice");
  if (product.precio_regular && product.precio_regular > product.precio) {
    oldPriceEl.textContent = `${CONFIG.currency} ${product.precio_regular.toFixed(2)}`;
    oldPriceEl.style.display = "inline";
  } else {
    oldPriceEl.style.display = "none";
  }

  document.getElementById("modalDesc").textContent = product.descripcion || "Hermosa pieza de joyería de diseño contemporáneo.";
  document.getElementById("modalMaterial").textContent = product.material || "Acero inoxidable bañado en oro";

  const addBtn = document.getElementById("modalAddBtn");
  if (product.disponible) {
    addBtn.disabled = false;
    addBtn.style.opacity = "1";
    addBtn.textContent = "Añadir al Carrito";
    addBtn.onclick = () => {
      addToCart(product.id);
      closeProductModal();
      openCart();
    };
  } else {
    addBtn.disabled = true;
    addBtn.style.opacity = "0.5";
    addBtn.textContent = "Agotado Temporalmente";
  }

  document.getElementById("productModal").classList.add("active");
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("active");
  state.selectedProductModal = null;
}

// ==========================================
// 🔔 NOTIFICACIÓN TOAST
// ==========================================
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastMsg");
  const text = document.getElementById("toastText");
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ==========================================
// 🎛️ EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // Category tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentCategory = btn.getAttribute("data-category");
      filterProducts();
    });
  });

  // Search inputs (desktop & mobile)
  document.querySelectorAll(".search-input").forEach(input => {
    input.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      // Sync other search box if exists
      document.querySelectorAll(".search-input").forEach(other => {
        if (other !== e.target) other.value = e.target.value;
      });
      filterProducts();
    });
  });

  // Cart open / close
  document.getElementById("cartToggleBtn").addEventListener("click", openCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  document.getElementById("cartDrawerOverlay").addEventListener("click", closeCart);

  // Delivery selector
  const deliverySelect = document.getElementById("deliverySelect");
  if (deliverySelect) {
    deliverySelect.addEventListener("change", (e) => {
      state.selectedDelivery = e.target.value;
      renderCartDrawer();
    });
  }

  // Customer inputs live update in WhatsApp link
  ["clientNameInput", "clientAddressInput"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        const subtotal = state.cart.reduce((sum, item) => sum + (item.precio * item.qty), 0);
        const deliveryInfo = CONFIG.deliveryOptions[state.selectedDelivery] || CONFIG.deliveryOptions.lima;
        const total = subtotal + deliveryInfo.cost;
        updateWhatsAppLink(subtotal, deliveryInfo, total);
      });
    }
  });

  // Modal close
  document.getElementById("modalCloseBtn").addEventListener("click", closeProductModal);
  document.getElementById("productModal").addEventListener("click", (e) => {
    if (e.target.id === "productModal") closeProductModal();
  });

  // ESC key closes modals & drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCart();
    }
  });

  // Iniciar slider de portada
  startHeroSlider();
}

// ==========================================
// 🌅 SLIDER CINEMATOGRÁFICO DE PORTADA
// ==========================================
let currentSlide = 0;
let slideInterval = null;

function goToSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  if (!slides.length) return;

  slides.forEach((s, idx) => {
    s.classList.toggle("active", idx === index);
  });

  dots.forEach((d, idx) => {
    d.classList.toggle("active", idx === index);
  });

  currentSlide = index;

  // Reiniciar el temporizador para que no cambie inmediatamente tras un clic
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

function nextSlide() {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;
  const nextIdx = (currentSlide + 1) % slides.length;
  goToSlide(nextIdx);
}

function startHeroSlider() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

function smoothScrollToCatalog(e) {
  if (e) e.preventDefault();
  const catSection = document.getElementById("catalogo") || document.querySelector(".filter-section");
  if (catSection) {
    catSection.scrollIntoView({ behavior: "smooth" });
  }
}

