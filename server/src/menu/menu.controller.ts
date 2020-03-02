import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put
} from '@nestjs/common';
import { MenuService } from './../menu/menu.service';
import { Menu } from './../menu/menu.entity';

@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) {
    }

    @Get()
    getMenuList(): Promise<Menu[]> {
        return this.menuService.findAll();
    }

    @Get(':id')
    async getMenu(@Param('id') id: number): Promise<Menu> {
        const menu: Menu = await this.menuService.find(id);
        if (!menu)
            throw new NotFoundException();
        return menu;
    }

    @Get(':id/cost')
    async getMenuCost(@Param('id') id: number): Promise<Object> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        return { cost: await this.menuService.calculateCost(id) };
    }

    @Post()
    addMenu(@Body() Menu: Menu): Promise<Menu> {
        return this.menuService.addMenu(Menu);
    }

    @Put(':id')
    async updateMenu(@Body() Menu: Menu, @Param('id') id: number): Promise<Menu> {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        return this.menuService.updateMenu(id, Menu);
    }

    @Delete(':id')
    async removeMenu(@Param('id') id: number) {
        if (isNaN(id) === true || !!id === false)
            throw new BadRequestException();
        this.menuService.removeMenu(id);
    }
}