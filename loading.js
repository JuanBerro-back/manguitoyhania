const container = document.getElementById('loader-container');
let intervalId;
let timeoutId;

function clearLoader() {
  container.innerHTML = '';
  if (intervalId) clearInterval(intervalId);
  if (timeoutId) clearTimeout(timeoutId);
}

function updateButtons(activeId) {
  document.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + activeId).classList.add('active');
}

// ---------------------------------------------------------
// OPTION 1: HEARTBEAT
// ---------------------------------------------------------
function initHeartbeat() {
  clearLoader();
  updateButtons('heartbeat');

  container.innerHTML = `
    <div class="heart">💖</div>
    <div class="heart-text">CARGANDO NUESTRO AÑO... <span id="percent">0%</span></div>
  `;

  let percent = 0;
  intervalId = setInterval(() => {
    percent++;
    if (percent > 100) percent = 0;
    const el = document.getElementById('percent');
    if (el) el.innerText = percent + '%';
  }, 50);
}

// ---------------------------------------------------------
// OPTION 2: TYPEWRITER
// ---------------------------------------------------------
function initTypewriter() {
  clearLoader();
  updateButtons('typewriter');

  container.innerHTML = `<div class="typewriter-text" id="typewriter"></div>`;

  const phrases = [
    "Recopilando momentos...",
    "Ordenando sonrisas...",
    "Preparando la magia...",
    "Casi listo..."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const fullPhrase = phrases[phraseIndex];

    // Safety check just in case container was cleared
    const el = document.getElementById('typewriter');
    if (!el) return;

    if (isDeleting) {
      el.innerText = fullPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.innerText = fullPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === fullPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    timeoutId = setTimeout(type, typeSpeed);
  }

  type();
}

// ---------------------------------------------------------
// OPTION 3: PROGRESS LOVE
// ---------------------------------------------------------
function initProgress() {
  clearLoader();
  updateButtons('progress');

  container.innerHTML = `
    <div class="progress-text">Caminando juntos...</div>
    <div class="progress-container">
      <div class="progress-bar" id="prog-bar">
        <div class="progress-icon">🚶‍♂️🚶‍♀️</div>
      </div>
    </div>
  `;

  let width = 0;
  intervalId = setInterval(() => {
    width++;
    if (width > 100) width = 0;
    const el = document.getElementById('prog-bar');
    if (el) el.style.width = width + '%';
  }, 50);
}

// ---------------------------------------------------------
// OPTION 4: INFINITE
// ---------------------------------------------------------
function initInfinite() {
  clearLoader();
  updateButtons('infinite');

  container.innerHTML = `
    <svg class="infinite-svg" viewBox="0 0 100 50">
      <path class="infinite-path" d="M20,25 C20,10 40,10 50,25 C60,40 80,40 80,25 C80,10 60,10 50,25 C40,40 20,40 20,25 z" />
    </svg>
  `;
}

// ---------------------------------------------------------
// OPTION 5: DATE (COUNTER) 📅
// ---------------------------------------------------------
function initDate() {
  clearLoader();
  updateButtons('date');

  container.innerHTML = `
    <div class="date-container">
      <div class="date-start">Desde el 20/01/2025</div>
      <div class="date-counter" id="counter">
        <!-- JS will populate -->
      </div>
    </div>
  `;

  // Real logic: Calculate time since Jan 20, 2025
  const startDate = new Date('2025-01-20T00:00:00');

  function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Format simple
    const counterEl = document.getElementById('counter');
    if (counterEl) {
      counterEl.innerHTML = `
        <div class="counter-item"><span>${days}</span><span class="counter-label">DÍAS</span></div>
        <div class="counter-item"><span>:</span></div>
        <div class="counter-item"><span>${hours}</span><span class="counter-label">HRS</span></div>
        <div class="counter-item"><span>:</span></div>
        <div class="counter-item"><span>${minutes}</span><span class="counter-label">MIN</span></div>
        <div class="counter-item"><span>:</span></div>
        <div class="counter-item"><span>${seconds}</span><span class="counter-label">SEG</span></div>
      `;
    }
  }

  updateCounter();
  intervalId = setInterval(updateCounter, 1000);
}

// ---------------------------------------------------------
// LOGIC
// ---------------------------------------------------------
window.switchLoader = (name) => {
  if (name === 'heartbeat') initHeartbeat();
  if (name === 'typewriter') initTypewriter();
  if (name === 'progress') initProgress();
  if (name === 'infinite') initInfinite();
  if (name === 'date') initDate();
};

initDate(); // Start with the new requested one
