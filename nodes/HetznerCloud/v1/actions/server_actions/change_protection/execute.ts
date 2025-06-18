import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { OptionsWithUri } from 'request';

export async function changeProtection(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as object;
	const delete_protection = this.getNodeParameter('delete_protection', index) as boolean;
	const rebuild_protection = this.getNodeParameter('rebuild_protection', index) as boolean;

	const options: OptionsWithUri = {
		method: 'POST',
		uri: `https://api.hetzner.cloud/v1/servers/` + id + '/actions/change_protection',
		qs: {},
		body: {
			delete: delete_protection,
			rebuild: rebuild_protection,
		},
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
