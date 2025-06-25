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
				resource: ['server_types'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'Returns all existing Server Type objects.',
				action: 'Get all Server Types',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Returns a specific Server Type object.',
				action: 'Get a Server Type',
			},
		],
		default: 'list',
	},
	...list.description,
	...get.description,
];
