// --- Template Initialization ---
const initTemplate = () => {
  // 1. Page Title
  document.title = config.pageTitle;

  // 1.b Favicon
  if (config.favicon) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = config.favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // 2. Loading Screen
  document.getElementById('loading-hint').textContent = config.loading.clickHint;
  document.getElementById('loading-msg').textContent = config.loading.message;

  // 3. Hero Section
  document.getElementById('hero-title').textContent = config.hero.title;
  document.getElementById('hero-final-text').textContent = config.hero.finalText;
  document.getElementById('scroll-text').textContent = config.hero.scrollText;
  document.querySelector('.btn-primary span').textContent = config.hero.buttonText;
  document.querySelectorAll('.burning-heart').forEach(el => {
    el.textContent = config.hero.heartCharacter || '🌸';
  });

  // 3.b Escudo de personalidad (Hani / Mango)
  const crestRow = document.getElementById('pet-crest-row');
  if (crestRow && config.pets) {
    ['hani', 'mango'].forEach(key => {
      const pet = config.pets[key];
      if (!pet) return;

      const crest = document.createElement('div');
      crest.className = `pet-crest ${key}`;

      const avatarHtml = pet.photo
        ? `<img class="pet-crest-avatar" src="${pet.photo}" alt="${pet.name}">`
        : `<span class="pet-crest-emoji">${pet.emoji || '🐾'}</span>`;

      crest.innerHTML = `
        ${avatarHtml}
        <span class="pet-crest-name">${pet.name}</span>
        <span class="pet-crest-label">${pet.label}</span>
      `;
      crestRow.appendChild(crest);
    });
  }

  // 4. Timeline Generation
  const timelineContainer = document.getElementById('timeline-container');
  config.timeline.forEach((event, index) => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';
    eventDiv.onclick = function () { toggleEvent(this); };

    // Media Logic (Images or Videos)
    let mediaHtml = '';
    if (event.images && event.images.length > 0) {
      mediaHtml += '<div style="display: flex; justify-content: space-between; gap: 10px; margin: 1rem 0;">';
      event.images.forEach(img => {
        mediaHtml += `<img src="${img}" style="width: ${event.images.length > 1 ? '48%' : '100%'}; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">`;
      });
      mediaHtml += '</div>';
    }

    if (event.videos && event.videos.length > 0) {
      mediaHtml += '<div style="display: flex; justify-content: center; gap: 10px; margin: 1rem 0;">';
      event.videos.forEach(vid => {
        mediaHtml += `<video src="${vid}" style="width: ${event.videos.length > 1 ? '45%' : '90%'}; border-radius: 8px;" autoplay loop muted playsinline></video>`;
      });
      mediaHtml += '</div>';
    }

    eventDiv.innerHTML = `
      <div class="card-glass event-card">
        <div class="event-title">${event.title}</div>
        <div class="event-content">
          ${event.content}
          ${mediaHtml}
          ${event.footer ? `<div style="text-align: center; font-size: 0.9rem; opacity: 0.8; margin-top: 10px;">${event.footer}</div>` : ''}
          ${event.extra || ''}
        </div>
      </div>
    `;
    timelineContainer.appendChild(eventDiv);
  });

  // 5. Gallery Generation
  const galleryContainer = document.getElementById('gallery-container');
  document.getElementById('gallery-title').textContent = config.gallery.title;

  config.gallery.images.forEach(photo => {
    // Soporta tanto strings simples ("assets/foto.jpg") como objetos
    // { src, caption, pet } para que la plantilla siga siendo flexible.
    const isObject = typeof photo === 'object' && photo !== null;
    const imgSrc = isObject ? photo.src : photo;
    const caption = isObject ? photo.caption : null;
    const pet = isObject ? photo.pet : null;

    const photoCard = document.createElement('div');
    photoCard.className = 'card-glass photo-card';

    const petTagHtml = pet
      ? `<span class="pet-tag ${pet}">${pet === 'hani' ? 'Hani' : pet === 'mango' ? 'Mango' : 'Hani & Mango'}</span>`
      : '';

    photoCard.innerHTML = `
      ${petTagHtml}
      <div class="placeholder-img">
        <img src="${imgSrc}" alt="${caption || 'Recuerdo'}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      ${caption ? `<div class="photo-caption">${caption}</div>` : ''}
    `;
    galleryContainer.appendChild(photoCard);
  });

  // 6. Final Message
  document.getElementById('final-message').innerHTML = config.finalMessage.content;

  // 7. Music Source
  const bgMusic = document.getElementById('bg-music');
  if (config.music && config.music.path) {
    bgMusic.src = config.music.path;
    bgMusic.volume = config.music.volume || 0.3;
  }
};

