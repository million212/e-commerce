let cart = [];
const cartElement = document.getElementById("cart");
const totalElement = document.getElementById("total");

function loadCart() {
    const storedCart = JSON.parse(localStorage.getItem('carrinho'));
    if(storedCart) {
        cart = storedCart;
    }
    updateCart();    
}

function updateCart() {
    cartElement.innerHTML = '';
    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Seu carrinho está vazio</p>';
    } else {
        cart.forEach(item => {
            const formattedPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity);
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <h4>${item.title}</h4>
                <div id="container"><img src="${item.image}" referrerpolicy="no-referrer"></div>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: ${formattedPrice}</p>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="increaseQuantity(${item.id})">+</button>
            `;
            cartElement.appendChild(cartItemDiv);
        });
    }
    calculateTotal();
}

// Diminui a quantidade
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id)
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1
        } else if (item && item.quantity === 1) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    localStorage.setItem('carrinho', JSON.stringify(cart))
    updateCartStorage();
}

// Aumenta a quantidade
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id)
    if (item) {
        item.quantity += 1
    }
    updateCartStorage()
}

function updateCartStorage() {
    localStorage.setItem('carrinho', JSON.stringify(cart));
    updateCart();
}

// Calcular o total do carrinho
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalElement.innerHTML = `Total: ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart()
})