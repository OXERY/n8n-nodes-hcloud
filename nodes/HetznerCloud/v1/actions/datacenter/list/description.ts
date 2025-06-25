import type { DatacenterProperties } from '../../Interfaces';

export const listDescription: DatacenterProperties = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'Datacenter name',
				name: 'name',
				type: 'string',
				placeholder: '',
				required: false,
				default: '',
				description:
					'Can be used to filter resources by their name. The response will only contain the resources matching the specified name.',
			},
			{
				displayName: 'Sort by',
				name: 'sort',
				type: 'options',
				options: [
					{
						name: 'id (asc)',
						value: 'id:asc',
					},
					{
						name: 'id (desc)',
						value: 'id:desc',
					},
					{
						name: 'name (asc)',
						value: 'name:asc',
					},
					{
						name: 'name (desc)',
						value: 'name:desc',
					},
				],
				default: '',
				required: false,
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
				resource: ['datacenter'],
				operation: ['list'],
			},
		},
	},
];
