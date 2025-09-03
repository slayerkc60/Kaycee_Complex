const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");


let cart = [];


function showCartMessage() {
    const cartDiv = document.querySelector('.cart');
    cartDiv.style.display = 'block';
    
    setTimeout(() => {
        cartDiv.style.display = 'none';
    }, 2000);
}

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(products => {

    products.forEach(product => {
      
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;

    
      productList.appendChild(card);
    });
  })
  .catch(error => console.error("Error fetching products:", error));


function addToCart(productId) {
  cart.push(productId); 
  cartCount.textContent = cart.length; 
  showCartMessage(); 
}

 
