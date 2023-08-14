import { Controller, Delete, Get, Inject, Param, Post, Put, Type } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { ContentServiceInterface } from "./content.service.host";
import { ContentServiceHost } from 'src/generators/content.service.host';
import { Content } from "../database";
export interface ControllerHostInterface<ContentInterface extends Content, ContentDto> {
    contentService: ContentServiceInterface<ContentInterface, ContentDto>
    make(...args: any): Promise<any>
    getAll(): Promise<any>
    findById(id: number): Promise<any>
    findByKey(key: string, value: any): Promise<any>
    findManyByKey(properties: { [key: string]: any }): Promise<any>
    merge(...args: any): Promise<any>
    find(name: string): Promise<any>
    clear(): Promise<any>
}

export function ContentControllerHost<ContentInterface extends Content, ContentDto>(service: ContentServiceInterface<ContentInterface, ContentDto>): Type<ControllerHostInterface<ContentInterface, ContentDto>> {
    @Controller()
    class ContentControllerHost {
        @Inject(service) readonly contentService: ContentServiceInterface<ContentInterface, ContentDto>
        @Get()
        async getAll() {
            const result = await this.contentService.getAll()
            if (result) return result.toJson(); else return null
        }
        @Post()
        async make(properties: ContentDto) {
            const result = await this.contentService.make(properties)
            if (result) return result.toJson(); else return null
        }
        @Put(':index')
        async merge(@Param('index') index: any) {
            const result = (await this.contentService.merge(index))
            if (result) return result.toJson(); else return null
        }
        @Get('primary/:primary')
        async find(@Param('primary') primary: string) {
            const result = (await this.contentService.findByPrimary(primary))
            if (result) return result.toJson(); else return null
        }
        @Get('id/:id')
        async findById(@Param('id') id: number) {
            const result = (await this.contentService.findById(id))
            if (result) return result.toJson(); else return null
        }
        @Get(':key/:value')
        async findByKey(@Param('key') key: string, @Param('value') value: any) {
            const result = (await this.contentService.findByKey(key, value))
            if (result) return result.toJson(); else return null
        }
        @Post('query')
        async findManyByKey(properties: { [key: string]: any }) {
            const result = (await this.contentService.findManyByKey(properties))
            if (result) return result.toJson(); else return null
        }
        @Delete()
        async clear() {
            return await this.contentService.clear()
        }
    }
    return ContentControllerHost
}