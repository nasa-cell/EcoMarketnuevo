// shop.js — Lógica principal de EcoMarket

// ---------- Config (icons / imágenes) ----------
const categoryIconUrls = {
  frutas: 'https://i.postimg.cc/m2rkPzN5/image-Fm-Fv-SN2-Z0-NKASjv9-Brfyndz1-FNVf-Na.png',
  verduras: 'https://i.postimg.cc/Zqnxj5S7/Pngtree-fresh-healthy-vegetable-in-basket-16325635.png',
  legumbres: 'https://i.postimg.cc/tgBPKtB9/Pngtree-different-types-of-mixed-legumes-17015185.png',
  granos: 'https://i.postimg.cc/YqVrjXSv/image-9-XCj-JIB2-VZb-Rons-Tjr8-Pf-Mx-FDd-WV9r.png'
};
const CART_IMG = 'https://i.postimg.cc/zXcHJGN1/4.png';
const SEARCH_ICON = 'https://i.postimg.cc/zv53pL2L/image-52p9-Ub8-JEM1ahgm-Do-Raz-Woux-X7h1-DZ.png';
const ADDRESS_BTN_ICON = 'https://i.postimg.cc/V6BTPNJq/image-3-JYNLpogg5zknun-PABpd-Op-Ej-Jm-ZN5-R.png';
const COUPON_ICON = 'https://i.postimg.cc/QCyNrmPZ/image-w-Nxd-FQYtp-HI7-REu4-Ulzsvi37-XAh-YH4.png';
const VOUCHER_SIDE_ICON = 'https://i.postimg.cc/Vs3FYwcp/image-di-Xh-Ctmvr-Drn-GWIrg-C6k-IFZe6-Zg9-CL.png';

