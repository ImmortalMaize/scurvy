import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContentService } from './content.service';
import { DatabaseService } from 'src/database';

@Controller()
export class ContentController {
    constructor(private contentService: ContentService, private databaseService: DatabaseService) {}
    @Post('')
    async read(@Body() body: {query: string, parameters: {[key: string]: string}}) {
        const { query, parameters } = body
        return await this.databaseService.read(query, parameters ?? {})
    }

    @Post('table')
    async table(@Body() body: {query: string, parameters: {[key: string]: string}}) {
        const { query, parameters } = body
        return this.databaseService.table(await this.databaseService.read(query, parameters ?? {}))
    }

    @Delete('')
    async clearAll() {
        return await this.contentService.clearAll()
    }
}
