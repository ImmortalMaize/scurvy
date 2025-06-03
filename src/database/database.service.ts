import neo4j, { Driver, EagerResult, QueryResult, Record, RecordShape, Session } from 'neo4j-driver';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as Neode from 'neode';
import { Beep, User, Sheet, Sauce, Creq } from '../content/models';
import { Content } from './interfaces/content.interface';


@Injectable()
export class DatabaseService {

    private instance: Neode
    private readonly logger: Logger = new Logger('DatabaseService')
    constructor() {
        const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
        this.instance = new Neode(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD, undefined, undefined, {
            "disableLosslessIntegers": true
        }).with({
            Beep,
            User,
            Sheet,
            Sauce,
            Creq
        })
        
    }
    public getDaddy() {
        return this.instance;
    }
    public readScript(data: string): string {
        return fs.readFileSync(join(process.cwd() + data + ".cyp"), {encoding: 'utf8'});    
    }
    public async read(query: string, parameters?: { [key: string]: any }): Promise<QueryResult> {
        return await this.instance.cypher(query, parameters).catch((e) => {
            this.logger.error(e)
            throw new HttpException("Could not read query", 400)
        }) as unknown as QueryResult<RecordShape>
    }
    public table(result: QueryResult) {
        const { records } = result
        const table = records.map(record => {
            const row = {}
            for (const key of record.keys) {
                row[key] = record.get(key)
            }
            return row
        })
        return table
    }
    
    public async run(query: string, parameters?: { [key: string]: any }): Promise<any> {
        return await this.instance.writeCypher(query, parameters).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not run query", 400)
        })
    }
    public try(query: string, parameters?: { [key: string]: any }): any {
        return this.instance.session().run(query, parameters).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not run query", 400)
        })
    }
    public async make<ContentInterface>(model: string, properties: { [key: string]: any }) {
        return await this.instance.create(model, properties).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not create " + model.toLowerCase() + "s", 400)
        })
    }
    public async getAll(model: string) {
        return await this.instance.all(model).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not get all" + model.toLowerCase() + "s", 400)
        })
    }
    public async findByPrimary(model: string, key: string) {
        return await this.instance.find(model, key).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not find " + model.toLowerCase() + " with primary key " + key, 404)
        })
    }
    public async findById(model: string, id: number) {
        return await this.instance.findById(model, id).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not find " + model.toLowerCase() + " with id " + id, 404)
        })
    }
    public async findByKey(model: string, key: string, value: any) {
        return await this.instance.first(model, key, value).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not find " + model.toLowerCase() + " with " + key + " " + value, 404)
        })
    }
    public async findManyByKey(model: string, properties: { [key: string]: any }) {
        return await this.instance.all(model, properties).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not find " + model.toLowerCase() + " with properties: " + JSON.stringify(properties), 404)
        })
    }
    public async clear(model: string) {
        return await this.instance.deleteAll(model).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not clear " + model.toLowerCase() + "s", 400)
        })
    }
    public async merge(model: string, properties: { [key: string]: any } = {}) {
        return await this.instance.merge(model, properties).catch((e) => {
            this.logger.error(e)
            console.log(e)
            throw new HttpException("Could not merge " + model.toLowerCase() + " with indices: " + JSON.stringify(properties), 400)
        })
    }
}
