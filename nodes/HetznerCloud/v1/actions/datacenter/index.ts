import * as list from './list';
import * as get from './get';
import type { INodeProperties } from 'n8n-workflow';

export { list, get };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['datacenter'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'Returns all existing Datacenter objects.',
				action: 'Get all Datacenters',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Returns a specific Datacenter object.',
				action: 'Get a Datacenter',
			},
		],
		default: 'list',
	},
	...list.description,
	...get.description,
];
