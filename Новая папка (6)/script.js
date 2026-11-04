const products = [ 
    { id: 1, name: "Фалис", category: "мужчины", price: 5000, description: "большой", image: "images/item_05.png" }, 
    { id: 2, name: "женский фалис", category: "женщины", price: 3400, description: "мягкий", image: "images/item_04.png" }, 
    { id: 3, name: "дробовик", category: "женщины", price: 40000, description: "железный", image: "images/item_02.png" }, 
    { id: 4, name: "рот", category: "мужчины", price: 1000, description: "без зубов(", image: "images/item_03.png" }, 
    { id: 5, name: "груди", category: "женщины", price: 6000, description: "минимум 2", image: "images/item_06.png" }, 
    { id: 6, name: "патроны", category: "Аксессуары", price: 190, description: "коробочка 12шт", image: "images/item_01.png" } 
]; 
 
let cart = []; 
 
const grid = document.getElementById('products-grid'); 
const cartItemsBox = document.getElementById('cart-items'); 
const totalBox = document.getElementById('cart-total'); 
 
function renderProducts(items) { 
    if (items.length === 0) { 
        grid.innerHTML = '<div class="no-results">Товары не найдены</div>'; 
        return; 
    } 
 
    grid.innerHTML = items.map(item => ` 
        <div class="product-card"> 
            <div class="product-image"> 
                <img src="${item.image}" alt="${item.name}"> 
            </div> 
            <div class="product-title">${item.name}</div> 
            <div class="product-desc">${item.description}</div> 
            <div class="product-price">${item.price} ₽</div> 
            <button class="btn-add" onclick="addToCart(${item.id})">В корзину</button> 
        </div> 
    `).join(''); 
} 
 
function addToCart(id) { 
    const existingItem = cart.find(item => item.id === id); 
 
    if (existingItem) { 
        existingItem.qty += 1; 
    } else { 
        cart.push({ id: id, qty: 1 }); 
    } 
 
    renderCart(); 
} 
 
function renderCart() { 
    let totalSum = 0; 
 
    if (cart.length === 0) { 
        cartItemsBox.innerHTML = '<div class="empty-cart">Корзина пуста</div>'; 
        totalBox.innerText = '0 ₽'; 
        return; 
    } 
 
    cartItemsBox.innerHTML = cart.map(cartItem => { 
        const product = products.find(p => p.id === cartItem.id); 
        const itemTotal = product.price * cartItem.qty; 
        totalSum += itemTotal; 
 
        return ` 
            <div class="cart-item"> 
                <div class="cart-item-title">${product.name}</div> 
                <div class="cart-item-price">${product.price} ₽</div> 
                <div class="cart-item-qty">Количество: ${cartItem.qty}</div> 
                <button class="btn-remove" onclick="removeFromCart(${product.id})">Удалить</button> 
            </div> 
        `; 
    }).join(''); 
 
    totalBox.innerText = `${totalSum} ₽`; 
} 
 
function removeFromCart(id) { 
    cart = cart.filter(item => item.id !== id); 
 
    renderCart(); 
} 
 
document.getElementById('search-input').addEventListener('input', function() { 
    const searchText = this.value.toLowerCase(); 
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category; 
 
    const filtered = products.filter(p => { 
        const matchCategory = (activeCategory === 'Все' || p.category === activeCategory); 
        const matchSearch = p.name.toLowerCase().includes(searchText); 
 
        return matchCategory && matchSearch; 
    }); 
 
    renderProducts(filtered); 
}); 
 
const filterButtons = document.querySelectorAll('.filter-btn'); 
filterButtons.forEach(btn => { 
    btn.addEventListener('click', function() { 
        filterButtons.forEach(b => b.classList.remove('active')); 
        this.classList.add('active'); 
 
        document.getElementById('search-input').dispatchEvent(new Event('input')); 
    }); 
}); 
 
renderProducts(products); 
renderCart(); 
