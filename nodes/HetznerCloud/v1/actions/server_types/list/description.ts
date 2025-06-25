import type { ServerTypeProperties } from '../../Interfaces';

export const listDescription: ServerTypeProperties = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Server Type name',
				name: 'name',
				type: 'string',
				placeholder: '',
				required: false,
				default: '',
				description:
					'Can be used to filter resources by their name. The response will only contain the resources matching the specified name.',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				required: false,
				default: '1',
				typeOptions: {
					minValue: 1,
					numberStepSize: 1,
					numberPrecision: 0,
				},
				description: 'Page to load.',
			},
			{
				displayName: 'Per Page',
				name: 'per_page',
				type: 'number',
				required: false,
				default: '25',
				typeOptions: {
					minValue: 1,
					numberStepSize: 1,
					numberPrecision: 0,
				},
				description: 'Items to load per page.',
			},
		],
		displayOptions: {
			show: {
				resource: ['server_types'],
				operation: ['list'],
			},
		},
	},
];
