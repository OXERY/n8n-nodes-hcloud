import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { OptionsWithUri } from 'request';

export async function get(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as number;

	const uri: string = `https://api.hetzner.cloud/v1/datacenters/` + id;

	const options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: uri,
		json: true,
	};

	console.log(options);

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'hcloud',
		options,
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
