// ===============================
// PRODUCT / CART LOGIC (your code)
// ===============================

const featuredContainer = document.getElementById("featured-products");
const cartCount = document.getElementById("cart-count");
const detailsDiv = document.getElementById("product-details"); 
let cart = [];

function showCartMessage() {
  const cartDiv = document.querySelector('.cart');
  cartDiv.style.display = 'block';
  
  setTimeout(() => {
    cartDiv.style.display = 'none';
  }, 2000);
}

async function loadFeatured() {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=8');
    const products = await res.json();

    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button class="btn">Add to Cart</button>
      `;

      card.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation(); 
        cart.push(product);
        cartCount.textContent = cart.length;
        showCartMessage();
      });

      card.addEventListener("click", () => showDetails(product.id));

      featuredContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Fetch & show product details
async function showDetails(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    detailsDiv.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="${product.title}" width="200">
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p>${product.description}</p>
    `;
    detailsDiv.style.display = "block";
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

// Load categories
async function loadCategories() {
  try {
    const categoriesRes = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await categoriesRes.json();
    
    const container = document.querySelector('#categories .product-grid');
    container.innerHTML = ''; 
    
    for (let category of categories.slice(0, 3)) {
      const productsRes = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`);
      const products = await productsRes.json();
      
      if (products.length > 0) {
        const product = products[0];
        
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
          <img src="${product.image}" alt="${category}">
          <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <p>${product.title}</p>
        `;
        container.appendChild(card);
      }
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

loadFeatured();
loadCategories();


// ===============================
// LOGIN / SIGNUP / LOGOUT LOGIC
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const greeting = document.getElementById('greeting');
  const loginLink = document.getElementById('loginBtn');   // make sure these have IDs in your HTML
  const signupLink = document.getElementById('signupBtn'); // same here
  const header = document.querySelector('header');

  // Check user in localStorage
  const currentUser = localStorage.getItem('currentUser') || localStorage.getItem('username');

  if (currentUser) {
    // Show greeting
    greeting.textContent = `Welcome, ${currentUser}!`;

    // Hide login/signup
    if (loginLink) loginLink.style.display = 'none';
    if (signupLink) signupLink.style.display = 'none';

    // Add logout button (only once)
    if (!document.getElementById('logoutBtn')) {
      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'logoutBtn';
      logoutBtn.className = 'btn';
      logoutBtn.textContent = 'Logout';
      logoutBtn.style.marginLeft = '12px';

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username'); // optional, to clear both
        location.reload();
      });

      header.appendChild(logoutBtn);
    }
  } else {
    // Guest view
    greeting.textContent = 'Welcome, Guest!';
    if (loginLink) loginLink.style.display = '';
    if (signupLink) signupLink.style.display = '';
  }
});
