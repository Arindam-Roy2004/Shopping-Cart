document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 10.99 },
        { id: 2, name: "Product 2", price: 15.99 },
        { id: 3, name: "Product 3", price: 20.99 },
        { id: 4, name: "Product 4", price: 25.99 },
        { id: 5, name: "Product 5", price: 30.99 }
    ];

    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');
    const priceTotal = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    let cart = [];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // console.log('Add to Cart button clicked');
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                // console.log(`Adding ${product.name} to cart of price $${product.price.toFixed(2)}`);
                addToCart(product);
            }
        }
    });

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function renderCart() {
        console.log(cart);
        cartList.innerHTML = '';
        // console.log(cartList.innerHTML);
        let totalPrice = 0;
        if (cart.length > 0) {
            // console.log(emptyCartMessage.classList.add('hidden'));
            emptyCartMessage.classList.add('hidden');
            cartTotal.classList.remove('hidden');
            // Calculate and display total price
            cart.forEach(item => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
            `;
                cartList.appendChild(cartItem);
            });
            priceTotal.textContent = `${totalPrice.toFixed(2)}`;
        }
        else {
            emptyCartMessage.classList.remove('hidden');
            // cartTotal.classList.add('hidden');
            priceTotal.textContent = `$0.00`;
            // priceTotal.classList.add('hidden');
        }
    }
    checkoutButton.addEventListener('click', () => {
        cart.length = 0;
        alert('Thank you for your purchase!');
        renderCart();
    });


});