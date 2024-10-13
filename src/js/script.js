// Variáveis globais
let cart = [];
const productsElement = document.getElementById("products");
const cartElement = document.getElementById("cart");
const totalElement = document.getElementById("total");

// Função para buscar os produtos da API
async function fetchProducts() {
    const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=11');
    const products = await response.json();
    displayProducts(products);
}

// Exibir os produtos na página
function displayProducts(products) {
    products.forEach(product => {
        const formattedPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <div id="container"><img src="${product.images}" alt="${product.title}" referrerpolicy="no-referrer"></div>
            <p>${formattedPrice}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Adicionar ao carrinho</button>
        `;
        productsElement.appendChild(productDiv);
    });
}

// Adicionar item ao carrinho
function addToCart(id, title, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, quantity: 1 });
        localStorage.setItem('carrrinho', JSON.stringify(cart))
    }
    updateCart();
}

// Remover item do carrinho
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Atualizar o carrinho
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

// Calcular o total do carrinho
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalElement.innerHTML = `Total: ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`;
}

function loadCart() {
    const storedCart = JSON.parse(localStorage.getItem('carrinho'));
    if (storedCart) {
        cart = storedCart;
    }
    updateCart();
    
}


// Iniciar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts()
    loadCart()
})
