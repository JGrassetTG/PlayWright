class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemName = '.inventory_item_name';
    this.checkoutButton = '[data-test="checkout"]';
  }

  async getCartItems() {
    return await this.page.$$eval(this.cartItemName, items =>
      items.map(item => item.textContent.trim())
    );
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

module.exports = { CartPage };