// ---------- Datos de productos ----------
const productosGranos = [
  { id: 'arroz', nombre: 'Arroz integral', precio: 5.50, unidad: 'unidad', img: 'https://metroio.vtexassets.com/arquivos/ids/507542/Arroz-Integral-Cuisine-Co-5kg-ARROZ-INTEGRAL-X-5KG-CUISINE-CO-1-250745.jpg?v=638399975620370000', stock: 100 },
  { id: 'quinua', nombre: 'Quinua', precio: 8.00, unidad: 'unidad', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_zqilkOWSxi9g8i82OxpK4BS1MXRilWXvw&s', stock: 50 },
  { id: 'avena', nombre: 'Avena', precio: 6.00, unidad: 'kg', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjNCAxQHVeF7uZkyPbeGj3RpmvnbR37p8U3g&s', stock: 60 }
];
const productosLegumbres = [
  { id: 'lentejas', nombre: 'Lentejas', precio: 4.50, unidad: 'unidad', img: 'https://plazavea.vteximg.com.br/arquivos/ids/2344142-418-418/20220362.jpg', stock: 80 },
  { id: 'frijoles', nombre: 'Frijoles', precio: 5.50, unidad: 'unidad', img: 'https://plazavea.vteximg.com.br/arquivos/ids/27552450-512-512/1605.jpg', stock: 80 }
];
const productosFrutas = [
  { id:'manzana', nombre:'Manzana', precio:3.50, unidad:'kilo', img:'https://chilebio.cl/wp-content/uploads/2019/12/manzana-tono.jpg', stock:100 },
  { id:'platano', nombre:'Plátano', precio:2.00, unidad:'unidad', img:'https://5aldia.cl/wp-content/uploads/2018/03/platano.jpg', stock:100 },
  { id:'mango', nombre:'Mango', precio:5.00, unidad:'kilo', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4CZvzYB5vVpOl41ZWMaEuFjf57djb_rg_g&s', stock:50 },
  { id:'fresa', nombre:'Fresa', precio:6.50, unidad:'kilo', img:'https://dialprix.es/wp-content/uploads/fresas.jpg', stock:40 },
  { id:'uva', nombre:'Uvas', precio:7.00, unidad:'kilo', img:'https://fundaciondelcorazon.com/images/stories/corazon-facil/impulso-vital/uvas.jpg', stock:30 },
  { id:'pina', nombre:'Piña', precio:4.00, unidad:'unidad', img:'https://www.gob.mx/cms/uploads/image/file/415269/pi_a_1.jpg', stock:20 }
];
const productosVerduras = [
  { id:'lechuga', nombre:'Lechuga', precio:2.50, unidad:'unidad', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjXoBuEF8OUHpRTor89ltF5_XBr4lLkH2bMg&s', stock:50 },
  { id:'espinaca', nombre:'Espinaca', precio:3.00, unidad:'atado', img:'https://www.gob.mx/cms/uploads/article/main_image/11271/espinass.jpg', stock:50 },
  { id:'zanahoria', nombre:'Zanahoria', precio:3.50, unidad:'kilo', img:'https://libera.pe/wp-content/uploads/2019/12/zanahoria.jpg', stock:60 },
  { id:'brocoli', nombre:'Brócoli', precio:4.00, unidad:'kilo', img:'https://agroactivocol.com/wp-content/uploads/2020/07/Brocoli-Mediterraneo-1-1.jpg', stock:40 },
  { id:'tomate', nombre:'Tomate', precio:3.20, unidad:'kilo', img:'https://images.ctfassets.net/hxvgiqj2m8qf/4pHqxxBZ4s9LxrPdXC1Dcf/9b04e86a6e72966932614ab6a9c41110/MITOS_TOMATE.jpg', stock:70 }
];

// ---------- Estado / persistencia ----------
let carrito = JSON.parse(localStorage.getItem('ec_cart') || '[]');
let cuponGenerado = localStorage.getItem('ec_coupon') || null;
let descuento = Number(localStorage.getItem('ec_discount') || '0');
const qtyOptions = [0,1,2,3,5,10];

// ---------- Reviews ----------
const reviews = [
  { name: "María G.", text: "Muy buenos productos y frescos." },
  { name: "Carlos R.", text: "El envío llegó rápido." },
  { name: "Sofía M.", text: "Precios accesibles y buena calidad." },
  { name: "Jorge L.", text: "La fruta estaba deliciosa." },
  { name: "Ana P.", text: "Volveré a comprar." },
  { name: "Luis F.", text: "Excelente atención al cliente." },
  { name: "Paola V.", text: "Me encantó la variedad." },
  { name: "Diego H.", text: "Todo llegó bien empaquetado." },
  { name: "Teresa C.", text: "Muy recomendable." }
];

// ---------- Helpers UI ----------
function crearCard(producto) {
  const unidadLabel = producto.unidad || 'unidad';
  const col = document.createElement('div');
  col.className = 'col-sm-6 col-md-4';

  const optionsHtml = qtyOptions.map(q => `
    <option value="${q}">${q === 0 ? 'Seleccione...' : q + ' ' + unidadLabel}</option>
  `).join('');

  col.innerHTML = `
    <div class="card product-card h-100">
      <img src="${producto.img}" alt="${producto.nombre}" class="card-img-top">
      <div class="product-info d-flex flex-column p-3">
        <h5 class="mb-1">${producto.nombre}</h5>
        <div><span class="price">S/ ${producto.precio.toFixed(2)}</span> <span class="small-muted">/ ${unidadLabel}</span></div>
        <div class="d-flex gap-2 align-items-center mt-auto">
          <select id="qty-${producto.id}" class="form-select form-select-sm" style="width:120px">
            ${optionsHtml}
          </select>
          <button class="btn btn-outline-success btn-sm" onclick="addToCart('${producto.id}')">Agregar</button>
          <button class="btn btn-link btn-sm text-secondary" onclick="showDetails('${producto.id}')">Detalles</button>
        </div>
        <small class="text-muted mt-2">Stock: ${producto.stock}</small>
      </div>
    </div>
  `;
  return col;
}

function renderCatalogos() {
  const g = document.getElementById('granosGrid');
  const l = document.getElementById('legumbresGrid');
  const f = document.getElementById('frutasGrid');
  const v = document.getElementById('verdurasGrid');
  if (g) g.innerHTML = '';
  if (l) l.innerHTML = '';
  if (f) f.innerHTML = '';
  if (v) v.innerHTML = '';
  productosGranos.forEach(p => g && g.appendChild(crearCard(p)));
  productosLegumbres.forEach(p => l && l.appendChild(crearCard(p)));
  productosFrutas.forEach(p => f && f.appendChild(crearCard(p)));
  productosVerduras.forEach(p => v && v.appendChild(crearCard(p)));
}

// ---------- Carrito ----------
function findProductById(id) {
  const all = [...productosGranos, ...productosLegumbres, ...productosFrutas, ...productosVerduras];
  return all.find(x => x.id === id);
}

function addToCart(id) {
  const sel = document.getElementById('qty-' + id);
  const cantidad = Number(sel?.value || 0);
  if (!cantidad || cantidad <= 0) {
    showToast('Selecciona una cantidad válida', 'error');
    return;
  }
  const prod = findProductById(id);
  if (!prod) {
    showToast('Producto no encontrado', 'error');
    return;
  }
  if (cantidad > prod.stock) {
    showToast('No hay suficiente stock', 'error');
    return;
  }
  const existe = carrito.find(it => it.id === id);
  if (existe) {
    if (existe.cantidad + cantidad > prod.stock) {
      showToast('No hay suficiente stock para esa suma', 'error');
      return;
    }
    existe.cantidad += cantidad;
    existe.subtotal = Number((existe.cantidad * existe.precio).toFixed(2));
  } else {
    carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, unidad: prod.unidad, cantidad: cantidad, subtotal: Number((cantidad * prod.precio).toFixed(2)) });
  }
  if (sel) sel.value = 0;
  persistCart();
  actualizarUI();
  animateCartBadge();
  showToast('Producto agregado', 'success');
}

function removeFromCart(id) {
  carrito = carrito.filter(i => i.id !== id);
  persistCart();
  actualizarUI();
}

function changeQtyInCart(id, newQty) {
  newQty = Number(newQty);
  if (newQty <= 0) {
    removeFromCart(id);
    return;
  }
  const prod = findProductById(id);
  if (newQty > prod.stock) {
    showToast('Stock insuficiente', 'error');
    return;
  }
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad = newQty;
  item.subtotal = Number((item.cantidad * item.precio).toFixed(2));
  persistCart();
  actualizarUI();
}

function persistCart() {
  localStorage.setItem('ec_cart', JSON.stringify(carrito));
}

function actualizarUI() {
  // contador por productos distintos (longitud del array)
  const productosDistintos = carrito.length;
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.innerText = productosDistintos;
  const floatingCountEl = document.getElementById('floatingCartCount');
  if (floatingCountEl) floatingCountEl.innerText = productosDistintos;

  const cartItems = document.getElementById('cartItems');
  if (cartItems) {
    cartItems.innerHTML = '';
    if (carrito.length === 0) {
      cartItems.innerHTML = '<p class="text-muted">No hay productos en el carrito.</p>';
    } else {
      carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'd-flex justify-content-between align-items-start mb-3';
        div.innerHTML = `
          <div style="max-width:65%">
            <strong>${item.nombre}</strong><br>
            <small class="small-muted">${item.cantidad} ${item.unidad} x S/ ${item.precio.toFixed(2)}</small>
          </div>
          <div class="text-end">
            <div>S/ ${item.subtotal.toFixed(2)}</div>
            <div class="mt-2 d-flex gap-1 align-items-center">
              <input type="number" min="0" value="${item.cantidad}" style="width:70px" onchange="changeQtyInCart('${item.id}', this.value)" class="form-control form-control-sm">
              <button class="btn btn-sm btn-link text-danger" onclick="removeFromCart('${item.id}')">Eliminar</button>
            </div>
          </div>
        `;
        cartItems.appendChild(div);
      });
    }
  }
  // actualizar totales (incluye descuento/cupón)
  actualizarTotales();
}

