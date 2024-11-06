"use strict";

const products = [];

const getElementById = (id) => document.getElementById(id);

const createProduct = (name, price) => ({ name, price });

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

// Функція вищого порядку для застосування знижки до продукту
const applyDiscountToProduct = (discount) => (product) => ({
  ...product,
  discountedPrice: product.price * (1 - discount / 100),
});

// Застосовує знижку до всіх продуктів, використовуючи функціональний підхід
const applyDiscount = () => {
  const discount = parseFloat(getElementById("discount").value);

  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert("Please enter a valid discount percentage (0-100).");
    return;
  }

  const discountedProducts = products.map(applyDiscountToProduct(discount));
  renderProductList(discountedProducts);
};

// Функція вищого порядку для встановлення нової ціни з можливим застосуванням знижки
const setPriceForProduct =
  (newPrice, discount = 0) =>
  (product) => ({
    ...product,
    price: newPrice,
    discountedPrice: newPrice * (1 - discount / 100),
  });

// Встановлює нову ціну для всіх продуктів, зберігаючи функціональність чистою
const setNewPrice = () => {
  const newPrice = parseFloat(getElementById("newPrice").value);
  const discount = parseFloat(getElementById("discount").value) || 0;

  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Please enter a valid new price.");
    return;
  }

  const updatedProducts = products.map(setPriceForProduct(newPrice, discount));
  renderProductList(updatedProducts);
};

// Відображає оновлений список продуктів у HTML
const renderProductList = (productListData = products) => {
  const productList = getElementById("productList");
  productList.innerHTML = "";

  // Створення масиву HTML-елементів для кожного продукту
  const productItems = productListData.map((product) => {
    const li = document.createElement("li");
    li.textContent =
      `Name: ${product.name} - Original price: $${product.price.toFixed(2)}, ` +
      `Price with discount: $${(
        product.discountedPrice || product.price
      ).toFixed(2)}`;
    return li;
  });

  // Додавання елементів до DOM
  productItems.forEach((li) => productList.appendChild(li));
};

// Очищає список продуктів
const clearProducts = () => {
  products.length = 0;
  renderProductList(products);
};
