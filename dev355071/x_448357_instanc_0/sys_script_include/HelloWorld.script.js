/**
 * HelloWorld - A simple Hello World Script Include example.
 * 
 * This class demonstrates a basic ServiceNow Script Include structure
 * following coding standards and best practices.
 * 
 * @class HelloWorld
 * @example
 * var hello = new HelloWorld();
 * var message = hello.getGreeting();
 */
var HelloWorld = Class.create();

HelloWorld.prototype = {

    /**
     * Initializes the HelloWorld instance.
     * 
     * @method initialize
     */
    initialize: function() {
    },

    /**
     * Returns a greeting message.
     * 
     * @method getGreeting
     * @returns {string} A greeting message
     * @example
     * var hello = new HelloWorld();
     * var message = hello.getGreeting();
     */
    getGreeting: function() {
        return 'Hello, World!';
    },

    type: 'HelloWorld'
};
