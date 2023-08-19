import neo4j, { Driver, EagerResult, RecordShape, Session } from 'neo4j-driver';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as Neode from 'neode';
import { Beep, User, Sheet, Sauce } from '../content/models';
import { Content } from './interfaces/content.interface';


@Injectable()
export class DatabaseService {
    private instance: Neode
    constructor() {
        const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
        this.instance = new Neode(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD).with({
            Beep,
            User,
            Sheet,
            Sauce
        })
    }
    public getDaddy() {
        return this.instance;
    }
    public readScript(data: string): string {
        return fs.readFileSync(join(process.cwd() + data + ".cyp"), {encoding: 'utf8'});    
    }
    public async read(query: string, parameters?: { [key: string]: any }): Promise<any> {
        return await this.instance.readCypher(query, parameters).catch((e) => { console.log(e) })
    }
    public async run(query: string, parameters?: { [key: string]: any }): Promise<any> {
        return await this.instance.writeCypher(query, parameters).catch((e) => { console.log(e) })
    }
    public try(query: string, parameters?: { [key: string]: any }): any {
        return this.instance.session().run(query, parameters).catch((e) => { console.log(e) })
    }
    public async make<ContentInterface>(model: string, properties: { [key: string]: any }) {
        return await this.instance.create(model, properties).catch((e) => { console.log(e) })
    }
    public async getAll(model: string) {
        return await this.instance.all(model).catch((e) => { console.log(e) })
    }
    public async findByPrimary(model: string, key: string) {
        return await this.instance.find(model, key).catch((e) => { console.log(e) })
    }
    public async findById(model: string, id: number) {
        return await this.instance.findById(model, id).catch((e) => { console.log(e) })
    }
    public async findByKey(model: string, key: string, value: any) {
        return await this.instance.first(model, key, value).catch((e) => { console.log(e) })
    }
    public async findManyByKey(model: string, properties: { [key: string]: any }) {
        return await this.instance.all(model, properties).catch((e) => { console.log(e) })
    }
    public async clear(model: string) {
        return await this.instance.deleteAll(model).catch((e) => { console.log(e) })
    }
    public async merge(model: string, properties: { [key: string]: any } = {}) {
        return await this.instance.merge(model, properties).catch((e) => { console.log(e) })
    }
}
