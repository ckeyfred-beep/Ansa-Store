document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MENÚS Y CARRITO ---
    const menuBtn = document.getElementById('menu-btn');
    const cartBtn = document.getElementById('cart-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const closeCartBtn = document.getElementById('close-cart');
    const sidebar = document.getElementById('sidebar');
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    function toggleScroll(block) {
        if (block) body.classList.add('no-scroll');
        else body.classList.remove('no-scroll');
    }

    if(menuBtn) menuBtn.addEventListener('click', () => { sidebar.classList.add('active'); overlay.classList.add('active'); toggleScroll(true); });
    if(cartBtn) cartBtn.addEventListener('click', () => { cartSidebar.classList.add('active'); overlay.classList.add('active'); toggleScroll(true); });
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); toggleScroll(false); });
    if(closeCartBtn) closeCartBtn.addEventListener('click', () => { cartSidebar.classList.remove('active'); overlay.classList.remove('active'); toggleScroll(false); });
    if(overlay) overlay.addEventListener('click', () => { sidebar.classList.remove('active'); cartSidebar.classList.remove('active'); overlay.classList.remove('active'); toggleScroll(false); });

    // --- 2. TOAST ---
    function showToast(message) {
        const toast = document.getElementById('toast');
        if(toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 3000);
        }
    }

    // --- 3. COMPARTIR ---
    const shareBtn = document.getElementById('action-share');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = { title: 'Ansa Store', text: '¡Visita Ansa Store! Ropa de caballero, damas y niños.', url: window.location.href };
            try {
                if (navigator.share) await navigator.share(shareData);
                else { await navigator.clipboard.writeText(window.location.href); showToast('Enlace copiado'); }
            } catch (err) { console.log('Error al compartir:', err); }
        });
    }

    // --- 4. BUSCAR ---
    const searchActionBtn = document.getElementById('action-search');
    const searchInput = document.getElementById('search-input');
    if (searchActionBtn && searchInput) {
        searchActionBtn.addEventListener('click', () => {
            sidebar.classList.add('active'); overlay.classList.add('active'); toggleScroll(true);
            setTimeout(() => { searchInput.focus(); }, 300);
        });
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) window.location.href = `categoria.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // --- 5. ACORDEÓN ---
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) content.style.maxHeight = null;
            else content.style.maxHeight = content.scrollHeight + "px";
        });
    });

    // --- 6. BASE DE DATOS DE PRODUCTOS ---
    const productosDB = {
        'chemise-oldmoney': { cat: 'caballero', nombre: 'Chemises Oldmoney Caballero', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Elegante chemise estilo Old Money para caballero. Colores disponibles: Blanco, Azul, Beige. Tallas S, M, L, XL.' },
        'pantalon-slim': { cat: 'caballero', nombre: 'Pantalones tipo Slim para Caballero', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Pantalón de vestir/slim fit. Comodidad y estilo para el día a día. Tallas 28 al 40.' },
        'chemise-polo': { cat: 'caballero', nombre: 'Chemises Polo', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Chemise tipo polo de alta calidad. Ideal para looks casuales y elegantes. Varios colores.' },
        'bermuda-oldmoney': { cat: 'caballero', nombre: 'Bermudas Oldmoney', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Bermudas estilo Old Money, cómodas y frescas. Perfectas para climas cálidos.' },
        'bermuda-caballero': { cat: 'caballero', nombre: 'Bermudas para Caballero', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Bermudas importadas de jean. Tallas 34-36 y 38.' },
        'pantalon-cargo': { cat: 'caballero', nombre: 'Pantalones Cargo Caballero', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Pantalón cargo con múltiples bolsillos. Resistente y versátil.' },
        'pantalon-damas': { cat: 'damas', nombre: 'Pantalones Importados de Damas', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Pantalones importados de damas, corte moderno y tela de alta calidad.' },
        'body-blusas': { cat: 'damas', nombre: 'Bodys y Blusas de Damas ♥', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Bodys y blusas elegantes para damas. Diseños exclusivos de Ansa Store.' },
        'pantalon-ancho': { cat: 'damas', nombre: 'Pantalones Anchos con Perlas', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Pantalones anchos con detalles de perlas. Tendencia y comodidad.' },
        'conjunto-deportivo': { cat: 'niños', nombre: 'Conjuntos deportivos marca', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Conjunto deportivo para niños. Tallas desde la 2 hasta la 10.' },
        'suter-niño': { cat: 'niños', nombre: 'Suéter con capucha niños', precio: 'VES 25.00', img: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Suéter con capucha para niños. Tallas 6-16.' },
        'oversize-niño': { cat: 'niños', nombre: 'Conjuntos Oversize para niños', precio: 'VES 30.00', img: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Conjunto oversize moderno para niños. Disponibles desde la talla 6-16.' },
        'personalizacion-1': { cat: 'personalizaciones', nombre: 'Camisas Estilo Oldmoney', precio: 'Cotizar', img: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Personalizamos camisas estilo Old Money a tu medida. ¡Consulta por WhatsApp!' }
    };

    // --- 7. CATÁLOGO ---
    const dynamicCatalog = document.getElementById('dynamic-catalog');
    if (dynamicCatalog) {
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('cat');
        const qParam = urlParams.get('q');
        const tituloCat = document.getElementById('titulo-categoria');

        if (qParam) tituloCat.textContent = `Buscando: "${qParam}"`;
        else if (catParam) {
            const nombresCat = { 'caballero': 'Caballero', 'damas': 'Damas', 'niños': 'Niños', 'personalizaciones': 'Personalizaciones' };
            tituloCat.textContent = nombresCat[catParam] || 'Catálogo';
        } else tituloCat.textContent = 'Todo el Catálogo';

        let htmlProductos = '';
        for (const key in productosDB) {
            const prod = productosDB[key];
            const coincideCat = (!catParam || prod.cat === catParam);
            const coincideBusqueda = (!qParam || prod.nombre.toLowerCase().includes(qParam.toLowerCase()));

            if (coincideCat && coincideBusqueda) {
                htmlProductos += `
                    <a href="producto.html?id=${key}" class="catalog-item">
                        <div class="item-image"><img src="${prod.img}" alt="${prod.nombre}"></div>
                        <div class="item-details"><h4>${prod.nombre}</h4><p>${prod.precio}</p></div>
                        <button class="btn-add-catalog"><i class="fa-solid fa-plus"></i></button>
                    </a>`;
            }
        }
        if (htmlProductos === '') htmlProductos = '<p style="text-align:center; padding: 20px; color: #888;">No se encontraron productos.</p>';
        dynamicCatalog.innerHTML = `<div class="group-header"><h3>Resultados</h3></div>${htmlProductos}`;

        document.querySelectorAll('.btn-add-catalog').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                btn.innerHTML = '<i class="fa-solid fa-check" style="color: #4ade80;"></i>';
                setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-plus"></i>'; }, 1500);
            });
        });
    }

    // --- 8. PRODUCTO ---
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId && productosDB[productId]) {
        const prod = productosDB[productId];
        document.getElementById('prod-nombre').textContent = prod.nombre;
        document.getElementById('prod-precio').textContent = prod.precio;
        document.getElementById('prod-imagen').src = prod.img;
        document.getElementById('prod-descripcion').textContent = prod.desc;

        const inputCantidad = document.getElementById('cantidad');
        const btnSumar = document.getElementById('btn-sumar');
        const btnRestar = document.getElementById('btn-restar');
        const btnComprarWa = document.getElementById('btn-comprar-wa');

        if(btnSumar) btnSumar.addEventListener('click', () => { inputCantidad.value = parseInt(inputCantidad.value) + 1; });
        if(btnRestar) btnRestar.addEventListener('click', () => { if (parseInt(inputCantidad.value) > 1) inputCantidad.value = parseInt(inputCantidad.value) - 1; });

        if(btnComprarWa) btnComprarWa.addEventListener('click', () => {
            const cant = inputCantidad.value;
            const mensaje = `*¡Hola Ansa Store!* ✨%0A%0AEstoy interesado en:%0A%0A👔 *Producto:* ${prod.nombre}%0A🔢 *Cantidad:* ${cant}%0A💰 *Precio:* ${prod.precio}%0A%0A¿Tienen disponibilidad?`;
            window.open(`https://wa.me/584244386212?text=${mensaje}`, '_blank');
        });
    }

    // --- 9. SISTEMA DE ANIMACIONES AL HACER SCROLL ---
    const elementosParaAnimar = document.querySelectorAll('.section-container, .product-card, .category-card, .contact-box, .promo-banner, .lookbook-item, .review-card');

    // Primero les agregamos la clase "reveal" a todos por defecto
    elementosParaAnimar.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento entra en la pantalla, lo hacemos visible
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 
    });

    elementosParaAnimar.forEach(el => observer.observe(el));
});