import { Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { SheetService } from './sheet.service';

@Controller('s')
export class SheetController {
    constructor(private sheetService: SheetService) {}

    @Put(':name')
    async merge(@Param('name') name: string) {
        this.sheetService.merge(name)
    }
    @Get(':name')
    async find(@Param('name') name: string) {
        return await this.sheetService.find(name)
    }
    @Delete()
    async clear() {
        return await this.sheetService.clear()
    }
}

