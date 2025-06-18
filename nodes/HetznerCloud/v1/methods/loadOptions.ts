import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { helpPaginate } from '../Utils';

//import { getTableColumns, seaTableApiRequest, updateAble } from '../GenericFunctions';
//import type { IRow } from '../actions/Interfaces';

export async function getServers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/servers`,
		json: true,
	};
	let results = await helpPaginate(this, 'hcloud', options, new Array<any>(), 'servers');
	if (results) {
		for (const server of results) {
			returnData.push({
				name: server.name,
				value: server.id,
			});
		}
	}
	return returnData;
}

export async function getFirewalls(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/firewalls`,
		json: true,
		timeout: 2000,
	};
	let results = await helpPaginate(this, 'hcloud', options, new Array<any>(), 'firewalls');
	if (results) {
		for (const firewall of results) {
			returnData.push({
				name: firewall.name,
				value: firewall.id,
			});
		}
	}
	return returnData;
}

export async function getServertypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/server_types`,
		json: true,
		timeout: 2000,
	};

	const servertypelist = await this.helpers.requestWithAuthentication.call(
		this,
		'hcloud',
		options,
	);

	if (servertypelist.server_types) {
		for (const servertype of servertypelist.server_types) {
			returnData.push({
				name: servertype.description,
				value: servertype.name,
			});
		}
	}
	return returnData;
}

export async function getImages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	let options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/images`,
		json: true,
	};
	let results = await helpPaginate(this, 'hcloud', options, new Array<any>(), 'images');
	console.log('Pagination size: ', results.length);
	if (results) {
		for (const image of results) {
			returnData.push({
				name: image.description,
				value: image.name,
			});
		}
	}
	return returnData;
}

export async function getLocations(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	let options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/datacenters`,
		json: true,
	};
	let results = await helpPaginate(this, 'hcloud', options, new Array<any>(), 'datacenters');
	//	console.log('Pagination size: ', results.length);
	if (results) {
		for (const datacenter of results) {
			returnData.push({
				name: datacenter.location.description,
				value: datacenter.location.name,
			});
		}
	}
	return returnData;
}

export async function getVolumes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	let options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/volumes`,
		json: true,
	};
	let results = await helpPaginate(this, 'hcloud', options, new Array<any>(), 'volumes');
	//	console.log('Pagination size: ', results.length);
	if (results) {
		for (const volume of results) {
			returnData.push({
				name: volume.name,
				value: volume.id,
			});
		}
	}
	return returnData;
}
// https://api.hetzner.cloud/v1/datacenters

export async function getDatacenters(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	let options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/datacenters`,
		json: true,
	};
	let results = await helpPaginate(this, 'hcloud', options, new Array<any>(), 'datacenters');
	//	console.log('Pagination size: ', results.length);
	if (results) {
		for (const datacenter of results) {
			returnData.push({
				name: datacenter.description,
				value: datacenter.name,
			});
		}
	}
	return returnData;
}

export async function getSshkeys(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	let options: OptionsWithUri = {
		method: 'GET',
		qs: {},
		uri: `https://api.hetzner.cloud/v1/ssh_keys`,
		json: true,
	};
	let results = await helpPaginate(this, 'hcloud', options, new Array<any>(), 'ssh_keys');
	//	console.log('Pagination size: ', results.length);
	if (results) {
		for (const key of results) {
			returnData.push({
				name: key.name,
				value: key.id,
			});
		}
	}
	return returnData;
}

