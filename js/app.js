// ===== LUNA MODA — lógica de tienda =====
const $ = (s) => document.querySelector(s);
const money = (n) => "$" + n.toLocaleString("en-US");
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fce4ec"/><stop offset="1" stop-color="#f8bbd0"/></linearGradient></defs><rect width="600" height="750" fill="url(#g)"/><text x="300" y="375" font-size="28" text-anchor="middle" fill="#ad1457" font-family="sans-serif">LUNA MODA</text></svg>`
);
const img = (p) => p.img || PLACEHOLDER;

function stars(r) {
  const full = Math.round(r);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
function discount(p) {
  if (!p.old) return "";
  return `<span class="off">-${Math.round((1 - p.price / p.old) * 100)}%</span>`;
}

// ---------- Render de productos ----------
function card(p) {
  return `
  <article class="card" data-id="${p.id}">
    <div class="card-img" data-quick="${p.id}">
      <img src="${img(p)}" alt="${p.name}" loading="lazy">
      ${discount(p)}
      <button class="wish ${isWished(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="Wishlist">♡</button>
    </div>
    <div class="card-body">
      <h3 data-quick="${p.id}">${p.name}</h3>
      <div class="stars">${stars(p.rating)} <span>(${p.reviews})</span></div>
      <p class="price-row"><span class="price">${money(p.price)}</span>${p.old ? `<span class="old">${money(p.old)}</span>` : ""}</p>
      <button class="btn-add" data-add="${p.id}">Add 🛒</button>
    </div>
  </article>`;
}

function renderGrid(el, list) {
  el.innerHTML = list.map(card).join("");
}

function renderAll(filter = "all", query = "") {
  let list = PRODUCTS.slice();
  if (filter === "ofertas") list = list.filter((p) => p.old);
  else if (filter !== "all") list = list.filter((p) => p.cat === filter);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter((p) => (p.name + " " + p.desc).toLowerCase().includes(q));
  }
  renderGrid($("#gridBest"), list.filter((p) => p.best));
  renderGrid($("#gridNew"), list.filter((p) => !p.best));
  document.querySelectorAll(".cat-link").forEach((b) =>
    b.classList.toggle("active", b.dataset.cat === filter)
  );
}

// ---------- Categorías circulares ----------
function renderCats() {
  $("#catCircles").innerHTML = CATEGORIES.map((c) => {
    const p = PRODUCTS.find((x) => x.cat === c.key);
    return `<button class="cat-circle" data-cat="${c.key}">
      <img src="${c.img || (p ? img(p) : PLACEHOLDER)}" alt="${c.label}" loading="lazy">
      <span>${c.label}</span>
    </button>`;
  }).join("");
}

