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
            const formattedPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price);
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <h4>${item.title}</h4>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}</p>
                <button onclick="removeFromCart(${item.id})">Remover</button>
            `;
            cartElement.appendChild(cartItemDiv);
        });
    }
    calculateTotal();
}

// Remover item do carrinho
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(cart))
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