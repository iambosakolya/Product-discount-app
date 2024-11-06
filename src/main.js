"use strict";

const products = [];

const getElementById = (id) => document.getElementById(id);

const createProduct = (name, price) => ({
  name,
  price,
  originalPrice: price, 
});

const addProduct = () => {
  const name = getElementById("productName").value;
  const price = parseFloat(getElementById("productPrice").value);

  if (!name || isNaN(price) || price <= 0) {
    alert("Please enter a valid product name and price.");
    return;
  }

  products.push(createProduct(name, price));
  renderProductList(products);
};

const applyDiscountToProduct = (discount) => (product) => ({
  ...product,
  discountedPrice: product.price * (1 - discount / 100),
});

const applyDiscount = () => {
  const discount = parseFloat(getElementById("discount").value);

  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert("Please enter a valid discount percentage (0-100).");
    return;
  }

  const discountedProducts = products.map(applyDiscountToProduct(discount));
  renderProductList(discountedProducts);
};

const setPriceForProduct = (newPrice, discount = 0) => (product) => ({
  ...product,
  price: newPrice,
  discountedPrice: newPrice * (1 - discount / 100),
});

const setNewPrice = () => {
  const newPrice = parseFloat(getElementById("newPrice").value);
  const discount = parseFloat(getElementById("discount").value) || 0;

  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Please enter a valid new price.");
    return;
  }

  products.forEach((product, index) => {
    products[index] = setPriceForProduct(newPrice, discount)(product);
  });

  renderProductList(products);
};

const renderProductList = (productListData = products) => {
  const productList = getElementById("productList");
  productList.innerHTML = "";

  const productItems = productListData.map((product) => {
    const li = document.createElement("li");
    li.textContent =
      `Name: ${product.name} - Original price: $${product.originalPrice.toFixed(2)}, ` +
      `Price with discount: $${(
        product.discountedPrice || product.price
      ).toFixed(2)}`;
    return li;
  });

  productItems.forEach((li) => productList.appendChild(li));
};

const clearProducts = () => {
  products.length = 0;
  renderProductList(products);
};
