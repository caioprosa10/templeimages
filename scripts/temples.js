// ===== Footer dinâmico =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = `Last Modified: ${document.lastModified}`;

// ===== Dados dos templos =====
const temples = [
  // 7 originais
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },

  // +3 adicionados
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-2172192.jpg",
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-lds-1076081-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-temple/400x250/salt-lake-temple-37762.jpg",
  },
];

// ===== Helpers =====
const album = document.getElementById("album");
const h2 = document.querySelector("main h2");

function yearFromDedicated(d) {
  // formato: "YYYY, Month, Day" → pega os 4 primeiros
  const y = parseInt(String(d).slice(0, 4), 10);
  return Number.isFinite(y) ? y : 0;
}

function cardTemplate(t) {
  const article = document.createElement("article");
  article.className = "card";

  const h3 = document.createElement("h3");
  h3.textContent = t.templeName;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML = `
    <div><span class="label">Location:</span> ${t.location}</div>
    <div><span class="label">Dedicated:</span> ${t.dedicated}</div>
    <div><span class="label">Size:</span> ${t.area.toLocaleString()} sq ft</div>
  `;

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = t.imageUrl;
  img.alt = `${t.templeName} Temple exterior`;

  article.append(h3, meta, img);
  return article;
}

function render(list) {
  album.innerHTML = "";
  const frag = document.createDocumentFragment();
  list.forEach((t) => frag.appendChild(cardTemplate(t)));
  album.appendChild(frag);
}

// ===== Menu hambúrguer (mobile) =====
const btn = document.getElementById("menu-toggle");
const navList = document.querySelector("#primary-nav ul");
const MQ = window.matchMedia("(min-width: 48rem)");

function openMenu(open) {
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", String(open));
  navList.classList.toggle("show", open);
}
document.addEventListener("DOMContentLoaded", () => openMenu(false));
btn.addEventListener("click", () => openMenu(!btn.classList.contains("open")));
btn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") openMenu(false); });
document.addEventListener("click", (e) => { if (!MQ.matches && !e.target.closest(".site-header")) openMenu(false); });
MQ.addEventListener("change", () => openMenu(false));
navList.addEventListener("click", (e) => { if (e.target.tagName === "A" && !MQ.matches) openMenu(false); });

// ===== Filtros =====
const links = [...document.querySelectorAll("#primary-nav a")];

function setActive(link){
  links.forEach(a=>{
    const on = a===link;
    a.classList.toggle("active",on);
    a.setAttribute("aria-current", on ? "page" : "false");
    a.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function applyFilter(type) {
  let filtered = temples.slice();

  if (type === "old") {
    filtered = filtered.filter(t => yearFromDedicated(t.dedicated) < 1900);
    h2.textContent = "Old";
  } else if (type === "new") {
    filtered = filtered.filter(t => yearFromDedicated(t.dedicated) > 2000); // after 2000
    h2.textContent = "New";
  } else if (type === "large") {
    filtered = filtered.filter(t => t.area > 90000);
    h2.textContent = "Large";
  } else if (type === "small") {
    filtered = filtered.filter(t => t.area < 10000);
    h2.textContent = "Small";
  } else {
    h2.textContent = "Home";
  }

  render(filtered);
}

links.forEach(link=>{
  link.addEventListener("click",(e)=>{
    e.preventDefault();
    setActive(link);
    applyFilter(link.dataset.filter || "");
  });
  link.addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); link.click(); }});
});

// ===== Inicialização =====
render(temples);

