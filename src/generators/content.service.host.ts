import { Inject, Logger, Type } from "@nestjs/common";
import Neode from "neode";
import { Content } from "src/database";
import { DatabaseService } from "src/database/database.service";

export interface ContentServiceInterface<ContentInterface extends Content, ContentDto> {
    getDefinedRelationships(): Map<string, Neode.RelationshipType>
    make(properties: ContentDto): Promise<Neode.Node<unknown> | void>
    merge(value: string, properties?: ContentDto): Promise<Neode.Node<unknown> | void>
    findByPrimary(key: string): Promise<Neode.Node<unknown> | void>
    findById(id: number): Promise<Neode.Node<unknown> | void>
    findByKey(key: string, value: any): Promise<Neode.Node<unknown> | void>
    findManyByKey(query: ContentInterface): Promise<Neode.NodeCollection | void>
    updateByPrimary(key: string, properties: ContentInterface): Promise<Neode.Node<unknown> | void>
    updateById(id: number, properties: ContentInterface): Promise<Neode.Node<unknown> | void>
    updateByKey(key: string, value: any, properties: ContentInterface): Promise<Neode.Node<unknown> | void>
    updateManyByKey(query: ContentInterface, properties: ContentDto): Promise<Neode.NodeCollection | void>
    deleteByPrimary(key: string): Promise<void>
    deleteById(id: number): Promise<void>
    deleteByKey(key: string, value: any): Promise<void>
    deleteManyByKey(query: ContentInterface): Promise<void>
    getAll(): Promise<Neode.NodeCollection | void>
    clear(): Promise<void>
}

export function ContentServiceHost<ContentInterface extends Content, ContentDto>(model: string, index: keyof ContentInterface): Type<ContentServiceInterface<ContentInterface, ContentDto>> {
    class ContentServiceHost implements ContentServiceInterface<ContentInterface, ContentDto> {
        @Inject(DatabaseService) protected readonly databaseService: DatabaseService
        constructor() {

        }
        private readonly logger = new Logger(model + 'Service')
        
        getDefinedRelationships() {
            return this.databaseService.getDaddy().model(model).relationships()
        }
        async make(properties: ContentDto): Promise<Neode.Node<ContentInterface>> {
            this.logger.log(`Making ${model.toLowerCase()} with properties:
            ${JSON.stringify(properties)}`)
            return await this.databaseService.make(model, properties) as Neode.Node<ContentInterface>
        }

        async merge(value: string, properties: ContentDto): Promise<Neode.Node<ContentInterface>> {
            this.logger.log(`Merging ${model.toLowerCase()}: ${value} with properties:
            ${JSON.stringify(properties)}`)
            return await this.databaseService.merge(model, { [index]: value, ...properties }) as Neode.Node<ContentInterface>
        }

        async findByPrimary(key: string): Promise<Neode.Node<ContentInterface>>  {
            const found = await this.databaseService.findByPrimary(model, key)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with primary key "${key}"`)
                return found as Neode.Node<ContentInterface>
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
                return found as Neode.Node<ContentInterface>
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
                return found as Neode.Node<ContentInterface>
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with ${key} "${value}"`)
                return null
            }
        }

        async findManyByKey(query: ContentInterface) {
            const found = await this.databaseService.findManyByKey(model, query)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with properties:
                ${JSON.stringify(query)}`)
                return found
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with properties:
                ${JSON.stringify(query)}`)
                return null
            }
        }

        async updateByPrimary(key: string, properties: ContentInterface) {
            const found = await this.databaseService.findByPrimary(model, key)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with primary key "${key}"`)
                this.logger.log(`Updating with properties:
                ${JSON.stringify(properties)}`)
                return await found.update(properties) as Neode.Node<ContentInterface>
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with primary key "${key}"`)
                return null
            }
        }
        async updateById(id: number, properties: ContentInterface) {
            const found = await this.databaseService.findById(model, id)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with id "${id}"`)
                this.logger.log(`Updating with properties:
                ${JSON.stringify(properties)}`)
                return await found.update(properties) as Neode.Node<ContentInterface>
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with id "${id}"`)
                return null
            }
        }
        async updateByKey(key: string, value: any, properties: ContentInterface) {
            const found = await this.databaseService.findByKey(model, key, value)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with ${key} "${value}"`)
                this.logger.log(`Updating with properties:
                ${JSON.stringify(properties)}`)
                return await found.update(properties) as Neode.Node<ContentInterface>
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with ${key} "${value}"`)
                return null
            }
        }
        async updateManyByKey(query: ContentInterface, properties: ContentDto) {
            const found = await this.databaseService.findManyByKey(model, properties)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with properties:
                ${JSON.stringify(query)}`)
                this.logger.log(`Updating with properties:
                ${JSON.stringify(properties)}`)
                 found.map(async (item) => {
                    await item.update(properties)
                })
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with properties:
                ${JSON.stringify(query)}`)
                return null
            }
        }

        async deleteByPrimary(key: string) {
            const found = await this.databaseService.findByPrimary(model, key)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with primary key "${key}"`)
                return
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with primary key "${key}"`)
                return null
            }
        }
        async deleteById(id: number) {
            const found = await this.databaseService.findById(model, id)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with id "${id}"`)
                return
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with id "${id}"`)
                return null
            }
        }
        async deleteByKey(key: string, value: any) {
            const found = await this.databaseService.findByKey(model, key, value)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with ${key} "${value}"`)
                return
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with ${key} "${value}"`)
                return null
            }
        }
        async deleteManyByKey(query: ContentInterface) {
            const found = await this.databaseService.findManyByKey(model, query)
            if (found) {
                this.logger.log(`Found ${model.toLowerCase()} with properties:
                ${JSON.stringify(query)}`)
                return found.forEach(async (item) => {
                    await item.delete()
                })
            }
            else {
                this.logger.error(`Could not find ${model.toLowerCase()} with properties:
                ${JSON.stringify(query)}`)
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