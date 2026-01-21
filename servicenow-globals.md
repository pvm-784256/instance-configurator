# ServiceNow Globals

This file documents global variables and objects available in the ServiceNow platform.

**Note:** This current project is a scoped app, not a global app. The scope name is `x_448357_instanc_0`.

## Common Global Objects

### gs (GlideSystem)
- `gs.getUser()` - Get current user
- `gs.getUserID()` - Get current user ID
- `gs.getUserName()` - Get current user name
- `gs.getMessage()` - Get localized message
- `gs.log()` - Write to system log
- `gs.info()` - Write info message to log
- `gs.warn()` - Write warning message to log
- `gs.error()` - Write error message to log
- `gs.getProperty()` - Get system property
- `gs.getSession()` - Get current session
- `gs.hasRole()` - Check if user has role
- `gs.nil()` - Check if value is null or empty

### current (GlideRecord)
- Represents the current record in a script
- Available in: Business Rules, Client Scripts, UI Actions, etc.

### previous (GlideRecord)
- Represents the previous state of a record
- Available in: Business Rules (on update/delete)

### g_form (GlideForm)
- Client-side form object
- Available in: Client Scripts, UI Policies, Catalog Client Scripts

### g_list (GlideList2)
- List object for list views
- Available in: List scripts

### g_scratchpad
- Object for passing data between scripts
- Available in: Client Scripts, UI Actions

### g_processor
- Workflow processor object
- Available in: Workflow activities

### g_workflow
- Workflow object
- Available in: Workflow activities

### g_request
- Request object
- Available in: Script Includes, REST APIs

### g_response
- Response object
- Available in: REST APIs, Scripted REST APIs

## Global Classes

### GlideRecord
- Database query and manipulation
- `new GlideRecord('table_name')`

### GlideAggregate
- Aggregate queries
- `new GlideAggregate('table_name')`

### GlideDateTime
- Date and time operations
- `new GlideDateTime()`

### GlideDuration
- Duration calculations
- `new GlideDuration()`

### GlideUser
- User operations
- `gs.getUser()`

### GlideEmail
- Email operations
- `new GlideEmail()`

### GlideRecordUtil
- Record utilities
- Static methods for record operations

### GlideDBFunctionBuilder
- Database function builder
- `new GlideDBFunctionBuilder()`

## Notes

- **table names are always singular, not plural**
- **sys_id values must be 32-character hexadecimal UUIDs and must be random** - Never use sequential or predictable patterns for sys_id values in XML exports
- **Reference fields must be 32-character hexadecimal UUIDs and must reference existing records** - Reference fields (like `opened_by`, `assigned_to`, etc.) should use the actual sys_id of an existing record, not random values
- **Roles in a scoped app must always be prefixed with 'app_'** - Example: `x_mkmig_pizza.app_admin` instead of `x_mkmig_pizza.admin`
- **Method parameters should not be boolean - use separate methods instead** 
  - ❌ Bad: `sendEmail(userId, includeAttachments)` 
  - ✅ Good: `sendEmail(userId)` and `sendEmailWithAttachments(userId)`
- **When creating or updating a ServiceNow XML, follow these date field rules:**
  - **`sys_created_on` field**: Should be set to 'now' when creating a new XML record. This field must NOT be modified when updating an existing XML record.
  - **`sys_updated_on` field**: Should be set to the same value as `sys_created_on` when creating a new XML record. When updating an existing XML record, this field should be updated to reflect the modification time.
- **Add specific global variables and objects used in this project below**
- **Document any custom global objects or extensions**
- **Include usage examples for project-specific patterns**
