import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, Type } from "@nestjs/common";
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
        async merge(@Param('index') index: any, @Body() properties: ContentDto) {
            const result = (await this.contentService.merge(index, properties))
            if (result) return result.toJson(); else return null
        }

        //routes by primary key
        @Get('primary/:primary')
        async find(@Param('primary') primary: string) {
            const result = (await this.contentService.findByPrimary(primary))
            if (result) return result.toJson(); else return null
        }
        @Patch('primary/:primary')
        async update(@Param('primary') primary: string, @Body() properties: ContentInterface) {
            const result = (await this.contentService.updateByPrimary(primary, properties))
            if (result) return result.toJson(); else return null
        }
        @Delete('primary/:primary')
        async delete(@Param('primary') primary: string) {
            await this.contentService.deleteByPrimary(primary)
            return
        }

        // routes by internal id
        @Get('id/:id')
        async findById(@Param('id') id: number) {
            const result = (await this.contentService.findById(id))
            if (result) return result.toJson(); else return null
        }
        @Patch('id/:id')
        async updateById(@Param('id') id: number, @Body() properties: ContentInterface) {
            const result = (await this.contentService.updateById(id, properties))
            if (result) return result.toJson(); else return null
        }
        @Delete('id/:id')
        async deleteById(@Param('id') id: number) {
            await this.contentService.deleteById(id)
            return
        }

        // routes by key
        @Get(':key/:value')
        async findByKey(@Param('key') key: string, @Param('value') value: any) {
            const result = (await this.contentService.findByKey(key, value))
            if (result) return result.toJson(); else return null
        }
        @Patch(':key/:value')
        async updateByKey(@Param('key') key: string, @Param('value') value: any, @Body() properties: ContentInterface) {
            const result = (await this.contentService.updateByKey(key, value, properties))
            if (result) return result.toJson(); else return null
        }
        @Delete(':key/:value')
        async deleteByKey(@Param('key') key: string, @Param('value') value: any) {
            await this.contentService.deleteByKey(key, value)
            return
        }


        // routes by query
        @Get('query')
        async findManyByKey(@Query() properties: ContentInterface) {
            const result = (await this.contentService.findManyByKey(properties))
            if (result) return result.toJson(); else return null
        }
        @Patch('query')
        async updateManyByKey(@Query() properties: ContentInterface, @Body() update: ContentDto) {
            const result = (await this.contentService.updateManyByKey(properties, update))
            if (result) return result.toJson(); else return null
        }
        @Delete('query')
        async deleteManyByKey(@Query() properties: ContentInterface) {
            await this.contentService.deleteManyByKey(properties)
            return
        }

        @Delete()
        async clear() {
            return await this.contentService.clear()
        }
    }
    return ContentControllerHost
}