import { Inject, Logger, Type } from "@nestjs/common";
import Neode, { SchemaObject } from "neode";
import { Content } from "src/database";
import { DatabaseService } from "src/database/database.service";

export interface ContentServiceInterface<ContentInterface extends Content, ContentDto> {
    make(properties: ContentDto): Promise<Neode.Node<unknown> | void>
    merge(value: string, properties?: { [key: string]: any }): Promise<Neode.Node<unknown> | void>
    findByPrimary(key: string): Promise<Neode.Node<unknown> | void>
    findById(id: number): Promise<Neode.Node<unknown> | void>
    findByKey(key: string, value: any): Promise<Neode.Node<unknown> | void>
    findManyByKey(properties: { [key: string]: any }): Promise<Neode.NodeCollection | void>
    getAll(): Promise<Neode.NodeCollection | void>
    clear(): Promise<void>
}

export function ContentServiceHost<ContentInterface extends Content, ContentDto>(model: string, index: keyof ContentInterface): Type<ContentServiceInterface<ContentInterface, ContentDto>> {
    class ContentServiceHost implements ContentServiceInterface<ContentInterface, ContentDto> {
        @Inject(DatabaseService) protected readonly databaseService: DatabaseService
        private readonly logger = new Logger(model + 'Service')
        async make(properties: ContentDto) {
            return await this.databaseService.make(model, properties)
        }

        async merge(value: string, properties: { [key: string]: any } = {}) {
            this.logger.log(`Merging ${model.toLowerCase()} with "${value}" as ${index.toString()}.`)
            const merged = await this.databaseService.merge(model, { [index]: value })
            if (merged) {
                this.logger.log(`Updating with properties:
                ${JSON.stringify(properties)}`)
                return await merged.update(properties)
            }
            else return null
        }

        async findByPrimary(key: string) {
            const found = await this.databaseService.findByPrimary(model, key)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with primary key "${key}"`)
                return found
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with primary key "${key}"`)
                return null
            }
        }

        async findById(id: number) {
            const found = await this.databaseService.findById(model, id)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with id "${id}"`)
                return found
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with id "${id}"`)
                return null
            }
        }
        async findByKey(key: string, value: any) {
            const found = await this.databaseService.findByKey(model, key, value)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with ${key} "${value}"`)
                return found
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with ${key} "${value}"`)
                return null
            }
        }

        async findManyByKey(properties: { [key: string]: any }) {
            const found = await this.databaseService.findManyByKey(model, properties)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with properties:
                ${JSON.stringify(properties)}`)
                return found
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with properties:
                ${JSON.stringify(properties)}`)
                return null
            }
        }

        async getAll() {
            const found = await this.databaseService.getAll(model)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()}s.`)
                return found
            }
            else {
                this.logger.error(`Could not find any ${model.toLowerCase()}s.`)
                return null
            }
        }

        async clear() {
            this.logger.log(`Clearing all ${model.toLowerCase()}s.`)
            return await this.databaseService.clear(model)
        }


    }
    return ContentServiceHost
}