// ---------- Vista rápida ----------
let qvId = null, qvQty = 1, qvSize = "M";
function openQuick(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  qvId = id; qvQty = 1; qvSize = "M";
  $("#quickImg").src = img(p);
  $("#quickName").textContent = p.name;
  $("#quickStars").innerHTML = `${stars(p.rating)} <span>(${p.reviews} reviews)</span>`;
  $("#quickPrice").textContent = money(p.price);
  $("#quickOld").textContent = p.old ? money(p.old) : "";
  $("#quickDesc").textContent = p.desc;
  $("#qvQty").textContent = "1";
  const sizes = ["joyeria", "bufandas", "carteras", "sombreros"].includes(p.cat)
    ? ["One size"] : ["XS", "S", "M", "L", "XL"];
  $("#quickSizes").innerHTML = sizes.map((s) =>
    `<button class="${s === qvSize || (sizes.length === 1) ? "sel" : ""}" data-size="${s}">${s}</button>`
  ).join("");
  if (sizes.length === 1) qvSize = "One size";
  $("#quickModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeQuick() {
  $("#quickModal").classList.add("hidden");
  document.body.style.overflow = "";
}

// ---------- Carrito ----------
let cart = [];
try { cart = JSON.parse(localStorage.getItem("lm_cart") || "[]"); } catch (e) { cart = []; }
let wish = [];
try { wish = JSON.parse(localStorage.getItem("lm_wish") || "[]"); } catch (e) { wish = []; }

const saveCart = () => localStorage.setItem("lm_cart", JSON.stringify(cart));
const saveWish = () => localStorage.setItem("lm_wish", JSON.stringify(wish));
const isWished = (id) => wish.includes(id);
const cartQty = () => cart.reduce((a, i) => a + i.qty, 0);
const cartSum = () => cart.reduce((a, i) => {
  const p = PRODUCTS.find((x) => x.id === i.id);
  return a + (p ? p.price * i.qty : 0);
}, 0);

function addToCart(id, qty = 1, size = "M") {
  const line = cart.find((i) => i.id === id && i.size === size);
  if (line) line.qty += qty;
  else cart.push({ id, qty, size });
  saveCart(); updateBadges(); renderCart();
  toast("Added to cart 🛒");
}

function updateBadges() {
  const q = cartQty();
  $("#cartCount").textContent = q;
  $("#cartCount").classList.toggle("hidden", q === 0);
  $("#wishCount").textContent = wish.length;
  $("#wishCount").classList.toggle("hidden", wish.length === 0);
}

function renderCart() {
  const box = $("#cartItems");
  $("#cartHeadCount").textContent = cartQty() ? `(${cartQty()})` : "";
  if (!cart.length) {
    box.innerHTML = `<div class="cart-empty">Your cart is empty.<br>Discover what's new! ✨</div>`;
  } else {
    box.innerHTML = cart.map((i) => {
      const p = PRODUCTS.find((x) => x.id === i.id);
      if (!p) return "";
      return `<div class="cart-line" data-id="${p.id}" data-size="${i.size}">
        <img src="${img(p)}" alt="${p.name}">
        <div class="cl-info">
          <h4>${p.name}</h4>
          <p class="cl-size">Size: ${i.size}</p>
          <p class="price">${money(p.price)}</p>
          <div class="qty small">
            <button data-dec="${p.id}|${i.size}">−</button><span>${i.qty}</span><button data-inc="${p.id}|${i.size}">+</button>
          </div>
        </div>
        <button class="cl-del" data-del="${p.id}|${i.size}" aria-label="Remove">✕</button>
      </div>`;
    }).join("");
  }
  $("#cartTotal").textContent = money(cartSum());
}

function openCart() {
  renderCart();
  $("#cartDrawer").classList.remove("hidden");
  $("#overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  $("#cartDrawer").classList.add("hidden");
  $("#overlay").classList.add("hidden");
  document.body.style.overflow = "";
}

function checkoutWA() {
  if (!cart.length) { toast("Your cart is empty"); return; }
  const lines = cart.map((i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return `• ${p.name} (Size ${i.size}) x${i.qty} — ${money(p.price * i.qty)}`;
  });
  const msg = `Hi LUNA MODA 💫 I'd like to order:%0A${lines.join("%0A")}%0A%0ATotal: ${money(cartSum())}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
}

// ---------- Toast ----------
let toastT = null;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.add("hidden"), 2200);
}

// ---------- Eventos ----------
document.addEventListener("click", (e) => {
  const t = e.target;
  const q = (sel) => t.closest(sel);

  let m;
  if ((m = q("[data-add]"))) { const p = PRODUCTS.find((x) => x.id == m.dataset.add); addToCart(p.id, 1, "M"); return; }
  if ((m = q("[data-wish]"))) {
    const id = +m.dataset.wish;
    if (isWished(id)) wish = wish.filter((x) => x !== id);
    else wish.push(id);
    saveWish(); updateBadges();
    document.querySelectorAll(`[data-wish="${id}"]`).forEach((b) => b.classList.toggle("on", isWished(id)));
    return;
  }
  if ((m = q("[data-quick]"))) { openQuick(+m.dataset.quick); return; }
  if ((m = q("[data-cat]"))) {
    renderAll(m.dataset.cat, $("#searchInput").value.trim());
    $("#gridBest").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if ((m = q("[data-goto-cat]"))) {
    renderAll(m.dataset.gotoCat, "");
    $("#gridBest").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if ((m = q("[data-size]"))) {
    qvSize = m.dataset.size;
    document.querySelectorAll("#quickSizes button").forEach((b) => b.classList.toggle("sel", b === m));
    return;
  }
  if ((m = q("[data-inc]"))) {
    const [id, size] = m.dataset.inc.split("|");
    const line = cart.find((i) => i.id == id && i.size === size);
    if (line) line.qty++;
    saveCart(); updateBadges(); renderCart(); return;
  }
  if ((m = q("[data-dec]"))) {
    const [id, size] = m.dataset.dec.split("|");
    const line = cart.find((i) => i.id == id && i.size === size);
    if (line) { line.qty--; if (line.qty <= 0) cart = cart.filter((i) => i !== line); }
    saveCart(); updateBadges(); renderCart(); return;
  }
  if ((m = q("[data-del]"))) {
    const [id, size] = m.dataset.del.split("|");
    cart = cart.filter((i) => !(i.id == id && i.size === size));
    saveCart(); updateBadges(); renderCart(); return;
  }
});

$("#cartBtn").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#keepBuying").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", () => { closeCart(); closeQuick(); });
$("#checkoutBtn").addEventListener("click", checkoutWA);
$("#quickClose").addEventListener("click", closeQuick);
$("#quickModal").addEventListener("click", (e) => { if (e.target.id === "quickModal") closeQuick(); });
$("#qvMinus").addEventListener("click", () => { if (qvQty > 1) qvQty--; $("#qvQty").textContent = qvQty; });
$("#qvPlus").addEventListener("click", () => { qvQty++; $("#qvQty").textContent = qvQty; });
$("#quickAdd").addEventListener("click", () => { addToCart(qvId, qvQty, qvSize); closeQuick(); openCart(); });
$("#heroCta").addEventListener("click", () => $("#gridBest").scrollIntoView({ behavior: "smooth" }));
$("#wishBtn").addEventListener("click", () => toast(wish.length ? `You have ${wish.length} favorite(s) ♡` : "Tap ♡ on a product to save it"));

function doSearch() {
  const q = $("#searchInput").value.trim();
  const active = document.querySelector(".cat-link.active");
  renderAll(active ? active.dataset.cat : "all", q);
  $("#gridBest").scrollIntoView({ behavior: "smooth", block: "start" });
}
$("#searchBtn").addEventListener("click", doSearch);
$("#searchInput").addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });

$("#newsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#newsForm").classList.add("hidden");
  $("#newsOk").classList.remove("hidden");
});

document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeQuick(); } });

// ---------- Init ----------
$("#heroImg").src = HERO_IMG || PLACEHOLDER;
$("#promoImg").src = PROMO_IMG || PLACEHOLDER;
renderCats();
renderAll("all", "");
updateBadges();
renderCart();
