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
}