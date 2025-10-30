const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { credentials, products, productList } = require('./data/testData');

test('Agregar productos al carrito en saucedemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Paso 1: Login
  await loginPage.navigate();
  await loginPage.login(credentials.username, credentials.password);

  // Paso 2: Agregar solo 1 producto
  await productPage.addProductToCart(productList.list); //Desarrollar el metodo de addProductToCart

  // Paso 3: Ir al carrito
  await productPage.goToCart();

  // Paso 4: Verificar producto en el carrito
  const items = await cartPage.getCartItems();
  expect(items).toContain(productList.list[0]);

});
