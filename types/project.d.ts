/// <reference types="servicenow" />

/**
 * Project-specific TypeScript definitions for ServiceNow Script Includes.
 * 
 * This file contains type definitions for custom classes and Script Includes
 * used in this ServiceNow project.
 */

/**
 * InstanceConfig - Manages instance-specific configuration properties.
 * 
 * This class provides access to configuration properties for a ServiceNow instance,
 * with support for instance-specific overrides and default values.
 * 
 * @example
 * ```typescript
 * var config = new InstanceConfig();
 * var propertyValue = config.getKey('property_key');
 * var instanceName = config.getName();
 * ```
 */
declare class InstanceConfig {
    /**
     * The instance ID retrieved from system properties.
     */
    instanceId: string;

    /**
     * The GlideRecord instance for the current instance configuration.
     */
    instance: servicenow.GlideRecord;

    /**
     * The type identifier for this class.
     */
    type: 'InstanceConfig';

    /**
     * Initializes the InstanceConfig instance.
     * 
     * Retrieves the instance name from system properties and loads the corresponding
     * instance record from the database.
     */
    initialize(): void;

    /**
     * Gets the name of the current instance.
     * 
     * @returns The name of the instance, or null if not found
     * 
     * @example
     * ```typescript
     * var config = new InstanceConfig();
     * var name = config.getName();
     * ```
     */
    getName(): string | null;

    /**
     * Gets a configuration property value.
     * 
     * First attempts to retrieve an instance-specific value. If no instance-specific
     * value is found, returns the default value for the property.
     * 
     * @param key - The property key to retrieve
     * @returns The property value, or null if not found
     * 
     * @example
     * ```typescript
     * var config = new InstanceConfig();
     * var propertyValue = config.getKey('property_key');
     * ```
     */
    getKey(key: string): string | null;
}
