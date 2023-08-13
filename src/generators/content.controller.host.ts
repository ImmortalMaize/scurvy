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
    merge(name: string): Promise<any>
    find(name: string): Promise<any>
    clear(): Promise<any>
}

export function ContentControllerHost<ContentInterface extends Content, ContentDto>(service: ContentServiceInterface<ContentInterface, ContentDto>): Type<ControllerHostInterface<ContentInterface, ContentDto>> {
    @Controller()
    class ContentControllerHost {
        @Inject(service) readonly contentService: ContentServiceInterface<ContentInterface, ContentDto>
        @Get()
        async getAll() {
            return (await this.contentService.getAll()).toJson()
        }
        @Post()
        async make(properties: ContentDto) {
            return (await this.contentService.make(properties)).toJson()
        }
        @Put(':index')
        async merge(@Param('index') index: any) {
            return (await this.contentService.merge(index)).toJson()
        }
        @Get('primary/:primary')
        async find(@Param('primary') primary: string) {
            return (await this.contentService.findByPrimary(primary)).toJson()
        }
        @Get('id/:id')
        async findById(@Param('id') id: number) {
            return (await this.contentService.findById(id)).toJson()
        }
        @Get(':key/:value')
        async findByKey(@Param('key') key: string, @Param('value') value: any) {
            return (await this.contentService.findByKey(key, value)).toJson()
        }
        @Post('query')
        async findManyByKey(properties: { [key: string]: any }) {
            return (await this.contentService.findManyByKey(properties)).toJson()
        }
        @Delete()
        async clear() {
            return await this.contentService.clear()
        }
    }
    return ContentControllerHost
}