document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.Educart');
    const cartIcon = document.querySelector('#cart-icon');
    const closeButton = document.querySelector('#cart-close');
    const buyButton = document.querySelector('.Edubuy-button');
    const clearCartButton = document.querySelector('#clear-cart-btn');
    const cartContent = document.querySelector('.Educart-content');

    loadCartItems();

    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    closeButton.onclick = () => {
        cart.classList.remove("active");
    };

    buyButton.addEventListener("click", buyButtonClicked);
    clearCartButton.addEventListener("click", clearCart);

    const addCartButtons = document.querySelectorAll(".Eduadd-cart");
    addCartButtons.forEach(button => {
        button.addEventListener("click", addCartClicked);
    });

    document.getElementById('go-back-to-cart-btn').addEventListener('click', function() {
        const checkoutLayout = document.querySelector('#checkoutLayout');
        const cart = document.querySelector('.Educart');
        checkoutLayout.style.display = 'none';
        cart.classList.add('active');
    });

    document.getElementById('checkout-btn').addEventListener('click', redirectToPayment);
});

function buyButtonClicked() {
    const cartContent = document.querySelector('.Educart-content');
    const cartBoxes = cartContent.querySelectorAll(".Educart-box");

    if (cartBoxes.length === 0) {
        alert("Please add items to the cart before proceeding to checkout");
        return;
    }

    const orderSummaryList = document.querySelector('.Edulist');
    orderSummaryList.innerHTML = '';

    let totalQuantity = 0;
    let totalPrice = 0;

    cartBoxes.forEach(cartBox => {
        const productImg = cartBox.querySelector(".Educart-img").src;
        const title = cartBox.querySelector(".Educart-product").textContent;
        const price = parseFloat(cartBox.querySelector(".Educart-price").textContent.replace("$", ""));
        const quantity = parseInt(cartBox.querySelector(".Eduquantity").value);

        const itemTotalPrice = price * quantity;
        totalQuantity += quantity;
        totalPrice += itemTotalPrice;

        addOrderSummary(title, price, productImg, quantity, itemTotalPrice);
    });

    document.querySelector('.EdutotalQuantity').textContent = totalQuantity;
    document.querySelector('.EdutotalPrice').textContent = "$" + totalPrice.toFixed(2);

    localStorage.removeItem('cartItems');

    updateTotal();

    const cart = document.querySelector('.Educart');
    cart.classList.remove('active');

    const checkoutLayout = document.querySelector('#checkoutLayout');
    checkoutLayout.style.display = 'block';
    checkoutLayout.scrollIntoView({ behavior: 'smooth' });
}

function addOrderSummary(title, price, productImg, quantity, itemTotalPrice) {
    const orderSummaryList = document.querySelector('.Edulist');
    const orderItem = document.createElement('div');
    orderItem.classList.add('Eduitem');
    orderItem.innerHTML = `
        <img src="${productImg}" alt="" class="Educart-img">
        <div class="Eduinfo">
            <div class="Eduname">${title}</div>
            <div class="Eduquantity">Quantity: ${quantity}</div>
            <div class="EdureturnPrice">Price: $${itemTotalPrice.toFixed(2)}</div>
        </div>
    `;
    orderSummaryList.appendChild(orderItem);
}

function addCartClicked(event) {
    const button = event.target;
    const product = button.parentElement;
    const title = product.querySelector(".Eduproduct-title").textContent;
    const price = product.querySelector(".Eduprice").textContent;
    const productImg = product.querySelector("img").src;
    const sizeSelect = product.querySelector(".Edusize-options");
    const size = sizeSelect ? sizeSelect.value : '';
    addProductToCart(title, price, productImg, size);
    updateTotal();
    saveCartItems();
}

function addProductToCart(title, price, productImg, size) {
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("Educart-box");

    const cartContent = document.querySelector('.Educart-content');

    const cartBoxContent = `
        <div class="Educart-detail">
            <img src="${productImg}" alt="" class="Educart-img">
            <div class="Educart-product">${title}${size ? ` - ${size}` : ''}</div>
            <div class="Educart-price">${price}</div>
            <input type="number" value="1" class="Eduquantity">
        </div>
        <ion-icon name="trash" class="Educart-remove"></ion-icon>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);
    cartShopBox.querySelector('.Educart-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.Eduquantity').addEventListener('change', quantityChanged);
    updateCartCount();
    saveCartItems();
}

function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    updateCartCount();
    saveCartItems();
}

function updateCartCount() {
    const cartCount = document.querySelector('.Educart-count');
    const cartContent = document.querySelector('.Educart-content');
    const cartBoxes = cartContent.querySelectorAll(".Educart-box");
    cartCount.textContent = cartBoxes.length;
}

function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    saveCartItems();
}

function updateTotal() {
    const cartContent = document.querySelector('.Educart-content');
    const cartBoxes = cartContent.querySelectorAll(".Educart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".Educart-price");
        const quantityElement = cartBox.querySelector(".Eduquantity");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = quantityElement.value;
        total += price * quantity;
    });

    total = Math.round(total * 100) / 100;

    document.querySelector(".Edutotal-price").innerText = "$" + total;
}

function saveCartItems() {
    const cartContent = document.querySelector('.Educart-content');
    const cartBoxes = cartContent.querySelectorAll(".Educart-box");
    const cartItems = [];

    cartBoxes.forEach(cartBox => {
        const productImg = cartBox.querySelector(".Educart-img").src;
        const title = cartBox.querySelector(".Educart-product").textContent;
        const price = cartBox.querySelector(".Educart-price").textContent;
        const quantity = cartBox.querySelector(".Eduquantity").value;
        cartItems.push({
            productImg,
            title,
            price,
            quantity
        });
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
        addProductToCart(item.title, item.price, item.productImg, '');
        const cartContent = document.querySelector('.Educart-content');
        const cartBox = cartContent.lastElementChild;
        cartBox.querySelector('.Eduquantity').value = item.quantity;
    });
    updateTotal();
    updateCartCount();
}

function clearCart() {
    const cartContent = document.querySelector('.Educart-content');
    cartContent.innerHTML = '';
    updateTotal();
    updateCartCount();
    localStorage.removeItem('cartItems');
}

function redirectToPayment() {
    window.location.href = '../HTML/payment.html';
}
