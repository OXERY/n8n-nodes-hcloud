import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { OptionsWithUri } from 'request';

export async function power_on(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as object;

	const options: OptionsWithUri = {
		method: 'POST',
		uri: `https://api.hetzner.cloud/v1/servers/` + id + '/actions/poweron',
		json: true,
	};

	// console.log(options);

	const responseData = await this.helpers.requestWithAuthentication.call(
		this,
		'hcloud',
		options,
	);

	return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
