// =========================================================================
// GUTEMBER SASTRERÍA — Visual-First Static App (Google Sheets Ready)
// =========================================================================

// 1. Header Scroll State
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
});

// 2. Hero Reel (6 clean 4K scenes — ready to swap for 1-2s MP4 clips)
const CHAPTER_LABELS = [
  '01 · El Trazo',
  '02 · El Corte',
  '03 · La Puntada',
  '04 · Tus Iniciales',
  '05 · El Entalle',
  '06 · El Porte'
];

const slides = Array.from(document.querySelectorAll('.reel-slide'));
const dotBtns = Array.from(document.querySelectorAll('.reel-dot-btn'));
const reelLabel = document.getElementById('reelLabel');
const playToggle = document.getElementById('reelPlayToggle');

const SLIDE_MS = 4800;
let currentSlide = 0;
let isPlaying = true;
let timer = null;

function setSlide(idx) {
  currentSlide = idx;
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  dotBtns.forEach((d, i) => d.classList.toggle('active', i === idx));
  if (reelLabel) reelLabel.textContent = CHAPTER_LABELS[idx];
}

function restartTimer() {
  clearInterval(timer);
  if (isPlaying) {
    timer = setInterval(() => {
      setSlide((currentSlide + 1) % slides.length);
    }, SLIDE_MS);
  }
}

dotBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    setSlide(Number(btn.dataset.chapter));
    restartTimer();
  });
});

playToggle.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playToggle.textContent = isPlaying ? 'Pausar' : 'Play';
  restartTimer();
});

restartTimer();

// 3. Visual Catalog (1:1 structure ready for Google Sheets CSV/JSON + Cloudinary)
const CATALOG_DATA = [
  {
    categoria: 'trajes',
    titulo: 'Terno Cruzado Navy',
    tela: "Huddersfield Super 120's",
    imagen: 'assets/editorial/03_terno_cruzado_4k.jpg'
  },
  {
    categoria: 'trajes',
    titulo: 'Ambo Gris Ejecutivo',
    tela: 'Lana Merino Inglesa',
    imagen: 'assets/real/IMG_20261123_192024.jpg'
  },
  {
    categoria: 'blazers',
    titulo: 'Saco Príncipe de Gales',
    tela: 'Huddersfield Chelsea V',
    imagen: 'assets/real/IMG_20261123_191947.jpg'
  },
  {
    categoria: 'camisas',
    titulo: 'Camisa Rayas Celeste',
    tela: 'Cotonificio Albini 1876',
    imagen: 'assets/real/camisa_cmc_clean.jpg'
  },
  {
    categoria: 'camisas',
    titulo: 'Camisa con Monograma',
    tela: 'Creditex · Bambú',
    imagen: 'assets/editorial/02_bordado_mano_4k.jpg'
  },
  {
    categoria: 'camisas',
    titulo: 'Camisa Bordeaux & Navy',
    tela: 'Algodón Doble Cabo',
    imagen: 'assets/real/camisa_ir_clean.jpg'
  },
  {
    categoria: 'trajes',
    titulo: 'Traje 3 Piezas Gala',
    tela: "Huddersfield Super 120's",
    imagen: 'assets/editorial/07_ajustando_cintura_4k.jpg'
  },
  {
    categoria: 'blazers',
    titulo: 'Saco Gris Claro',
    tela: 'Lana Fresca 280g',
    imagen: 'assets/editorial/09_toma_medidas_4k.jpg'
  }
];

const catalogGrid = document.getElementById('catalogGrid');
const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

function renderCatalog(filter = 'todos') {
  const items = filter === 'todos'
    ? CATALOG_DATA
    : CATALOG_DATA.filter((item) => item.categoria === filter);

  catalogGrid.innerHTML = items.map((item) => {
    const waMsg = encodeURIComponent(`Hola Sastrería Gutember, me interesa: ${item.titulo} (${item.tela}).`);
    return `
      <article class="product-card">
        <div class="product-media">
          <img src="${item.imagen}" alt="${item.titulo}" loading="lazy" />
        </div>
        <div class="product-info">
          <div>
            <p class="product-fabric">${item.tela}</p>
            <h3 class="product-title">${item.titulo}</h3>
          </div>
          <a class="product-wa" href="https://wa.me/51958825440?text=${waMsg}" target="_blank" rel="noopener noreferrer">Consultar →</a>
        </div>
      </article>
    `;
  }).join('');
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderCatalog(btn.dataset.filter);
  });
});
renderCatalog('todos');

// 4. Configurator -> Direct WhatsApp Link
const state = {
  garment: 'Ambo Completo',
  fabric: "Huddersfield Super 120's",
  detail: 'Clásico',
  time: '1 mes (Express 7–15 d)',
  monogram: 'C.M.C'
};

const sumGarment = document.getElementById('sumGarment');
const sumFabric = document.getElementById('sumFabric');
const sumDetail = document.getElementById('sumDetail');
const sumTime = document.getElementById('sumTime');
const monogramInput = document.getElementById('monogramInput');
const monogramPreview = document.getElementById('monogramPreview');
const sendWhatsAppConfig = document.getElementById('sendWhatsAppConfig');

function updateSummary() {
  sumGarment.textContent = state.garment;
  sumFabric.textContent = state.fabric;
  sumDetail.textContent = state.detail;
  sumTime.textContent = state.time;
  monogramPreview.textContent = state.monogram || '—';

  const msg = `Hola Sastrería Gutember, quisiera cotizar: ${state.garment} | Tejido: ${state.fabric} | Corte: ${state.detail} | Iniciales: ${state.monogram || 'Sin iniciales'}.`;
  sendWhatsAppConfig.href = `https://wa.me/51958825440?text=${encodeURIComponent(msg)}`;
}

function bindPillGroup(containerId, key, onSelect) {
  const buttons = Array.from(document.querySelectorAll(`#${containerId} .option-pill`));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state[key] = btn.dataset.value;
      if (onSelect) onSelect(btn);
      updateSummary();
    });
  });
}

bindPillGroup('garmentOptions', 'garment', (btn) => {
  if (btn.dataset.time) state.time = btn.dataset.time;
});
bindPillGroup('fabricOptions', 'fabric');
bindPillGroup('detailOptions', 'detail');

monogramInput.addEventListener('input', (e) => {
  state.monogram = e.target.value.toUpperCase();
  updateSummary();
});

updateSummary();
