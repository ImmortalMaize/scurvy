import { Inject, Type } from "@nestjs/common";
import Neode, { SchemaObject } from "neode";
import { Content } from "src/database";
import { DatabaseService } from "src/database/database.service";

export interface ContentServiceInterface<ContentInterface extends Content, ContentDto> {
    make(properties: ContentDto): Promise<Neode.Node<unknown>|void>
    merge(value: any): Promise<Neode.Node<unknown>|void>
    findByPrimary(key: string): Promise<Neode.Node<unknown>|void>
    findById(id: number): Promise<Neode.Node<unknown>|void>
    findByKey(key: string, value: any): Promise<Neode.Node<unknown>|void>
    findManyByKey(properties: { [key: string]: any }): Promise<Neode.NodeCollection|void>
    getAll(): Promise<Neode.NodeCollection|void>
    clear(): Promise<void>
}

export function ContentServiceHost<ContentInterface extends Content, ContentDto>(model: string, index: keyof ContentInterface): Type<ContentServiceInterface<ContentInterface, ContentDto>> {
    class ContentServiceHost implements ContentServiceInterface<ContentInterface, ContentDto> {
        @Inject(DatabaseService) protected readonly databaseService: DatabaseService
        
        async make(properties: ContentDto) {
         return await this.databaseService.make(model, properties)
        }

        async merge(value: any) {
            return await this.databaseService.merge(model, { [index]: value })
        }

        async findByPrimary(key: string) {
            return await this.databaseService.findByPrimary(model, key)
        }

        async findById(id: number) {
            return await this.databaseService.findById(model, id)
        }
        async findByKey(key: string, value: any) {
            return await this.databaseService.findByKey(model, key, value)
        }

        async findManyByKey(properties: { [key: string]: any }) {
            return await this.databaseService.findManyByKey(model, properties)
        }

        async getAll() {
           return await this.databaseService.getAll(model) 
        }

        async clear() {
            return await this.databaseService.clear(model)
        }


    }
    return ContentServiceHost
}