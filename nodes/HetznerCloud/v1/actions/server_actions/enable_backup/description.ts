import type { ServerActionsProperties } from '../../Interfaces';

export const enableBackupDescription: ServerActionsProperties = [
	{
		displayName: 'server id',
		name: 'id',
		type: 'options',
		required: true,
		placeholder: 'Select a server',
		typeOptions: {
			loadOptionsMethod: 'getServers',
		},
		displayOptions: {
			show: {
				resource: ['server_actions'],
				operation: ['enable_backup'],
			},
		},
		default: '',
		description: 'ID of the Server.',
	},
];
