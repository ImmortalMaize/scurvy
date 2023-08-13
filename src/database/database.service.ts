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
        this.instance.model('Beep', Beep).relationship
    }
    public getDaddy() {
        return this.instance;
    }
    public readScript(data: string): string {
        return fs.readFileSync(join(process.cwd() + data + ".cyp"), {encoding: 'utf8'});    
    }
    public async read(query: string, parameters?: { [key: string]: any }): Promise<any> {
        return await this.instance.readCypher(query, parameters)
    }
    public async run(query: string, parameters?: { [key: string]: any }): Promise<any> {
        return (await this.instance.writeCypher(query, parameters))
    }
    public try(query: string, parameters?: { [key: string]: any }): any {
        return this.instance.session().run(query, parameters)
    }
    public async make<ContentInterface>(model: string, properties: { [key: string]: any }) {
        return await this.instance.create(model, properties) as Neode.Node<Content>
    }
    public async getAll(model: string) {
        return await this.instance.all(model)
    }
    public async findByPrimary(model: string, key: string) {
        return await this.instance.find(model, key)
    }
    public async findById(model: string, id: number) {
        return await this.instance.findById(model, id)
    }
    public async findByKey(model: string, key: string, value: any) {
        return await this.instance.first(model, key, value)
    }
    public async findManyByKey(model: string, properties: { [key: string]: any }) {
        return await this.instance.all(model, properties)
    }
    public async clear(model: string) {
        return await this.instance.deleteAll(model)
    }
    public async merge(model: string, properties: { [key: string]: any }) {
        return await this.instance.merge(model, properties)
    }
}
