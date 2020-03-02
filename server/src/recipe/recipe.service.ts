import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
    constructor(@InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>) {
    }

    findAll(): Promise<Recipe[]> {
        return this.recipeRepository.find({ relations: ['recipeItems', 'recipeItems.inventoryItem', 'recipeItems.ingredient'] });
    }

    find(id: number): Promise<Recipe> {
        return this.recipeRepository.findOne(id, { relations: ['recipeItems', 'recipeItems.inventoryItem', 'recipeItems.ingredient'] });
    }

    addRecipe(Recipe: Recipe): Promise<Recipe> {
        return this.recipeRepository.save(Recipe);
    }

    async updateRecipe(id: number, updatedRecipe: Recipe): Promise<Recipe> {
        const Recipe: Recipe = await this.find(id);
        return this.recipeRepository.save({ ...Recipe, ...updatedRecipe });
    }

    async removeRecipe(id: number): Promise<any> {
        const Recipe: Recipe = await this.recipeRepository.findOne(id, { relations: ['recipeItems'] });
        return this.recipeRepository.remove(Recipe);
    }
}