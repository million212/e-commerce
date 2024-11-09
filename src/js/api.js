// Variáveis globais
let cart = [];
const productsElement = document.getElementById("products");

// Função para buscar os produtos da API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.in/api/products');
    const data = await response.json();

// Acessa o  array de produtos
    if (data.products && Array.isArray(data.products)) {
        displayProducts(data.products)
    } else {
        console.log('A resposta da API não contém um array de produtos:', data);
        
    }
}

// Exibir os produtos na página
function displayProducts(products) {
    products.forEach(product => {
        const formattedPrice = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <div id="container"><img src="${product.image}" alt="${product.title}" referrerpolicy="no-referrer"></div>
            <p>${formattedPrice}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Adicionar ao carrinho</button>
        `;
        productsElement.appendChild(productDiv);
    });
}

// Adicionar item ao carrinho
function addToCart(id, title, price) {

    // Carregar o carrinho
    cart = JSON.parse(localStorage.getItem('carrinho')) || []

    // Verifica se o item existe no carrinho
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
    // Se existir aumente a quatidade
        existingItem.quantity++;
    } else {
    // Se não existir, adicione um novo item ao carrinho
        cart.push({ id, title, price, quantity: 1 });
    }
    
    // Salvar o carrinho  atualizado no carrinho
    localStorage.setItem('carrinho', JSON.stringify(cart))

    // Atualizar o favicon
    updateFavicon(cart)
    
}

function updateCartBadge() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

    if (totalItems > 0) {
        cartBadge.textContent = totalItems
        cartBadge.style.visibility = 'visible';
    } else {
        cartBadge.style.visibility = 'hidden';
    }
}

// Iniciar a aplicação
document.addEventListener('DOMContentLoaded', () => {

    fetchProducts()

    cart = JSON.parse(localStorage.getItem('carrinho')) || []
    updateFavicon(cart)

    updateCartBadge()
})