function calcularSubtotal() {
  return carrito.reduce((s,i) => s + i.subtotal, 0);
}

function actualizarTotales() {
  const subtotal = calcularSubtotal();
  const envio = subtotal > 0 ? 5 : 0;
  // si subtotal cae por debajo de 90, invalidamos cupón
  if (subtotal < 90) {
    cuponGenerado = null;
    descuento = 0;
    localStorage.removeItem('ec_coupon');
    localStorage.removeItem('ec_discount');
  }
  const total = Math.max(0, subtotal + envio - descuento);
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  if (cartSubtotalEl) cartSubtotalEl.innerText = subtotal.toFixed(2);
  if (document.getElementById('subtotalDisplay')) document.getElementById('subtotalDisplay').innerText = subtotal.toFixed(2);
  if (document.getElementById('envioDisplay')) document.getElementById('envioDisplay').innerText = envio.toFixed(2);
  if (document.getElementById('descuentoDisplay')) document.getElementById('descuentoDisplay').innerText = descuento.toFixed(2);
  if (document.getElementById('totalDisplay')) document.getElementById('totalDisplay').innerText = total.toFixed(2);
  if (cuponGenerado) localStorage.setItem('ec_coupon', cuponGenerado);
  localStorage.setItem('ec_discount', String(descuento));
}

