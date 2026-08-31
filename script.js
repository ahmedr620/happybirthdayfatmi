const $ = (id) => document.getElementById(id);
const c = birthdayContent;

// Hero
$("hero-eyebrow").textContent = c.hero.eyebrow;
$("hero-title").textContent = c.hero.title;
$("hero-subtitle").textContent = c.hero.subtitle;
$("enter-button-text").textContent = c.hero.button;
$("hero-note").textContent = c.hero.note;

// Letter
$("letter-heading").textContent = c.letter.heading;
const letterBody = $("letter-body");
c.letter.paragraphs.forEach(text => {
  const p = document.createElement("p");
  p.textContent = text;
  letterBody.appendChild(p);
});
$("letter-signoff").textContent = c.letter.signoff;

// Reasons
$("reasons-heading").textContent = c.reasons.heading;
$("reasons-subheading").textContent = c.reasons.subheading;
$("reason-count").textContent = c.reasons.items.length;

const reasonsGrid = $("reasons-grid");
c.reasons.items.forEach((item, i) => {
  const card = document.createElement("article");
  card.className = "reason-card";
  card.innerHTML = `
    <div class="reason-number">${i + 1}</div>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  `;
  reasonsGrid.appendChild(card);
});

// Gallery
$("gallery-heading").textContent = c.gallery.heading;
$("gallery-subheading").textContent = c.gallery.subheading;
const photoGrid = $("photo-grid");

c.gallery.photos.forEach((photo, i) => {
  const card = document.createElement("figure");
  card.className = "photo-card";

  if (photo.src && photo.src.trim()) {
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt || `Birthday memory ${i + 1}`;
    card.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "photo-placeholder";
    ph.innerHTML = `<div><div style="font-size:2rem">♡</div><strong>Add photo ${i + 1}</strong><br><small>Drop an image into /assets and edit content.js</small></div>`;
    card.appendChild(ph);
  }

  const cap = document.createElement("figcaption");
  cap.className = "photo-caption";
  cap.textContent = photo.caption;
  card.appendChild(cap);
  photoGrid.appendChild(card);
});

// Bunny game
$("bunny-heading").textContent = c.bunny.heading;
$("bunny-copy").textContent = c.bunny.copy;

let bunnyIndex = 0;
$("bunny-btn").addEventListener("click", (e) => {
  const result = c.bunny.results[bunnyIndex % c.bunny.results.length];
  $("bunny-result").textContent = result;
  bunnyIndex++;
  burstSparkles(e.clientX || window.innerWidth/2, e.clientY || window.innerHeight/2);
});

// Music
$("music-heading").textContent = c.music.heading;
$("music-description").textContent = c.music.description;
$("music-link").href = c.music.link;

// Certificate
$("certificate-name").textContent = c.certificate.name;
$("certificate-title").textContent = c.certificate.title;
$("certificate-copy").textContent = c.certificate.copy;
$("certificate-date").textContent = c.certificate.date;

// Gift
$("gift-heading").textContent = c.gift.heading;
$("gift-copy").textContent = c.gift.copy;
$("gift-reveal-title").textContent = c.gift.revealTitle;
$("gift-reveal-copy").textContent = c.gift.revealCopy;
$("gift-reveal-link").href = c.gift.link;

$("gift-btn").addEventListener("click", (e) => {
  $("gift-reveal").classList.add("open");
  $("gift-btn").textContent = "aameen ♡";
  burstSparkles(e.clientX || window.innerWidth/2, e.clientY || window.innerHeight/2);
});

// Footer
$("footer-copy").textContent = c.footer.copy;

// Enter
$("enter-btn").addEventListener("click", () => {
  document.querySelector(".intro-section").scrollIntoView({ behavior: "smooth" });
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Sparkles
function burstSparkles(x, y) {
  const chars = ["♡", "✦", "🐰", "⋆", "♡"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = chars[Math.floor(Math.random() * chars.length)];
    s.style.left = `${x + (Math.random() - .5) * 100}px`;
    s.style.top = `${y + (Math.random() - .5) * 50}px`;
    s.style.animationDelay = `${Math.random() * .18}s`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}

// Ambient occasional sparkles near cursor/touch
document.addEventListener("pointerdown", (e) => {
  if (Math.random() > .35) return;
  burstSparkles(e.clientX, e.clientY);
});
