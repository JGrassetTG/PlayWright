//Prueba para testear login con credenciales usando credenciales.csv

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');


// Función para leer credenciales desde CSV
function leerCredencialesDesdeCSV(ruta) {
  return new Promise((resolve, reject) => {
    const resultados = [];
    fs.createReadStream(ruta)
      .pipe(csv())
      .on('data', (data) => resultados.push(data))
      .on('end', () => resolve(resultados[0])) // solo usamos la primera fila
      .on('error', reject);
  });
}

test('Login en saucedemo con datos desde CSV', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  const rutaCSV = path.resolve(__dirname, './data/credenciales.csv');
  const credenciales = await leerCredencialesDesdeCSV(rutaCSV);

  await loginPage.navigate();
  await loginPage.login(credenciales.username, credenciales.password);

  // Validación opcional: verificar que se haya hecho login correctamente
  await expect(page).toHaveURL(/inventory/);
});
