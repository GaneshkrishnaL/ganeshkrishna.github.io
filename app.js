// Typewriter (stable): fills fixed-width element (#typewriter) with words.
// No layout shifting, no scroll jumping.

const TYPE_WORDS = [
  "Machine Learning Engineer",
  "MLOps • Data Engineering",
  "Deep Learning • Explainable AI",
  "AI Research & Production"
];

const typeEl = document.getElementById('typewriter');
let tIndex = 0, tChar = 0, tDel = false;
function typeTick() {
  if (!typeEl) return;
  const word = TYPE_WORDS[tIndex];
  if (!tDel) {
    tChar++;
    typeEl.textContent = word.slice(0, tChar);
    if (tChar >= word.length) {
      tDel = true;
      setTimeout(typeTick, 900);
      return;
    }
  } else {
    tChar--;
    typeEl.textContent = word.slice(0, tChar);
    if (tChar <= 0) {
      tDel = false;
      tIndex = (tIndex + 1) % TYPE_WORDS.length;
    }
  }
  setTimeout(typeTick, tDel ? 40 + Math.random()*30 : 60 + Math.random()*40);
}
if (typeEl) typeTick();

document.getElementById('year').textContent = new Date().getFullYear();

// Smooth anchors
document.querySelectorAll('.nav-link, .logo, .nav-title, .btn').forEach(el=>{
  el.addEventListener('click', (e)=>{
    const href = el.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// COUNTERS (intersection observer + animated count-up)
const metricEls = document.querySelectorAll('.metric .metric-value');
let metricsSeen = false;
if (metricEls.length > 0) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !metricsSeen) {
        metricsSeen = true;
        metricEls.forEach(el => animateCount(el));
        obs.disconnect();
      }
    });
  }, {threshold: 0.4});
  obs.observe(document.getElementById('metrics'));
}

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target') || '0', 10);
  const duration = 1200;
  const frameRate = 60;
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let frame = 0;
  const start = 0;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const counter = setInterval(() => {
    frame++;
    const progress = easeOut(frame / totalFrames);
    const value = Math.round(start + (target - start) * progress);
    el.textContent = value + (el.getAttribute('data-suffix') || (el.getAttribute('data-target') === '4' ? '+' : ''));
    if (frame >= totalFrames) {
      clearInterval(counter);
      el.textContent = target + (target === 4 ? '+' : (target >= 20 ? '+' : ''));
    }
  }, Math.round(duration / totalFrames));
}

// Quick connect: mailto fallback
function quickConnect(){
  const name = document.getElementById('qc-name')?.value.trim();
  const email = document.getElementById('qc-email')?.value.trim();
  const message = document.getElementById('qc-message')?.value.trim();
  const notice = document.getElementById('qc-notice');

  if(!name || !email || !message){ notice.textContent = 'Please fill all fields.'; return; }

  const subject = encodeURIComponent(`Website message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailto = `mailto:ganymscs@gmail.com?subject=${subject}&body=${body}`;

  notice.textContent = 'Opening your email client to send message...';
  setTimeout(()=>{ window.location.href = mailto; notice.textContent = 'If nothing opened, email directly at ganymscs@gmail.com'; }, 600);
}

function preFillEmail(){
  const subject = encodeURIComponent('Opportunity / Connect from website');
  window.location.href = `mailto:ganymscs@gmail.com?subject=${subject}`;
}
