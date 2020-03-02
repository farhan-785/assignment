import { Injectable } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './inventory.entity';
import { RecipeItem } from './../recipe.item/recipe.item.entity';

@Injectable()
export class InventoryService {
    constructor(@InjectRepository(Inventory) private readonly inventoryRepository: Repository<Inventory>,
                @InjectRepository(RecipeItem) private readonly recipeItemRepository: Repository<RecipeItem>) {
    }

    findAll(): Promise<Inventory[]> {
        return this.inventoryRepository.find();
    }

    find(id: number): Promise<Inventory> {
        return this.inventoryRepository.findOne(id);
    }

    addInventory(Inventory: Inventory): Promise<Inventory> {
        return this.inventoryRepository.save(Inventory);
    }

    async updateInventory(id: number, updatedInventory: Inventory): Promise<Inventory> {
        const Inventory: Inventory = await this.find(id);
        return this.inventoryRepository.save({ ...Inventory, ...updatedInventory });
    }

    async removeInventory(id: number): Promise<any> {
        const inventory: Inventory = await this.inventoryRepository.findOne(id);
        if (inventory) {
            const recipeItems: RecipeItem[] = (await this.recipeItemRepository.find({ relations: ['inventoryItem'] }))
                .filter((recipeItem: RecipeItem) => recipeItem.inventoryItem.length > 0 && recipeItem.inventoryItem[0].id == id);
            await this.recipeItemRepository.remove(recipeItems);
            await this.inventoryRepository.remove(inventory);
        }
    }
}