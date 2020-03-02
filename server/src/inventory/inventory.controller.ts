import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    NotFoundException,
    BadRequestException,
    UsePipes
} from '@nestjs/common';
import { InventoryService } from './../inventory/inventory.service';
import { Inventory } from './../inventory/inventory.entity';
import { ValidationPipe } from './../validation/validation.pipe';
import { InventoryDto } from './inventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {
    }

    @Get()
    getInventoryList(): Promise<Inventory[]> {
        return this.inventoryService.findAll();
    }

    @Get(':id')
    async getInventory(@Param('id') id: number): Promise<Inventory> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        const inventory: Inventory = await this.inventoryService.find(id);
        if (!inventory)
            throw new NotFoundException();
        return inventory;
    }

    @Post()
    @UsePipes(ValidationPipe)
    addInventory(@Body() inventory: InventoryDto): Promise<Inventory> {
        return this.inventoryService.addInventory(inventory);
    }

    @Put(':id')
    @Post()
    @UsePipes(ValidationPipe)
    async updateInventory(@Body() inventory: InventoryDto, @Param('id') id: number): Promise<Inventory> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        return this.inventoryService.updateInventory(id, inventory);
    }

    @Delete(':id')
    async removeInventory(@Param('id') id: number) {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        await this.inventoryService.removeInventory(id);
    }
}