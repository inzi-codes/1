const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  setTimeout(() => {
    cursorTrail.style.left = mx + 'px';
    cursorTrail.style.top = my + 'px';
  }, 80);
});

const floatingBg = document.getElementById('floatingHeartsBg');
const bgEmojis = ['❤️','💕','💗','💖','💝','🌹','✨','💫','🌸','عشق','محبت'];
for(let i = 0; i < 25; i++) {
  const el = document.createElement('div');
  el.className = 'fh';
  el.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
  el.style.left = Math.random() * 100 + '%';
  el.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
  el.style.animationDuration = (8 + Math.random() * 15) + 's';
  el.style.animationDelay = -(Math.random() * 15) + 's';
  if (el.textContent === 'عشق' || el.textContent === 'محبت') {
    el.style.fontFamily = "'Amiri', serif";
  }
  floatingBg.appendChild(el);
}

const petalCont = document.getElementById('petal-container');
const petals = ['🌸','🌹','🌺','💮','🏵️','✨'];
function createPetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petals[Math.floor(Math.random() * petals.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.fontSize = (0.7 + Math.random() * 0.8) + 'rem';
  p.style.opacity = 0.12 + Math.random() * 0.18;
  const duration = 9 + Math.random() * 10;
  p.style.animationDuration = duration + 's';
  p.style.animationDelay = Math.random() * 5 + 's';
  petalCont.appendChild(p);
  setTimeout(() => p.remove(), (duration + 5) * 1000);
}
setInterval(createPetal, 2000);
for(let i = 0; i < 6; i++) setTimeout(createPetal, i * 400);

const sparkCont = document.getElementById('sparkleContainer');
function createSparkle() {
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.style.left = Math.random() * 100 + '%';
  s.style.animationDuration = (4 + Math.random() * 6) + 's';
  s.style.animationDelay = (Math.random() * 4) + 's';
  s.style.width = s.style.height = (3 + Math.random() * 6) + 'px';
  sparkCont.appendChild(s);
  setTimeout(() => s.remove(), 12000);
}
setInterval(createSparkle, 400);
for(let i = 0; i < 15; i++) setTimeout(createSparkle, i * 200);

const touchEmojis = [
  '💗','💖','❤️','💕','😘','💋','🥰','😍','💝','💞',
  '🌹','✨','💫','🔥','💍','👑','🌸','🏮','🌙','⭐',
  'Ummaahhh!','Love You!','😘 Muaahhh','I Love You!',
  '🥺 Rukhiii!','💗 Mine!','InZi ❤️ Rukhiii',
  'Ishq! 💜','Teri Jhappi 🫂','Meri Jaan 💗',
  'عشق','محبت','رخی 💗'
];

const kissMessages = [
  'Ummaahhh! 😘', 'I Love You! 💗', 'Muaahhh 💋',
  'Mine Forever! 💍', 'Meri Jaan! 🥺', 'So Beautiful! 😍',
  'My Queen! 👑', 'Kiss Kiss! 😘', 'Ishq Hai Mujhe! 🔥',
  'Rukhiii 💗', 'Teri Jhappi Chahiye! 🫂', 'Hamesha Tera! ♾️'
];

function createTouchBurst(x, y) {
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.className = 'emoji-particle';
    el.textContent = touchEmojis[Math.floor(Math.random() * touchEmojis.length)];
    el.style.left = (x + (Math.random() - 0.5) * 120) + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    const duration = 2.5 + Math.random() * 2;
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = (Math.random() * 0.3) + 's';
    if (['عشق','محبت','رخی 💗'].includes(el.textContent)) {
      el.style.fontFamily = "'Amiri', serif";
    }
    document.getElementById('emoji-rain').appendChild(el);
    setTimeout(() => el.remove(), (duration + 1) * 1000);
  }

  const kiss = document.createElement('div');
  kiss.className = 'kiss-popup';
  kiss.textContent = kissMessages[Math.floor(Math.random() * kissMessages.length)];
  kiss.style.left = x + 'px';
  kiss.style.top = y + 'px';
  document.body.appendChild(kiss);
  setTimeout(() => kiss.remove(), 2500);

  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.width = ripple.style.height = '80px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1000);
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('button') && !e.target.closest('a')) {
    createTouchBurst(e.clientX, e.clientY);
  }
});

