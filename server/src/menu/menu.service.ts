import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { CostService } from './../cost/cost.service';

@Injectable()
export class MenuService {
    constructor
    (@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
     private readonly costService: CostService) {
    }

    findAll(): Promise<Menu[]> {
        return this.menuRepository.find();
    }

    async find(id: number): Promise<Menu> {
        return this.menuRepository.findOne(id, { relations: ['recipe', 'recipe.recipeItems', 'recipe.recipeItems.inventoryItem', 'recipe.recipeItems.ingredient'] });
    }

    async calculateCost(id: number): Promise<number> {
        const menu: Menu = await this.menuRepository.findOne(id, { relations: ['recipe', 'recipe.recipeItems', 'recipe.recipeItems.inventoryItem', 'recipe.recipeItems.ingredient'] });
        if (!menu)
            throw new NotFoundException();
        const cost: number = await this.costService.calculateCost(menu.recipe);
        return cost;
    }

    addMenu(Menu: Menu): Promise<Menu> {
        return this.menuRepository.save(Menu);
    }

    async updateMenu(id: number, updatedMenu: Menu): Promise<Menu> {
        const Menu: Menu = await this.menuRepository.findOne(id, { relations: ['recipe', 'recipe.recipeItems', 'recipe.recipeItems.inventoryItem', 'recipe.recipeItems.ingredient'] });
        return this.menuRepository.save({ ...Menu, ...updatedMenu });
    }

    async removeMenu(id: number) {
        const Menu: Menu = await this.menuRepository.findOne(id);
        await this.menuRepository.remove(Menu);
    }
}