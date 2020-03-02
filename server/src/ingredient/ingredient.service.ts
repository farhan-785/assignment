import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './../recipe/recipe.entity';
import { RecipeItem } from './../recipe.item/recipe.item.entity';
import { CostService } from './../cost/cost.service';
import { Inventory } from "../inventory/inventory.entity";


@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>,
        @InjectRepository(RecipeItem) private readonly recipeItemRepository: Repository<RecipeItem>,
        private readonly costService: CostService) {
    }


    findAll(): Promise<Ingredient[]> {
        return this.ingredientRepository.find();
    }

    async find(id: number): Promise<Ingredient> {
        return this.ingredientRepository.findOne(id, { relations: ['recipe', 'recipe.recipeItems', 'recipe.recipeItems.inventoryItem', 'recipe.recipeItems.ingredient'] });
    }

    async calculateCost(id: number): Promise<number> {
        const ingredient: Ingredient = await this.ingredientRepository.findOne(id, { relations: ['recipe', 'recipe.recipeItems', 'recipe.recipeItems.inventoryItem', 'recipe.recipeItems.ingredient'] });
        if (!ingredient)
            throw new NotFoundException();
        const cost: number = await this.costService.calculateCost(ingredient.recipe);
        return cost;
    }

    addIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return this.ingredientRepository.save(ingredient);
    }

    async updateIngredient(id: number, updatedIngredient: Ingredient): Promise<Ingredient> {
        const ingredient: Ingredient = await this.ingredientRepository.findOne(id);
        return this.ingredientRepository.save({ ...ingredient, ...updatedIngredient });
    }

    async removeIngredient(id: number): Promise<any> {
        const ingredient: Ingredient = await this.ingredientRepository.findOne(id);
        if (ingredient) {
            const recipeItems: RecipeItem[] = (await this.recipeItemRepository.find({ relations: ['ingredient'] }))
                .filter((recipeItem: RecipeItem) => recipeItem.ingredient.length > 0 && recipeItem.ingredient[0].id == id);
            await this.recipeItemRepository.remove(recipeItems);
            await this.ingredientRepository.remove(ingredient);
        }
    }
}