const featuredContainer = document.getElementById("featured-products");
const cartCount = document.getElementById("cart-count");
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

       
            card.querySelector("button").addEventListener("click", () => {
                cart.push(product);
                cartCount.textContent = cart.length;
                showCartMessage();
            });

            featuredContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

loadFeatured();