/*
export async function getTableNames(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	// this.getCurrentNodeParameter('viewName'); // das kommt vom trigger. Brauche ich das???
	const {
		metadata: { tables },
	} = await seaTableApiRequest.call(
		this,
		{},
		'GET',
		'/dtable-server/api/v1/dtables/{{dtable_uuid}}/metadata',
	);
	for (const table of tables) {
		returnData.push({
			name: table.name,
			value: table.name,
		});
	}
	return returnData;
}

export async function getTableNameAndId(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const {
		metadata: { tables },
	} = await seaTableApiRequest.call(
		this,
		{},
		'GET',
		'/dtable-server/api/v1/dtables/{{dtable_uuid}}/metadata',
	);
	for (const table of tables) {
		returnData.push({
			name: table.name,
			value: table.name + ':::' + table['_id'],
		});
	}
	return returnData;
}

export async function getSearchableColumns(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const tableName = this.getCurrentNodeParameter('tableName') as string;
	if (tableName) {
		const columns = await seaTableApiRequest.call(
			this,
			{},
			'GET',
			'/dtable-server/api/v1/dtables/{{dtable_uuid}}/columns',
			{},
			{ table_name: tableName },
		);
		for (const col of columns.columns) {
			if (
				col.type === 'text' ||
				col.type === 'long-text' ||
				col.type === 'number' ||
				col.type === 'single-select' ||
				col.type === 'email' ||
				col.type === 'url' ||
				col.type === 'rate' ||
				col.type === 'formula'
			) {
				returnData.push({
					name: col.name,
					value: col.name,
				});
			}
		}
	}
	return returnData;
}

export async function getLinkColumns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const table = this.getCurrentNodeParameter('tableName') as string;

	const tableName = table.split(':::')[0];
	const tableId = table.split(':::')[1];

	if (tableName) {
		const columns = await seaTableApiRequest.call(
			this,
			{},
			'GET',
			'/dtable-server/api/v1/dtables/{{dtable_uuid}}/columns',
			{},
			{ table_name: tableName },
		);
		for (const col of columns.columns) {
			if (col.type === 'link') {
				// make sure that the "other table id" is returned and not the same table id again.
				const otid =
					tableId !== col.data.other_table_id ? col.data.other_table_id : col.data.table_id;

				returnData.push({
					name: col.name,
					value: col.name + ':::' + col.data.link_id + ':::' + otid,
				});
			}
		}
	}
	return returnData;
}

export async function getAssetColumns(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const tableName = this.getCurrentNodeParameter('tableName') as string;
	if (tableName) {
		const columns = await seaTableApiRequest.call(
			this,
			{},
			'GET',
			'/dtable-server/api/v1/dtables/{{dtable_uuid}}/columns',
			{},
			{ table_name: tableName },
		);
		for (const col of columns.columns) {
			if (col.type === 'image' || col.type === 'file') {
				returnData.push({
					name: col.name,
					value: col.name + ':::' + col.type,
				});
			}
		}
	}
	return returnData;
}

export async function getSignatureColumns(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const tableName = this.getCurrentNodeParameter('tableName') as string;
	if (tableName) {
		// only execute if table is selected
		const columns = await seaTableApiRequest.call(
			this,
			{},
			'GET',
			'/dtable-server/api/v1/dtables/{{dtable_uuid}}/columns',
			{},
			{ table_name: tableName },
		);
		for (const col of columns.columns) {
			if (col.type === 'digital-sign') {
				// file+image are difficult: every time the row changes, all files trigger.
				returnData.push({
					name: col.name,
					value: col.name,
				});
			}
		}
	}
	return returnData;
}

export async function getTableUpdateAbleColumns(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const tableName = this.getNodeParameter('tableName') as string;
	let columns = await getTableColumns.call(this, tableName);

	// remove columns that could not be filled
	columns = updateAble(columns);

	return columns
		.filter((column) => column.editable)
		.map((column) => ({ name: column.name, value: column.name }));
}

export async function getRowIds(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const tableName = this.getNodeParameter('tableName') as string;
	const returnData: INodePropertyOptions[] = [];

	if (tableName) {
		const sqlResult = await seaTableApiRequest.call(
			this,
			{},
			'POST',
			'/dtable-db/api/v1/query/{{dtable_uuid}}/',
			{
				sql: `SELECT * FROM \`${tableName}\` LIMIT 1000`,
				convert_keys: false,
			},
		);
		let rows = sqlResult.results as IRow[];

		for (const row of rows) {
			returnData.push({
				name: row['0000'] + ' (' + row._id + ')',
				value: row._id,
			});
		}
	}
	return returnData;
}

export async function getTableViews(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const tableName = this.getCurrentNodeParameter('tableName') as string;
	if (tableName) {
		// only execute if table is selected, to avoid unnecessary API requests
		const { views } = await seaTableApiRequest.call(
			this,
			{},
			'GET',
			'/dtable-server/api/v1/dtables/{{dtable_uuid}}/views',
			{},
			{ table_name: tableName },
		);
		returnData.push({
			name: '<Do not limit to a view>',
			value: '',
		});
		for (const view of views) {
			returnData.push({
				name: view.name,
				value: view.name,
			});
		}
	}
	return returnData;
}
*/
