'use strict';

let products = [];

// to add a new product
const addProduct = () => {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    
    if (!name || isNaN(price) || price <= 0) {
        alert("Please enter a valid product name and price.");
        return;
    }

    products = [...products, { name, price }];
    updateProductList();
};

// apply a discount to all products
const applyDiscount = () => {
    const discount = parseFloat(document.getElementById('discount').value);
    if (isNaN(discount) || discount < 0 || discount > 100) {
        alert("Please enter a valid discount percentage (0-100).");
        return;
    }

    // products with discounted price
    products = products.map(product => ({
        ...product,
        discountedPrice: product.price * (1 - discount / 100),
    }));

    updateProductList();
};

// set a new price for all products
const setNewPrice = () => {
    const newPrice = parseFloat(document.getElementById('newPrice').value);
    if (isNaN(newPrice) || newPrice <= 0) {
        alert("Please enter a valid new price.");
        return;
    }

    // all products with the new price
    products = products.map(product => ({
        ...product,
        price: newPrice,
        discountedPrice: newPrice * (1 - (parseFloat(document.getElementById('discount').value) || 0) / 100)
    }));

    updateProductList();
};

// to update the HTML list of products
const updateProductList = () => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Name:${product.name} - Original price: $${product.price.toFixed(2)}, ` +
                         `Price with discount: $${(product.discountedPrice || product.price).toFixed(2)}`;
        productList.appendChild(li);
    });
};

// to clear all products
const clearProducts = () => {
    products = []; 
    updateProductList();
};