// --- Three.js Background Animation: Pétalos Arcoíris ---
const initThreeJS = () => {
  const container = document.getElementById('canvas-container');
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Pétalos cayendo suavemente, coloreados con la paleta arcoíris
  const parameters = {
    count: 260,
    size: 0.7,
    spread: 60
  };

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const speeds = new Float32Array(parameters.count);
  const sway = new Float32Array(parameters.count);

  const palette = [
    new THREE.Color('#ff6fa0'), // rosa
    new THREE.Color('#ff9f40'), // mango
    new THREE.Color('#ffd93d'), // sol
    new THREE.Color('#5fae6b'), // hoja
    new THREE.Color('#4fc3e8'), // cielo
    new THREE.Color('#8b5fbf')  // hani
  ];

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * parameters.spread;
    positions[i3 + 1] = (Math.random() - 0.5) * parameters.spread;
    positions[i3 + 2] = (Math.random() - 0.5) * 30;

    const color = palette[i % palette.length];
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    speeds[i] = 0.015 + Math.random() * 0.03;
    sway[i] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    transparent: true,
    opacity: 0.85,
    vertexColors: true
  });

  const petals = new THREE.Points(geometry, material);
  scene.add(petals);

  const animate = () => {
    const pos = petals.geometry.attributes.position.array;
    const time = Date.now() * 0.0006;

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] -= speeds[i];
      pos[i3] += Math.sin(time + sway[i]) * 0.015;

      if (pos[i3 + 1] < -parameters.spread / 2) {
        pos[i3 + 1] = parameters.spread / 2;
      }
    }

    petals.geometry.attributes.position.needsUpdate = true;
    petals.rotation.y += 0.0008;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};

// --- GSAP Animations ---
const initAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline();
  heroTl.from('.btn-primary', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 2 });

  // Timeline Events
  gsap.utils.toArray('.event').forEach((event, i) => {
    gsap.from(event, {
      scrollTrigger: {
        trigger: event,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: i % 2 === 0 ? -100 : 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Gallery Photos
  gsap.utils.toArray('.photo-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      delay: (i % 4) * 0.1, // Adjusted stagger for better performance
      ease: 'power4.out'
    });
  });
};

// --- UI Logic ---
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Template Data FIRST
  initTemplate();

  // Then start animations
  initThreeJS();
  initAnimations();

  window.scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  window.toggleEvent = (element) => {
    document.querySelectorAll('.event').forEach(event => {
      if (event !== element) {
        event.classList.remove('active');
      }
    });
    element.classList.toggle('active');
  };
});

// Typewriter Effect
const typeText = (element, text, speed = 75, callback) => {
  element.textContent = "";
  element.style.opacity = 1;
  let i = 0;

  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
};

