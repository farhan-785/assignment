import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './../recipe/recipe.entity';
import { Repository } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { RecipeItem } from '../recipe.item/recipe.item.entity';


const conversions = {
    'Kg': {
        'gram': (price) => (1 / 1000) * price,
        'Kg': (price) => price,
        'lb': (price) => (1 / 2.205) * price
    },
    'L': {
        'mL': (price) => (1 / 1000) * price,
        'lb': (price) => (1 / 2.20) * price,
        'L': (price) => price
    },
    'gram': {
        'Kg': (price) => 1000 * price,
        'lb': (price) => 454 * price,
        'gram': (price) => price
    },
    'mL': {
        'L': (price) => 1000 * price,
        'lb': (price) => 453.59 * price,
        'mL': (price) => price
    },
    'lb': {
        'Kg': (price) => 2.205 * price,
        'gram': (price) => (1 / 454) * price,
        'L': (price) => 2.20 * price,
        'ml': (price) => (1 / 453.59) * price
    }
}

@Injectable()
export class CostService {
    constructor(
        @InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>) {

    }

    async calculateCost(recipe: Recipe): Promise<number> {
        let cost: number = 0;
        const recipeItems: RecipeItem[] = recipe.recipeItems;
        for (let item of recipeItems) {
            if (item.ingredient.length === 1) {
                let ingItem: Ingredient = item.ingredient[0];
                let ingCost = await this.calculateCost((await this.getIngredientRecipe(ingItem.id)));
                cost += item.quantity * conversions[ingItem.unit][item.unit](ingCost);
            } else if (item.inventoryItem.length === 1) {
                let invItem: Inventory = item.inventoryItem[0]
                cost += item.quantity * conversions[invItem.unit][item.unit](invItem.price);
            }
        }
        return Math.trunc(cost * 100) / 100;
    }

    async getIngredientRecipe(id): Promise<Recipe> {
        const ingredient: Ingredient = await this.ingredientRepository.findOne(id,
            { relations: ['recipe', 'recipe.recipeItems', 'recipe.recipeItems.inventoryItem', 'recipe.recipeItems.ingredient'] });
        return ingredient.recipe;
    }
}