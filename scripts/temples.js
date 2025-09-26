/* =========================
   W04 - Filtered Temples
   Author: Caio Palladino Da Rosa
   ========================= */

/* ---------- Footer dinâmico ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = `Last Modified: ${document.lastModified}`;

/* ---------- Dados (7 originais + 3 extras) ---------- */
/* Imagens estáveis (Wikimedia Commons) para os que falhavam:
   - Rome Italy Temple: https://upload.wikimedia.org/wikipedia/commons/8/8b/RomeTempleatSunset.jpg
   - São Paulo Brazil Temple: https://upload.wikimedia.org/wikipedia/commons/c/c4/Sao_Paulo_Brazil_Temple.jpg
   - Salt Lake Temple: https://upload.wikimedia.org/wikipedia/commons/9/93/Salt_Lake_Temple%2C_Utah_-_Sept_2004-2.jpg
   Créditos/licenças: ver páginas dos arquivos no Wikimedia Commons. */
const temples = [
  // originais fornecidos
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

  // +3 que você precisava com as FOTOS REAIS
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8b/RomeTempleatSunset.jpg", // Wikimedia (CC BY-SA 4.0)
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Sao_Paulo_Brazil_Temple.jpg", // Wikimedia (CC BY-SA 2.0)
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Salt_Lake_Temple%2C_Utah_-_Sept_2004-2.jpg", // Wikimedia (CC BY 2.5/3.0/GFDL)
  },
];

/* ---------- Helpers ---------- */
const album = document.getElementById("album");
const titleH2 = document.querySelector("main h2");

function createCard(t) {
  const fig = document.createElement("figure");
  fig.className = "temple-card";
  // dataset auxilia nos filtros alternativos, se quiser
  fig.dataset.area = t.area;
  fig.dataset.year = Number(t.dedicated.split(",")[0]);

  const h3 = document.createElement("h3");
  h3.textContent = t.templeName;

  const pLoc = document.createElement("p");
  pLoc.innerHTML = `<strong>LOCATION:</strong> ${t.location}`;

  const pDed = document.createElement("p");
  pDed.innerHTML = `<strong>DEDICATED:</strong> ${t.dedicated}`;

  const pArea = document.createElement("p");
  pArea.innerHTML = `<strong>SIZE:</strong> ${Number(t.area).toLocaleString("en-US")} sq ft`;

  const img = document.createElement("img");
  img.src = t.imageUrl;
  img.alt = `${t.templeName} Temple exterior`;
  img.loading = "lazy";
  img.width = 900;
  img.height = 675;

  // Tratamento de erro de imagem
  img.addEventListener("error", () => {
    console.warn("[IMG] Falha ao carregar:", t.imageUrl);
    img.replaceWith(document.createTextNode("Imagem indisponível"));
    fig.style.outline = "2px dashed #d33";
  });

  fig.append(h3, pLoc, pDed, pArea, img);
  return fig;
}

function render(list, heading = "Home") {
  album.innerHTML = "";
  list.forEach((t) => album.appendChild(createCard(t)));
  titleH2.textContent = heading;
  // rola para o topo para evitar footer cobrindo cards ao trocar filtro
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Filtros ---------- */
const links = [...document.querySelectorAll("#primary-nav a")];

function setActive(link) {
  links.forEach((a) => {
    const on = a === link;
    a.classList.toggle("active", on);
    a.setAttribute("aria-current", on ? "page" : "false");
    a.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function filter(type) {
  if (!type) return temples;
  return temples.filter((t) => {
    const year = Number(t.dedicated.split(",")[0]);
    if (type === "old") return year < 1900;
    if (type === "new") return year > 2000;
    if (type === "large") return t.area > 90000;
    if (type === "small") return t.area < 10000;
    return true;
  });
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const type = link.dataset.filter || "";
    setActive(link);
    const list = filter(type);
    render(list, type ? link.textContent : "Home");
  });
  link.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      link.click();
    }
  });
});

/* ---------- Menu hambúrguer (mobile) ---------- */
const btn = document.getElementById("menu-toggle");
const navList = document.querySelector("#primary-nav ul");
const MQ = window.matchMedia("(min-width: 48rem)");

function openMenu(open) {
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", String(open));
  navList.classList.toggle("show", open);
}
document.addEventListener("DOMContentLoaded", () => openMenu(false));
btn?.addEventListener("click", () => openMenu(!btn.classList.contains("open")));
btn?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    btn.click();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") openMenu(false);
});
document.addEventListener("click", (e) => {
  if (!MQ.matches && !e.target.closest(".site-header")) openMenu(false);
});
MQ.addEventListener("change", () => openMenu(false));
navList.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && !MQ.matches) openMenu(false);
});

/* ---------- Inicializa ---------- */
render(temples, "Home");
