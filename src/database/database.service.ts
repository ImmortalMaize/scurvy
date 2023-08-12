import neo4j, { Driver, EagerResult, RecordShape } from 'neo4j-driver';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as Neode from 'neode';
import Beep from '../beep/models/beep.model';
import User from '../user/models/user.model'
import Sheet from '../sheets/models/sheet.model';
import Sauce from '../sauce/models/sauce.model';


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
    public async readScript(data: string, parameters?: { [key: string]: any }): Promise<any> {
        const query = fs.readFileSync(join(process.cwd() + data + ".cyp"), {encoding: 'utf8'});    
        return await this.instance.cypher(query, parameters)
    }
    public async read(query: string, parameters?: { [key: string]: any }): Promise<any> {
        return await this.instance.cypher(query, parameters)
    }
    public async do(query: string, parameters?: { [key: string]: any }, get: "records"|"summary" = "records"): Promise<any> {
        return (await this.instance.cypher(query, parameters))[get]
    }
    public async make(label: string, properties: { [key: string]: any }) {
        return await this.instance.create(label, properties)
    }
    public async findByPriamry(model: string, key: number) {
        return await this.instance.find(model, key)
    }
    public async findById(model: string, id: number) {
        return await this.instance.find(model, id)
    }
    public async clear(model: string) {
        return await this.instance.deleteAll(model)
    }
    public async merge(model: string, properties: { [key: string]: any }) {
        return await this.instance.merge(model, properties)
    }
}
