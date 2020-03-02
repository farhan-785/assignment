import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.entity';
import { RecipeItem } from './../recipe.item/recipe.item.entity';
import { InventoryController } from './inventory.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Inventory, RecipeItem])],
    controllers: [InventoryController],
    providers: [InventoryService],
    exports: [TypeOrmModule, InventoryService]
})

export class InventoryModule {
}