import type { ServerActionsProperties } from '../../Interfaces';

export const changeProtectionDescription: ServerActionsProperties = [
	{
		displayName: 'Server',
		name: 'id',
		type: 'options',
		placeholder: 'Select a server',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getServers',
		},
		displayOptions: {
			show: {
				resource: ['server_actions'],
				operation: ['change_protection'],
			},
		},
		default: '',
		description: 'ID of the Server.',
	},
	{
		displayName: 'Delete Protection',
		name: 'delete_protection',
		type: 'boolean',
		placeholder: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['server_actions'],
				operation: ['change_protection'],
			},
		},
		default: false,
		description:
			'If true, no deletion of the server is possible.',
	},
	{
		displayName: 'Rebuild Protection',
		name: 'rebuild_protection',
		type: 'boolean',
		placeholder: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['server_actions'],
				operation: ['change_protection'],
			},
		},
		default: false,
		description:
			'If true, no rebuild of the server is possible.',
	},
];