// ---------- Detalles ----------
function showDetails(id) {
  const p = findProductById(id);
  if (!p) return;
  const modalTitle = document.getElementById('pmTitle');
  const modalImg = document.getElementById('pmImg');
  const modalDesc = document.getElementById('pmDesc');
  const modalPrice = document.getElementById('pmPrice');
  if (modalTitle) modalTitle.innerText = p.nombre;
  if (modalImg) modalImg.src = p.img;
  if (modalDesc) modalDesc.innerText = `Producto orgánico de alta calidad. Unidad: ${p.unidad}. Stock disponible: ${p.stock}.`;
  if (modalPrice) modalPrice.innerText = `S/ ${p.precio.toFixed(2)} / ${p.unidad}`;
  const modalEl = document.getElementById('productModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

// ---------- Buscar ----------
function buscarProductos() {
  const q = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  // reset grids
  const g = document.getElementById('granosGrid');
  const l = document.getElementById('legumbresGrid');
  const f = document.getElementById('frutasGrid');
  const v = document.getElementById('verdurasGrid');
  if (g) g.innerHTML = '';
  if (l) l.innerHTML = '';
  if (f) f.innerHTML = '';
  if (v) v.innerHTML = '';
  const all = [...productosGranos, ...productosLegumbres, ...productosFrutas, ...productosVerduras];
  if (!q) {
    renderCatalogos();
    const noMsg = document.getElementById('noResultsMsg');
    if (noMsg) noMsg.remove();
    return;
  }
  const results = all.filter(p => p.nombre.toLowerCase().includes(q));
  let noMsg = document.getElementById('noResultsMsg');
  if (noMsg) noMsg.remove();
  if (results.length === 0) {
    const gridParent = document.querySelector('main');
    if (gridParent) {
      const msg = document.createElement('div');
      msg.id = 'noResultsMsg';
      msg.className = 'no-results';
      msg.innerText = '⚠️ No se encontró';
      gridParent.insertBefore(msg, gridParent.querySelector('section') || null);
    }
    return;
  }
  // distribute results to categories
  results.forEach(r => {
    if (productosGranos.some(p=>p.id===r.id)) { if (g) g.appendChild(crearCard(r)); }
    if (productosLegumbres.some(p=>p.id===r.id)) { if (l) l.appendChild(crearCard(r)); }
    if (productosFrutas.some(p=>p.id===r.id)) { if (f) f.appendChild(crearCard(r)); }
    if (productosVerduras.some(p=>p.id===r.id)) { if (v) v.appendChild(crearCard(r)); }
  });
}

// ---------- Voucher / Pedido ----------
function buildVoucherText(cliente) {
  const subtotal = calcularSubtotal();
  const envio = subtotal > 0 ? 5 : 0;
  const total = Math.max(0, subtotal + envio - descuento);
  const pedidoNum = 'EM' + Date.now().toString().slice(-6);
  const fecha = new Date().toLocaleString();

  let text = `--- EcoMarket - Pedido #${pedidoNum} ---\n`;
  text += `Fecha: ${fecha}\n\n`;
  text += `Cliente:\nNombre: ${cliente.nombre}\nTeléfono: ${cliente.telefono}\nDirección: ${cliente.direccion}\n\n`;
  text += `Productos:\n`;
  text += `Producto | Cantidad | Precio U. | Subtotal\n`;
  text += `-----------------------------------------\n`;
  carrito.forEach(it => {
    text += `${it.nombre} | ${it.cantidad} ${it.unidad} | S/ ${it.precio.toFixed(2)} | S/ ${it.subtotal.toFixed(2)}\n`;
  });
  text += `-----------------------------------------\n`;
  text += `SUBTOTAL: S/ ${subtotal.toFixed(2)}\n`;
  text += `ENVÍO: S/ ${envio.toFixed(2)}\n`;
  if (cuponGenerado) {
    text += `CUPÓN: ${cuponGenerado} (-S/ ${descuento.toFixed(2)})\n`;
  } else {
    text += `DESCUENTO: S/ ${descuento.toFixed(2)}\n`;
  }
  text += `TOTAL: S/ ${total.toFixed(2)}\n\n`;
  text += `Pago: Pago contra entrega\nNota: Envío a domicilio\n\nGracias por preferir EcoMarket!`;

  return { text, pedidoNum, total, fecha };
}

function downloadVoucherTxt() {
  const cliente = {
    nombre: document.getElementById('clienteNombre')?.value || '-',
    telefono: document.getElementById('clienteTelefono')?.value || '-',
    direccion: document.getElementById('clienteDireccion')?.value || '-'
  };
  const v = buildVoucherText(cliente);
  const blob = new Blob([v.text], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `pedido_${v.pedidoNum}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function submitOrder() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos.');
    return;
  }
  const nombre = document.getElementById('clienteNombre').value.trim();
  const telefono = document.getElementById('clienteTelefono').value.trim();
  const direccion = document.getElementById('clienteDireccion').value.trim();
  if (!nombre || !telefono || !direccion) {
    alert('Completa nombre, teléfono y dirección');
    return;
  }
  const cliente = { nombre, telefono, direccion };
  const v = buildVoucherText(cliente);
  // mostrar voucher
  if (document.getElementById('voucherContent')) document.getElementById('voucherContent').innerText = v.text;
  if (document.getElementById('voucherSection')) document.getElementById('voucherSection').style.display = 'block';
  // ocultar botón WhatsApp si existiera
  const waBtn = document.getElementById('waSendBtn');
  if (waBtn) waBtn.style.display = 'none';
  // guardar historial
  const history = JSON.parse(localStorage.getItem('ec_order_history') || '[]');
  history.push({ pedidoNum: v.pedidoNum, fecha: v.fecha, total: v.total, cliente });
  localStorage.setItem('ec_order_history', JSON.stringify(history));
  // reducir stock local
  carrito.forEach(it => {
    const prod = findProductById(it.id);
    if (prod) prod.stock = Math.max(0, prod.stock - it.cantidad);
  });
  // vaciar carrito
  carrito = [];
  persistCart();
  actualizarUI();
  showToast('Voucher generado. Puedes descargarlo.', 'success');
}

// ---------- Toast ----------
function showToast(msg, type = 'info') {
  const containerId = 'custom-toast-container';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = 'toast-js';
  if (type === 'error') t.classList.add('error');
  if (type === 'success') t.classList.add('success');
  if (type === 'info') t.classList.add('info');
  t.innerText = msg;
  container.appendChild(t);
  setTimeout(()=>{ t.style.opacity = 0; setTimeout(()=>t.remove(),400); }, 1600);
}

// ---------- Reviews modal ----------
function renderReviewsInModal() {
  const list = document.getElementById('reviewsList');
  if (!list) return;
  list.innerHTML = '';
  reviews.forEach((r, idx) => {
    const item = document.createElement('div');
    item.className = 'mb-2';
    item.innerHTML = `
      <div class="card p-2">
        <div class="d-flex justify-content-between align-items-start mb-1">
          <div><strong>${r.name}</strong></div>
          <div class="text-warning">★★★★★</div>
        </div>
        <p class="mb-0">${r.text}</p>
      </div>
    `;
    list.appendChild(item);
  });
}

function openCommentsModal() {
  renderReviewsInModal();
  const modalEl = document.getElementById('reviewsModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

// ---------- Coupon logic ----------
function generarCuponSiCorresponde() {
  const subtotal = calcularSubtotal();
  if (subtotal >= 90) {
    if (!cuponGenerado) {
      const codigo = Math.floor(100 + Math.random() * 900); // 3 dígitos
      cuponGenerado = `#${codigo}`;
    }
    descuento = 10;
    localStorage.setItem('ec_coupon', cuponGenerado);
    localStorage.setItem('ec_discount', String(descuento));
    showToast(`🎉 Cupón aplicado: ${cuponGenerado} - Descuento S/10`, 'success');
  } else {
    cuponGenerado = null;
    descuento = 0;
    localStorage.removeItem('ec_coupon');
    localStorage.removeItem('ec_discount');
    showToast('⚠️ El cupón solo aplica a compras desde S/90', 'info');
  }
  actualizarTotales();
}

// ---------- Address autofill (Geolocation + reverse geocode Nominatim) ----------
async function autoFillAddress() {
  const btn = document.getElementById('addressBtn');
  const input = document.getElementById('clienteDireccion');
  if (!input) return;
  const originalHtml = btn ? btn.innerHTML : '';
  if (btn) { btn.innerHTML = '⏳'; btn.disabled = true; }
  if (!navigator.geolocation) {
    alert('Geolocalización no soportada por este navegador.');
    if (btn) { btn.innerHTML = originalHtml; btn.disabled = false; }
    return;
  }
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const resp = await fetch(url, { headers: { 'Accept': 'application/json' }});
      if (!resp.ok) throw new Error('No se pudo obtener dirección');
      const data = await resp.json();
      const display = data.display_name || `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
      input.value = display;
      showToast('Dirección completada automáticamente', 'success');
    } catch (err) {
      input.value = `Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)}`;
      showToast('Se ha completado con coordenadas (no hubo respuesta de reverse-geocode)', 'info');
    } finally {
      if (btn) { btn.innerHTML = originalHtml; btn.disabled = false; }
    }
  }, (err) => {
    alert('No se pudo obtener la ubicación: ' + (err.message || err.code));
    if (btn) { btn.innerHTML = originalHtml; btn.disabled = false; }
  }, { timeout: 10000, maximumAge: 60000 });
}

// ---------- Small helpers ----------
function animateCartBadge() {
  const c = document.getElementById('cartCount');
  const f = document.getElementById('floatingCartCount');
  if (c) { c.style.transform = 'scale(1.15)'; setTimeout(()=> c.style.transform = '', 300); }
  if (f) { f.style.transform = 'scale(1.15)'; setTimeout(()=> f.style.transform = '', 300); }
}

function abrirCarrito() {
  const offEl = document.getElementById('offcanvasCart');
  if (!offEl) return;
  try {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offEl);
    offcanvas.show();
  } catch (e) {
    try {
      const offcanvas = new bootstrap.Offcanvas(offEl);
      offcanvas.show();
    } catch (e2) { console.error(e2); }
  }
}

// ---------- Nuevas funciones: vaciar, ir a finalizar, volver ----------
function vaciarCarritoConfirm() {
  if (!carrito || carrito.length === 0) { showToast('El carrito ya está vacío', 'info'); return; }
  const ok = confirm('¿Seguro que quieres vaciar el carrito? Esta acción no se puede deshacer.');
  if (ok) vaciarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  persistCart();
  actualizarUI();
  showToast('Carrito vaciado', 'success');
}

function irAFinalizar() {
  // Cerrar offcanvas si está abierto
  const offEl = document.getElementById('offcanvasCart');
  if (offEl) {
    try {
      const inst = bootstrap.Offcanvas.getInstance(offEl) || new bootstrap.Offcanvas(offEl);
      inst.hide();
    } catch (e) { /* no pasa nada */ }
  }
  // Desplazarse al formulario de checkout y enfocar el campo nombre
  setTimeout(() => {
    const el = document.getElementById('clienteNombre');
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(()=> el.focus(), 350); }
    else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }, 250);
}

function volverDesdeOffcanvas() {
  const offEl = document.getElementById('offcanvasCart');
  if (offEl) {
    try { const inst = bootstrap.Offcanvas.getInstance(offEl) || new bootstrap.Offcanvas(offEl); inst.hide(); } catch (e) {}
  }
  setTimeout(()=> window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  // restore coupon/discount from localStorage (si aplica)
  const savedCoupon = localStorage.getItem('ec_coupon');
  const savedDiscount = localStorage.getItem('ec_discount');
  if (savedCoupon) cuponGenerado = savedCoupon;
  if (savedDiscount) descuento = Number(savedDiscount);

  // set category icons
  const iconFrutas = document.getElementById('iconFrutas');
  const iconVerduras = document.getElementById('iconVerduras');
  const iconLegumbres = document.getElementById('iconLegumbres');
  const iconGranos = document.getElementById('iconGranos');
  if (iconFrutas) iconFrutas.src = categoryIconUrls.frutas;
  if (iconVerduras) iconVerduras.src = categoryIconUrls.verduras;
  if (iconLegumbres) iconLegumbres.src = categoryIconUrls.legumbres;
  if (iconGranos) iconGranos.src = categoryIconUrls.granos;

  // set cart images
  const cartImgs = document.querySelectorAll('.nav-cart-img');
  cartImgs.forEach(i => { i.src = CART_IMG; });
  const cartTop = document.getElementById('cartIconTop');
  if (cartTop) cartTop.src = CART_IMG;

  // set search icon
  const sIcon = document.getElementById('searchIconImg');
  if (sIcon) sIcon.src = SEARCH_ICON;

  // set address icon
  const addrImg = document.getElementById('addressBtnImg');
  if (addrImg) addrImg.src = ADDRESS_BTN_ICON;

  // set coupon icon
  const couponBtnImg = document.getElementById('couponIcon') || document.querySelector('#couponBtn img');
  if (couponBtnImg) couponBtnImg.src = COUPON_ICON;

  // set voucher side icon
  const voucherSide = document.getElementById('voucherSideIcon');
  if (voucherSide) voucherSide.src = VOUCHER_SIDE_ICON;

  // bind coupon button
  const couponBtn = document.getElementById('couponBtn');
  if (couponBtn) couponBtn.addEventListener('click', generarCuponSiCorresponde);

  // bind volverBtn safely
  const volverBtn = document.getElementById('volverBtn');
  if (volverBtn) volverBtn.addEventListener('click', volverDesdeOffcanvas);

  try { renderCatalogos(); } catch(e){ console.error(e); }
  actualizarUI();

  // ensure envio display default if element exists
  if (document.getElementById('envioDisplay')) document.getElementById('envioDisplay').innerText = '5.00';

  // ---- Fix principal: evitar que el offcanvas 'corte' el menu ----
  const offEl = document.getElementById('offcanvasCart');
  if (offEl) {
    offEl.addEventListener('show.bs.offcanvas', () => {
      try {
        const navCollapseEl = document.querySelector('.navbar-collapse.show');
        if (navCollapseEl) { const bsCollapse = bootstrap.Collapse.getInstance(navCollapseEl) || new bootstrap.Collapse(navCollapseEl); bsCollapse.hide(); }
      } catch (e) { /* no pasa nada */ }
      const f = document.getElementById('floatingCart'); if (f) f.style.display = 'none';
      document.body.style.paddingRight = '0px';
      document.body.classList.add('hide-location');
    });
    offEl.addEventListener('hidden.bs.offcanvas', () => {
      const f = document.getElementById('floatingCart'); if (f) f.style.display = 'flex';
      document.body.style.paddingRight = '';
      setTimeout(()=> {
        const anyOff = Array.from(document.querySelectorAll('.offcanvas.show')).length > 0;
        const anyModal = Array.from(document.querySelectorAll('.modal.show')).length > 0;
        if (!anyOff && !anyModal) document.body.classList.remove('hide-location');
      }, 60);
    });
  }

  // Adicional: asegurar comportamiento para cualquier offcanvas o modal que pueda existir
  const HIDE_CLASS = 'hide-location';
  const allOffcanvases = document.querySelectorAll('.offcanvas');
  allOffcanvases.forEach(o => {
    o.addEventListener('show.bs.offcanvas', () => { document.body.classList.add(HIDE_CLASS); });
    o.addEventListener('hidden.bs.offcanvas', () => { setTimeout(()=> { const anyShown = Array.from(document.querySelectorAll('.offcanvas.show')).length > 0; const anyModalShown = Array.from(document.querySelectorAll('.modal.show')).length > 0; if (!anyShown && !anyModalShown) document.body.classList.remove(HIDE_CLASS); }, 60); });
  });
  const allModals = document.querySelectorAll('.modal');
  allModals.forEach(m => {
    m.addEventListener('show.bs.modal', () => { document.body.classList.add(HIDE_CLASS); });
    m.addEventListener('hidden.bs.modal', () => { setTimeout(()=> { const anyModalShown = Array.from(document.querySelectorAll('.modal.show')).length > 0; const anyOffShown = Array.from(document.querySelectorAll('.offcanvas.show')).length > 0; if (!anyModalShown && !anyOffShown) document.body.classList.remove(HIDE_CLASS); }, 60); });
  });

  // Si se hace click en el botón flotante, usar getOrCreateInstance para abrir sin errores
  const floatBtn = document.getElementById('floatingCart');
  if (floatBtn) {
    floatBtn.addEventListener('click', (e) => { e.preventDefault(); abrirCarrito(); });
  }
});
