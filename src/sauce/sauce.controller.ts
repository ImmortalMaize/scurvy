/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { SauceService } from './sauce.service';

@Controller()
export class SauceController {
    constructor(private sauceService: SauceService) {}

    @Put(':name')
    async merge(@Param('name') name: string) {
        this.sauceService.merge(name)
    }
    @Get(':name')
    async find(@Param('name') name: string) {
        return await this.sauceService.find(name)
    }
    @Delete()
    async clear() {
        return await this.sauceService.clear()
    }
}
