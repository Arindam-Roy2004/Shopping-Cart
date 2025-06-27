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
    const clearCartButton = document.getElementById('clear-cart-btn');

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
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        }
    });

    function addToCart(product) {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }

    function renderCart() {
        cartList.innerHTML = '';
        let totalPrice = 0;
        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotal.classList.remove('hidden');
            cart.forEach((item, index) => {
                totalPrice += item.price * item.quantity;
                const cartItem = document.createElement('div');
                cartItem.style.display = 'flex';
                cartItem.style.alignItems = 'center';
                cartItem.innerHTML = `
                    <span style="font-size: 16px; margin-right: 8px;">
                        ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                    </span>
                    <button class="remove-from-cart" data-index="${index}">
                        <img src="image.png" alt="Remove from Cart" style="width:16px; height:16px; vertical-align:middle;">
                    </button>
                `;
                cartList.appendChild(cartItem);
            });
            priceTotal.textContent = `${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMessage.classList.remove('hidden');
            priceTotal.textContent = `$0.00`;
        }
    }

    checkoutButton.addEventListener('click', () => {
        cart.length = 0;
        alert('Thank you for your purchase!');
        renderCart();
    });

    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        alert('Cart cleared!');
        renderCart();
    });

    cartList.addEventListener('click', (e) => {
        if (e.target.closest('.remove-from-cart')) {
            const button = e.target.closest('.remove-from-cart');
            const index = parseInt(button.getAttribute('data-index'));
            if (!isNaN(index)) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                renderCart();
            }
        }
    });

});


