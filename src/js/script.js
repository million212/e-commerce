// Variáveis globais
let cart = [];
const productsElement = document.getElementById("products");

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

    // Carregar o carrinho
    let cart = JSON.parse(localStorage.getItem('carrinho'))

    // Ferifica se o item existe no carrinho
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
    // Se existir aumente a quatidade
        existingItem.quantity++;
    } else {
    // Se não existir, adicione um novo item ao carrinho
        cart.push({ id, title, price, quantity: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(cart))
    
}

// Iniciar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts()
})
