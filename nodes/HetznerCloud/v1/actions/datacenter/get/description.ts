import type { DatacenterProperties } from '../../Interfaces';

export const getDescription: DatacenterProperties = [
	{
		displayName: 'Datacenter Id',
		name: 'id',
		type: 'number',
		required: true,
		placeholder: '42',
		displayOptions: {
			show: {
				resource: ['datacenter'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The Id Of the Datacenter in the project to get',
	},
];
