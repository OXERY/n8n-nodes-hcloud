import type { ServerActionsProperties } from '../../Interfaces';

export const disableBackupDescription: ServerActionsProperties = [
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
				operation: ['disable_backup'],
			},
		},
		default: '',
		description: 'ID of the Server.',
	},
];
