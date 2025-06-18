import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { OptionsWithUri } from 'request';

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;
	const options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: 'https://api.hetzner.cloud/v1/firewalls/' + id,
		json: true,
	};
	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'hcloud',
		options,
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
