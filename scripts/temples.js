// ===== Footer dinâmico =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = `Last Modified: ${document.lastModified}`;

// ===== Força o mesmo src em todas as imagens + tratamento de erro =====
const IMG_SRC = "images/san-diego-temple-900-32c.png"; // mantenha esse caminho/arquivo
document.querySelectorAll("#album img").forEach((img) => {
  img.src = IMG_SRC;
  img.addEventListener("error", () => {
    console.warn("[IMG] Não foi possível carregar:", IMG_SRC, "- verifique nome/pasta.");
    const fig = img.closest("figure");
    if (fig) fig.style.outline = "2px dashed #d33";
    img.alt = (img.alt || "Temple image") + " (imagem não encontrada)";
  });
});

// ===== Menu hambúrguer (mobile) =====
const btn = document.getElementById("menu-toggle");
const navList = document.querySelector("#primary-nav ul");
const MQ = window.matchMedia("(min-width: 48rem)");

function openMenu(open) {
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", String(open));
  navList.classList.toggle("show", open);
}

// garante estado inicial SEMPRE fechado (mesmo se alguém deixar 'open' no HTML)
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
const album = document.getElementById("album");
const figures = [...album.querySelectorAll("figure")];
const links = [...document.querySelectorAll("#primary-nav a")];

function setActive(link){
  links.forEach(a=>{
    const on = a===link;
    a.classList.toggle("active",on);
    a.setAttribute("aria-current", on ? "page" : "false");
    a.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function showFigure(fig){ fig.classList.remove("is-hidden"); requestAnimationFrame(()=>fig.classList.add("fade-in")); setTimeout(()=>fig.classList.remove("fade-in"),250); }
function hideFigure(fig){ fig.classList.add("fade-out"); setTimeout(()=>{ fig.classList.remove("fade-out"); fig.classList.add("is-hidden"); },200); }
function applyFilter(type){
  figures.forEach(fig=>{
    const year = Number(fig.dataset.year);
    const size = fig.dataset.size;
    let keep = true;
    if(type==="old") keep = year < 2000;
    if(type==="new") keep = year >= 2000;
    if(type==="large") keep = size==="large";
    if(type==="small") keep = size==="small";
    (keep ? showFigure : hideFigure)(fig);
  });
}
links.forEach(link=>{
  link.addEventListener("click",(e)=>{
    e.preventDefault();
    setActive(link);
    const filter = link.dataset.filter;
    const h2 = document.querySelector("main h2");
    if(!filter){ figures.forEach(showFigure); h2.textContent="Home"; }
    else { applyFilter(filter); h2.textContent = link.textContent; }
  });
  link.addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); link.click(); }});
});

// ===== Diagnóstico/Fallback p/ CSS large (se não carregar, aplica regras mínimas) =====
function largeCssAtivo() {
  const isDesktop = window.matchMedia("(min-width: 48rem)").matches;
  if (!isDesktop) return true; // não testa em mobile
  const btnDisplay = getComputedStyle(document.querySelector(".menu-toggle")).display;
  return btnDisplay === "none"; // no desktop o botão deve sumir
}
function aplicarFallbackDesktopMinimo() {
  const style = document.createElement("style");
  style.textContent = `
    @media (min-width: 48rem) {
      .menu-toggle{ display:none !important; }
      .nav ul{ display:flex !important; position:static !important;
               flex-direction:row !important; gap:.5rem; background:transparent; box-shadow:none; }
      .album{ grid-template-columns:repeat(3,1fr) !important; gap:1.25rem !important; }
    }
  `;
  document.head.appendChild(style);
}
window.addEventListener("load", () => {
  if (!largeCssAtivo()) {
    console.warn("[CSS] 'temples-large.css' não parece ativo. Aplicando fallback mínimo.");
    aplicarFallbackDesktopMinimo();
  }
});
