import type { ServerTypeProperties } from '../../Interfaces';

export const getDescription: ServerTypeProperties = [
	{
		displayName: 'Server Type Id',
		name: 'id',
		type: 'number',
		required: true,
		placeholder: '42',
		displayOptions: {
			show: {
				resource: ['server_types'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The Id Of the Server Type in the project to get',
	},
];
