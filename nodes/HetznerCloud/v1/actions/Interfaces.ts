import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type HetznerCloudMap = {
	image: 'list' | 'remove' | 'get' | 'update';
	server: 'list' | 'get' | 'metrics' | 'create' | 'remove' | 'update';
	primary_ip: 'list';
	floating_ip: 'list';
	firewall: 'list' | 'create' | 'remove' | 'update' | 'get';
	certificate: 'list' | 'get' | 'create';
	loadbalancer: 'list';
	network: 'list' | 'create' | 'remove' | 'update' | 'get';
	ssh: 'list' | 'get' | 'remove' | 'update' | 'create';
	volume: 'list' | 'create' | 'remove' | 'get';
	server_actions:
		| 'create_image'
		| 'power_off'
		| 'power_on'
		| 'soft_reboot'
		| 'shutdown'
		| 'reset'
		| 'change_server_type'
		| 'enable_backup'
		| 'disable_backup'
		| 'change_protection';
	datacenter: 'list' | 'get';
	server_types: 'list' | 'get';
};

export type HetznerCloud = AllEntities<HetznerCloudMap>;

export type HetznerCloudImage = Entity<HetznerCloudMap, 'image'>;
export type HetznerCloudServer = Entity<HetznerCloudMap, 'server'>;
export type HetznerCloudPrimaryIP = Entity<HetznerCloudMap, 'primary_ip'>;
export type HetznerCloudFloatingIP = Entity<HetznerCloudMap, 'floating_ip'>;
export type HetznerCloudFirewall = Entity<HetznerCloudMap, 'firewall'>;
export type HetznerCloudCertificate = Entity<HetznerCloudMap, 'certificate'>;
export type HetznerCloudLoadbalancer = Entity<HetznerCloudMap, 'loadbalancer'>;
export type HetznerCloudNetwork = Entity<HetznerCloudMap, 'network'>;
export type HetznerCloudssh = Entity<HetznerCloudMap, 'ssh'>;
export type HetznerCloudVolume = Entity<HetznerCloudMap, 'volume'>;
export type HetznerCloudServerActions = Entity<HetznerCloudMap, 'server_actions'>;
export type HetznerCloudDatacenter = Entity<HetznerCloudMap, 'datacenter'>;
export type HetznerCloudServerType = Entity<HetznerCloudMap, 'server_types'>;

export type ImageProperties = PropertiesOf<HetznerCloudImage>;
export type ServerProperties = PropertiesOf<HetznerCloudServer>;
export type PrimaryIPProperties = PropertiesOf<HetznerCloudPrimaryIP>;
export type FloatingIPProperties = PropertiesOf<HetznerCloudFloatingIP>;
export type FirewallProperties = PropertiesOf<HetznerCloudFirewall>;
export type CertificateProperties = PropertiesOf<HetznerCloudCertificate>;
export type loadbalancerProperties = PropertiesOf<HetznerCloudLoadbalancer>;
export type networkProperties = PropertiesOf<HetznerCloudNetwork>;
export type sshProperties = PropertiesOf<HetznerCloudssh>;
export type volumeProperties = PropertiesOf<HetznerCloudVolume>;
export type ServerActionsProperties = PropertiesOf<HetznerCloudServerActions>;
export type DatacenterProperties = PropertiesOf<HetznerCloudDatacenter>;
export type ServerTypeProperties = PropertiesOf<HetznerCloudServerType>;

export interface rules {
	rulesValues: {
		protocol: string;
		direction: string;
		port?: string;
		destination_ips?: string;
		source_ips?: string;
		description?: string;
	};
}
