/**
 * MCK_MailHelper - Sanitizes email addresses for non-production environments.
 * 
 * This class prevents accidental emails from being sent to real users in sub-production
 * environments by adding a ".test" suffix to email addresses. Emails in the whitelist
 * or from users in authorized groups are left unchanged.
 * 
 * @class MCK_MailHelper
 * @example
 * var mailHelper = new MCK_MailHelper();
 * var sanitizedEmails = mailHelper.addTestToAddresses(['user@company.com']);
 */
var MCK_MailHelper = Class.create();

MCK_MailHelper.prototype = {

    _emailModifier: '.test',
    emailRegex: /<([^>]*)>/i,

    /**
     * Initializes the MCK_MailHelper instance.
     * 
     * @method initialize
     */
    initialize: function() {},

    /**
     * Sanitizes email recipients by adding ".test" suffix when appropriate.
     * 
     * Processes a list of email addresses and applies sanitization rules:
     * - Emails in the whitelist property remain unchanged
     * - Emails from users in authorized groups remain unchanged
     * - All other emails have ".test" appended to prevent delivery
     * 
     * @method addTestToAddresses
     * @param {string[]} recipients - Array of email addresses to process
     * @returns {string} Comma-separated string of processed email addresses
     * @example
     * var mailHelper = new MCK_MailHelper();
     * var emails = ['john@company.com', 'jane@company.com'];
     * var result = mailHelper.addTestToAddresses(emails);
     */
    addTestToAddresses: function(recipients) {
        if (!recipients || recipients.length === 0) {
            return '';
        }

        var receivingAddresses = this._getReceivingAddresses();
        var receivingGroupIds = this._getReceivingGroupIds();
        var processedRecipients = [];

        for (var i = 0; i < recipients.length; i++) {
            var recipient = this._processRecipient(recipients[i], receivingAddresses, receivingGroupIds);
            processedRecipients.push(recipient);
        }

        return processedRecipients.join(',');
    },

    /**
     * Modifies an email address by appending ".test" to it.
     * 
     * If the email address is in the format "Name <email@domain.com>", only the
     * email address inside the angle brackets is modified.
     * 
     * @method modifyRecipient
     * @param {string} originalEmailAddress - The email address to be modified
     * @param {string} separatedEmail - The email address extracted from angle brackets
     * @returns {string} The modified email address
     * @example
     * var mailHelper = new MCK_MailHelper();
     * var modified = mailHelper.modifyRecipient('John Doe <john@company.com>', 'john@company.com');
     * // Returns: 'John Doe <john@company.test.com>'
     */
    modifyRecipient: function(originalEmailAddress, separatedEmail) {
        if (separatedEmail) {
            var modifiedEmailAddress = separatedEmail + this._emailModifier;
            return originalEmailAddress.replace(separatedEmail, modifiedEmailAddress);
        }
        
        return originalEmailAddress + this._emailModifier;
    },

    /**
     * Processes a single email recipient according to sanitization rules.
     * 
     * @private
     * @method _processRecipient
     * @param {string} userEmail - The email address to process
     * @param {string} receivingAddresses - Whitelist of email addresses (lowercase)
     * @param {string[]} receivingGroupIds - Array of group IDs for authorized users
     * @returns {string} The processed email address
     */
    _processRecipient: function(userEmail, receivingAddresses, receivingGroupIds) {
        var extractedEmail = this._extractEmailAddress(userEmail);
        
        if (this._shouldSkipModification(extractedEmail, receivingAddresses)) {
            return userEmail;
        }

        if (this._isUserInAuthorizedGroup(extractedEmail, receivingGroupIds)) {
            return userEmail;
        }

        return this.modifyRecipient(userEmail, extractedEmail);
    },

    /**
     * Extracts the email address from a string that may contain angle brackets.
     * 
     * @private
     * @method _extractEmailAddress
     * @param {string} emailString - Email string that may be in "Name <email>" format
     * @returns {string} The extracted email address
     */
    _extractEmailAddress: function(emailString) {
        var match = emailString.match(this.emailRegex);
        return match ? match[1] : emailString;
    },

    /**
     * Checks if an email address should skip modification.
     * 
     * @private
     * @method _shouldSkipModification
     * @param {string} emailAddress - The email address to check
     * @param {string} receivingAddresses - Whitelist of email addresses (lowercase)
     * @returns {boolean} True if the email should not be modified
     */
    _shouldSkipModification: function(emailAddress, receivingAddresses) {
        var isAlreadyModified = emailAddress.indexOf(this._emailModifier) !== -1;
        var isWhitelisted = receivingAddresses.indexOf(emailAddress.toLowerCase()) !== -1;
        
        return isAlreadyModified || isWhitelisted;
    },

    /**
     * Checks if a user with the given email is in any of the authorized groups.
     * 
     * @private
     * @method _isUserInAuthorizedGroup
     * @param {string} emailAddress - The email address to check
     * @param {string[]} receivingGroupIds - Array of group IDs to check
     * @returns {boolean} True if the user is in an authorized group
     */
    _isUserInAuthorizedGroup: function(emailAddress, receivingGroupIds) {
        var userRecord = new GlideRecord('sys_user');
        if (!userRecord.get('email', emailAddress)) {
            return false;
        }

        var user = gs.getUserByID(userRecord.getValue('sys_id'));
        if (!user) {
            return false;
        }

        for (var i = 0; i < receivingGroupIds.length; i++) {
            if (user.isMemberOf(receivingGroupIds[i])) {
                return true;
            }
        }

        return false;
    },

    /**
     * Gets the whitelist of receiving addresses from system properties.
     * 
     * @private
     * @method _getReceivingAddresses
     * @returns {string} Lowercase string of whitelisted addresses
     */
    _getReceivingAddresses: function() {
        var addresses = gs.getProperty('mck.email.subProdEmail.ReceivingAddresses');
        return addresses ? addresses.toLowerCase() : '';
    },

    /**
     * Gets the list of authorized group IDs from system properties.
     * 
     * @private
     * @method _getReceivingGroupIds
     * @returns {string[]} Array of group IDs
     */
    _getReceivingGroupIds: function() {
        var groupIds = gs.getProperty('mck.email.subProdEmail.ReceivingGroupIds');
        return groupIds ? groupIds.split(',') : [];
    },

    type: 'MCK_MailHelper'
};