document.addEventListener('touchstart', (e) => {
  Array.from(e.touches).forEach(touch => {
    createTouchBurst(touch.clientX, touch.clientY);
  });
}, { passive: true });

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reason-card, .promise-item, .poem-stanza, .memory-card, .urdu-poetry-card, .eid-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => observer.observe(el));

function updateCountdown() {
  const eidDate = new Date('2026-03-20T06:00:00');
  const now = new Date();
  const diff = eidDate - now;
  
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '🎉';
    document.getElementById('cd-hours').textContent = '🌙';
    document.getElementById('cd-mins').textContent = '💗';
    document.getElementById('cd-secs').textContent = '✨';
    return;
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

let noMoves = 0;
function moveNoBtn() {
  const btn = document.getElementById('noBtn');
  if(!btn) return;
  noMoves++;
  if(noMoves > 6) {
    btn.style.display = 'none';
    return;
  }
  const maxX = window.innerWidth - 160;
  const maxY = window.innerHeight - 70;
  btn.style.position = 'fixed';
  btn.style.left = Math.max(20, Math.random() * maxX) + 'px';
  btn.style.top = Math.max(80, Math.random() * maxY) + 'px';
  btn.style.zIndex = '2000';
  btn.textContent = ['Nahi! 😜','Dhundo mujhe! 🏃','Nope! 😂','Hahaha! 🙈','Kabhi nahi... just kidding! 😝','Main bhaag rahi hoon!'][noMoves - 1] || 'Gayab! 👋';
}

function sayYes() {
  const buttonArea = document.getElementById('buttonArea');
  const celebMsg = document.getElementById('celebration-msg');
  const noBtn = document.getElementById('noBtn');

  if(buttonArea) buttonArea.style.display = 'none';
  if(noBtn) noBtn.style.display = 'none';
  if(celebMsg) celebMsg.style.display = 'flex';

  const bigEmojis = ['🎉','💍','💗','❤️','🌹','✨','💫','🎊','💕','👑','😍','💋','🥰','🎆','🌸','🌙','🏮','⭐'];
  for(let i = 0; i < 100; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'emoji-particle';
      el.textContent = bigEmojis[Math.floor(Math.random() * bigEmojis.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = (40 + Math.random() * 50) + 'vh';
      el.style.fontSize = (1.3 + Math.random() * 2.5) + 'rem';
      el.style.animationDuration = (3 + Math.random() * 3) + 's';
      document.getElementById('emoji-rain').appendChild(el);
      setTimeout(() => el.remove(), 7000);
    }, i * 55);
  }

  const msgs = ['Haan! 💍','Rukhiii ne HAAN keh diya! 💗','InZi ❤️ Rukhiii','Ummaahhh! 😘','Mubarak Ho! 🎉','Hamesha ke liye! ♾️'];
  msgs.forEach((msg, i) => {
    setTimeout(() => {
      const kiss = document.createElement('div');
      kiss.className = 'kiss-popup';
      kiss.textContent = msg;
      kiss.style.left = (15 + Math.random() * 70) + 'vw';
      kiss.style.top = (25 + Math.random() * 45) + 'vh';
      kiss.style.fontSize = '2.2rem';
      document.body.appendChild(kiss);
      setTimeout(() => kiss.remove(), 3000);
    }, i * 500);
  });
}

const ambientEmojis = ['💗','✨','🌸','💫','🌹','❤️','💕','🌙'];
setInterval(() => {
  if(Math.random() > 0.7) {
    const el = document.createElement('div');
    el.className = 'emoji-particle';
    el.textContent = ambientEmojis[Math.floor(Math.random() * ambientEmojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = (55 + Math.random() * 40) + 'vh';
    el.style.fontSize = '0.95rem';
    el.style.opacity = '0.35';
    el.style.animationDuration = '5s';
    document.getElementById('emoji-rain').appendChild(el);
    setTimeout(() => el.remove(), 6000);
  }
}, 1600);

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorTrail.style.display = 'none';
  document.body.style.cursor = 'auto';
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

let lastHeartTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if(now - lastHeartTime > 180 && Math.random() > 0.5) {
    lastHeartTime = now;
    const heart = document.createElement('div');
    heart.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      font-size:0.8rem; pointer-events:none; z-index:9990;
      transform:translate(-50%,-50%);
      animation: floatUp 2s ease forwards;
      opacity:0.5;
    `;
    heart.textContent = ['💗','✨','💕','🌸'][Math.floor(Math.random()*4)];
    document.getElementById('emoji-rain').appendChild(heart);
    setTimeout(() => heart.remove(), 2500);
  }
});