// Date Counter Animation
const animateDateCounter = () => {
  const el = document.getElementById('hero-date-counter');
  const h1 = document.getElementById('hero-title'); // Changed selector

  if (!el || !h1) return;

  // Use config logic
  const startDateStr = config.hero.startDate; // YYYY-MM-DD
  const startYear = parseInt(startDateStr.split('-')[0]);
  const startMonth = parseInt(startDateStr.split('-')[1]) - 1; // 0-indexed
  const startDay = parseInt(startDateStr.split('-')[2]);

  // Logic: Count 1 year from start date
  const startDate = new Date(startYear, startMonth, startDay).getTime();
  const endDate = new Date(startYear + 1, startMonth, startDay).getTime();

  // Format MM/DD/YYYY for display initially? Or DD/MM/YYYY?
  // Let's stick to DD/MM/YYYY
  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  typeText(h1, config.hero.title, 60, () => {
    // Initial State
    el.innerText = formatDate(new Date(startDate));

    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

    const duration = 2000;
    let startTime = null;

    const update = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);
      const easedProgress = Math.pow(progress, 3);

      const currentMap = startDate + (endDate - startDate) * easedProgress;
      const dateObj = new Date(currentMap);

      el.innerText = formatDate(dateObj);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerText = formatDate(new Date(endDate));
        triggerFinalReveal(el);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(update);
    }, 500);
  });
};

// Final Reveal Logic
const triggerFinalReveal = (dateElement) => {
  gsap.to(dateElement, {
    scale: 10,
    opacity: 0,
    duration: 1.5,
    ease: "power2.in",
    onComplete: () => {
      const h1 = document.querySelector('h1');
      const startY = h1.getBoundingClientRect().top;

      dateElement.style.display = 'none';
      const revealContainer = document.getElementById('final-reveal');

      if (revealContainer) {
        revealContainer.style.display = 'flex';
        const endY = h1.getBoundingClientRect().top;
        const deltaY = startY - endY;

        gsap.fromTo(h1,
          { y: deltaY },
          { y: 0, duration: 1.5, ease: "power3.inOut" }
        );

        gsap.to(revealContainer, {
          opacity: 1,
          duration: 1.5,
          delay: 0.3,
          ease: "power2.out",
          onComplete: () => {
            setupHeartScrollEffect();
          }
        });
      }
    }
  });
};

const setupHeartScrollEffect = () => {
  const isMobile = window.innerWidth <= 768;

  gsap.to('#intro .heart-wrapper', {
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: 'bottom top',
      scrub: 1, // ✨ Smooth scrubbing for mobile
      onEnter: () => {
        const introHeart = document.querySelector('#intro .burning-heart');
        if (introHeart) introHeart.style.animation = 'none';
      },
      onLeaveBack: () => {
        const introHeart = document.querySelector('#intro .burning-heart');
        if (introHeart) introHeart.style.animation = 'burnPulse 1.5s infinite alternate';
      }
    },
    scale: isMobile ? 8 : 15, // Reduced scale on mobile
    y: isMobile ? 300 : 600,  // Reduced movement on mobile
    opacity: 0,
    ease: "power1.in"
  });

  gsap.to('.scroll-indicator', {
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: '10% top',
      scrub: 1 // Smooth fade out
    },
    opacity: 0,
    y: -20
  });
};

// Force scroll to top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Interaction Logic
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-overlay');
  const loaderBtn = document.querySelector('.loader-btn');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  let isPlaying = false;

  const startExperience = () => {
    // Start music
    bgMusic.muted = false;
    bgMusic.volume = config.music.volume;
    bgMusic.play().then(() => {
      isPlaying = true;
      if (musicToggle) {
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.music-icon').textContent = '🔊';
      }
    }).catch(err => {
      console.log('Error playing music:', err);
    });

    // Fade out loader
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';

      setTimeout(() => {
        ScrollTrigger.refresh();
        animateDateCounter();
      }, 500);
    }, 800);
  };

  if (loaderBtn) {
    loaderBtn.addEventListener('click', startExperience);
    // Also allow clicking the hint
    const hint = document.querySelector('.click-hint');
    if (hint) hint.addEventListener('click', startExperience);
  }

  // Music toggle
  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
        isPlaying = false;
      } else {
        bgMusic.muted = false;
        bgMusic.volume = config.music.volume;
        bgMusic.play().then(() => {
          musicToggle.classList.add('playing');
          musicToggle.querySelector('.music-icon').textContent = '🔊';
          isPlaying = true;
        }).catch(err => {
          console.log('Error playing music:', err);
        });
      }
    });
  }
});

