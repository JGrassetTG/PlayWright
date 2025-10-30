const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { credentials, products, toDelete } = require('./data/testData');

test('Agregar productos al carrito en saucedemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Paso 1: Login
  await loginPage.navigate();
  await loginPage.login(credentials.username, credentials.password);

  //Paso 2: Agregar productos en ciclo
  for (const product of products.list){
    await productPage.addProductByName(product);
  }
  // Paso 3: Ir al carrito
  await productPage.goToCart();

 //Paso 4: Eliminar los productos en el carrito
 for (const productToBeDeleted of toDelete){
    await productPage.deleteProductByName(productToBeDeleted);
 }
  
 //Paso 5: Verificar productoSSSS en el carrito

// Paso 1: obtener los productos esperados (agregados menos eliminados)
const productosEsperados = products.list.filter(product => !toDelete.includes(product));

// Paso 2: obtener los productos reales en el carrito
const itemsEnCarrito = await cartPage.getCartItems();

// Paso 3: validar que los productos esperados estén en el carrito
for (const producto of productosEsperados) {
  expect(itemsEnCarrito).toContain(producto);
}

});
