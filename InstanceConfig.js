/**
 * InstanceConfig - Manages instance-specific configuration properties.
 * 
 * This class provides access to configuration properties for a ServiceNow instance,
 * with support for instance-specific overrides and default values.
 * 
 * @class InstanceConfig
 * @example
 * var config = new InstanceConfig();
 * var propertyValue = config.getKey('property_key');
 * var instanceName = config.getName();
 */
var InstanceConfig = Class.create();

InstanceConfig.prototype = {

    /**
     * Initializes the InstanceConfig instance.
     * 
     * Retrieves the instance name from system properties and loads the corresponding
     * instance record from the database.
     * 
     * @method initialize
     */
    initialize: function() {
        this.instanceId = gs.getProperty("instance_name");
        this.instance = new GlideRecord("x_448357_instanc_0_instance");
        this.instance.get('name', this.instanceId);
    },

    /**
     * Gets the name of the current instance.
     * 
     * @method getName
     * @returns {string} The name of the instance, or null if not found
     * @example
     * var config = new InstanceConfig();
     * var name = config.getName();
     */
    getName: function() {
        return this.instance.getValue('name');
    },

    /**
     * Gets a configuration property value.
     * 
     * First attempts to retrieve an instance-specific value. If no instance-specific
     * value is found, returns the default value for the property.
     * 
     * @method getKey
     * @param {string} key - The property key to retrieve
     * @returns {string} The property value, or null if not found
     * @example
     * var config = new InstanceConfig();
     * var propertyValue = config.getKey('property_key');
     */
    getKey: function(key) {
        var value = this._lookup(key);
        if (value !== null) {
            return value;
        }

        return this._getDefault(key);
    },

    /**
     * Looks up an instance-specific property value.
     * 
     * @private
     * @method _lookup
     * @param {string} key - The property key to lookup
     * @returns {string|null} The instance-specific property value, or null if not found
     */
    _lookup: function(key) {
        var property = new GlideRecord('x_448357_instanc_0_property_scope');
        property.addQuery('instance', this.instance.getUniqueValue());
        property.addQuery('property.key', key);
        property.query();
        
        if (property.hasNext()) {
            property.next();
            return property.getValue('value');
        }
        
        return null;
    },

    /**
     * Gets the default value for a property.
     * 
     * @private
     * @method _getDefault
     * @param {string} key - The property key to retrieve the default value for
     * @returns {string|null} The default property value, or null if not found
     */
    _getDefault: function(key) {
        var property = new GlideRecord('x_448357_instanc_0_property');
        property.addQuery('key', key);
        property.query();
        
        if (property.hasNext()) {
            property.next();
            return property.getValue('default_value');
        }

        return null;
    },

    type: 'InstanceConfig'
};