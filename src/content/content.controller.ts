import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Delete('')
    async clearAll() {
        return await this.contentService.clearAll()
    }
}
