import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from "@nestjs/websockets";
import { DatabaseService } from '../database/database.service';

@WebSocketGateway({ namespace: 'bot' })
export class BotGateway {
	constructor(private databaseService: DatabaseService) {}

	@SubscribeMessage('findBrokenNodes')
	async findBrokenNodes(@MessageBody() data: {
		label: string,
		property: string,
		index: string
	}): Promise<WsResponse<unknown>> {
		const { label, property, index } = data
		const script = `MATCH (n: ${label}) WHERE n.${property} IS NULL RETURN n.${index}`
		const indexes = this.databaseService.table(await this.databaseService.run(script)).map(i => i["n." + index])
		console.log(indexes)

		const event = "foundBrokenNodes"
		return { event, data: {
			label,
			property,
			indexes
		} }
	}

	@SubscribeMessage('fixBrokenNodes')
	async fixBrokenNodes(@MessageBody() data: {
		label: string,
		property: string,
		index: string
		toFix: {
			index: string
			value: string
		}[]
	}): Promise<WsResponse<unknown>> {
		const { toFix, label, property, index } = data
		console.log(toFix)
		for (const node of toFix) {
			if (node.value === null) {
			await this.databaseService.run(`
				MATCH (n: ${label} {${index}: ${node.index}})
				DETACH DELETE n
			`).then(() => console.log(node.index + " not found. Deleted."))
			} else {
			await this.databaseService.run(`
				MATCH (n: ${label} {${index}: ${node.index}})
				SET n.${property} = ${node.value}
				RETURN n
			`).then(() => console.log(node.index + " updated"))
		}
	}
		const event = "fixedBrokenNodes"
		return {
			event, data: null
		}
	}

	@SubscribeMessage('newCreq')
	async handleNewCreq(@MessageBody() data) {
		console.log(data)
	}

}