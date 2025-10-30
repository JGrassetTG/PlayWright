const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Función para leer todas las credenciales desde CSV
function leerTodasLasCredencialesDesdeCSV(ruta) {
  return new Promise((resolve, reject) => {
    const resultados = [];
    fs.createReadStream(ruta)
      .pipe(csv())
      .on('data', (data) => resultados.push(data))
      .on('end', () => resolve(resultados))
      .on('error', reject);
  });
}

test.describe('Pruebas de login con múltiples usuarios desde CSV', () => {
  let credenciales = [];

  test.beforeAll(async () => {
    const rutaCSV = path.resolve(__dirname, './data/credenciales.csv');
    credenciales = await leerTodasLasCredencialesDesdeCSV(rutaCSV);
  });

  test('Login con múltiples usuarios', async ({ page }) => {
    for (const usuario of credenciales) {
      const loginPage = new LoginPage(page);
      const productPage = new ProductPage(page);

      await loginPage.navigate();
      await loginPage.login(usuario.username, usuario.password);

      await expect(page).toHaveURL(/inventory/);

      await productPage.abrirMenuLateral();
      await productPage.cerrarSesionMenuLateral();
    }
  });
});