import HttpService from './http.service';

class ItemList {
  constructor() {
    this.itemsList = []
  }

  getInventories() {
    return HttpService.get('/inventory')
  }

  getIngredients() {
    return HttpService.get('/ingredients')
      .then((list) => list.map((item) => {
        item.isIngredient = true;
        return item;
      }));
  }

  async fetchItems() {
    if (this.itemsList.length === 0) {
      const [inventoryList, ingredientList] = await Promise.all([this.getIngredients(), this.getInventories()]);
      this.itemsList = [...inventoryList, ...ingredientList];
    }
  }

  async updateItemsList() {
    const [inventoryList, ingredientList] = await Promise.all([this.getIngredients(), this.getInventories()]);
    this.itemsList = [...inventoryList, ingredientList];
  }

  async getAllItems() {
    if (this.itemsList.length === 0)
      await this.fetchItems();
    return this.itemsList;
  }
}

export default ItemList;