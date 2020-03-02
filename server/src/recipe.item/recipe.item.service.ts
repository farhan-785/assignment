import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeItem } from './recipe.item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeItemService {
    constructor(@InjectRepository(RecipeItem) private readonly recipeItemRepository: Repository<RecipeItem>) {
    }

    findAll(): Promise<RecipeItem[]> {
        return this.recipeItemRepository.find({ relations: ['inventoryItem', 'ingredient'] });
    }

    find(id: number): Promise<RecipeItem> {
        return this.recipeItemRepository.findOne(id, { relations: ['inventoryItem', 'ingredient'] });
    }

    addRecipeItem(recipeItem: RecipeItem): Promise<RecipeItem> {
        return this.recipeItemRepository.save(recipeItem);
    }

    async updateRecipeItem(id: number, updatedRecipeItem: RecipeItem): Promise<RecipeItem> {
        const recipeItem: RecipeItem = await this.find(id);
        return this.recipeItemRepository.save({ ...RecipeItem, ...updatedRecipeItem });
    }

    async removeRecipeItem(id: number): Promise<any> {
        const recipeItem: RecipeItem = await this.find(id);

        return this.recipeItemRepository.remove(recipeItem);
    }

    async removeIngredients(id: number) {
      /*  const
            question = getRepository(Question);
        question
            .
            categories = question.categories.filter(category => {
            category.id !== categoryToRemove.id
        })
        await
            connection
                .
                manager
                .

                save(question)*/

    }
}