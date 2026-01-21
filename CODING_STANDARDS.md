# Coding Standards

This document defines coding standards and best practices for this ServiceNow project.

## General Principles

- Write clean, readable, and maintainable code
- Follow ServiceNow best practices
- Document complex logic
- Use consistent naming conventions
- Keep functions focused and single-purpose

## SOLID Principles

The SOLID principles are five design principles that help create maintainable, flexible, and robust software. These principles should be followed when designing classes, methods, and system architecture in ServiceNow.

### What are SOLID Principles?

SOLID is an acronym representing five object-oriented design principles:
- **S** - Single Responsibility Principle
- **O** - Open/Closed Principle
- **L** - Liskov Substitution Principle
- **I** - Interface Segregation Principle
- **D** - Dependency Inversion Principle

These principles help developers write code that is easier to understand, test, maintain, and extend.

### Single Responsibility Principle (SRP)

**Definition:** A class should have only one reason to change. Each class should have a single, well-defined responsibility.

**ServiceNow Application:**
- Each Script Include class should focus on one specific domain or concern
- Avoid creating "god classes" that handle multiple unrelated responsibilities
- Split large classes into smaller, focused classes

**Examples:**
- ❌ Bad: A `PizzaOrderService` that handles order creation, payment processing, email notifications, and reporting
- ✅ Good: 
  - `PizzaOrderService` - handles order creation and management
  - `PaymentProcessor` - handles payment processing
  - `NotificationService` - handles email/notification sending
  - `OrderReportGenerator` - handles reporting

### Open/Closed Principle (OCP)

**Definition:** Software entities (classes, modules, functions) should be open for extension but closed for modification.

**ServiceNow Application:**
- Design classes that can be extended through inheritance or composition without modifying existing code
- Use abstract base classes or interfaces to define contracts
- Allow new functionality to be added by creating new classes rather than modifying existing ones

**Examples:**
- ❌ Bad: Modifying `PizzaOrderService` every time a new pizza type is added
- ✅ Good: Create a base `Pizza` class and extend it with `PepperoniPizza`, `VeggiePizza`, etc., without modifying the base class

### Liskov Substitution Principle (LSP)

**Definition:** Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.

**ServiceNow Application:**
- Derived classes (subclasses) should be able to substitute their base classes without changing the correctness of the program
- Subclasses should not weaken the postconditions or strengthen the preconditions of the base class
- When extending Script Includes, ensure the child class can be used wherever the parent class is expected

**Examples:**
- ❌ Bad: A `PremiumOrderService` that extends `OrderService` but throws errors for methods that the base class handles successfully
- ✅ Good: `PremiumOrderService` extends `OrderService` and can handle all the same operations, potentially with additional features

### Interface Segregation Principle (ISP)

**Definition:** Clients should not be forced to depend on interfaces (or methods) they do not use. Many client-specific interfaces are better than one general-purpose interface.

**ServiceNow Application:**
- Create focused, specific interfaces rather than large, monolithic ones
- Classes should not be forced to implement methods they don't need
- Split large interfaces into smaller, more specific ones

**Examples:**
- ❌ Bad: A `DataService` interface with methods for database operations, file operations, API calls, and email sending - forcing all implementers to define all methods
- ✅ Good: Separate interfaces like `DatabaseService`, `FileService`, `ApiService`, and `EmailService` - classes implement only what they need

### Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

**ServiceNow Application:**
- Depend on abstractions (interfaces, abstract classes) rather than concrete implementations
- Use dependency injection where possible
- High-level business logic should not depend on low-level implementation details

**Examples:**
- ❌ Bad: `OrderService` directly instantiates `EmailNotificationService` and `DatabaseService`
- ✅ Good: `OrderService` depends on a `NotificationService` interface, which can be implemented by `EmailNotificationService`, `SMSNotificationService`, etc.

### Applying SOLID in ServiceNow

When creating Script Includes:
1. **Single Responsibility:** Each Script Include should handle one domain (e.g., `OrderService`, `CustomerService`, `PaymentService`)
2. **Open/Closed:** Design base classes that can be extended without modification
3. **Liskov Substitution:** Ensure child classes can replace parent classes without breaking functionality
4. **Interface Segregation:** Create focused, specific service classes rather than monolithic ones
5. **Dependency Inversion:** Depend on service abstractions rather than concrete implementations

## Naming Conventions

### Tables
- Table names must be **singular** (e.g., `pizza_order`, not `pizza_orders`)
- Use descriptive, clear names
- **For scoped apps:** Follow the scope prefix pattern: `x_mkmig_pizza_<table_name>` (e.g., `x_mkmig_pizza_pizza_order`)
- **For global scope:** There is no scope prefix; tables should have the prefix `u_` (e.g., `u_pizza_order`)

### Script Includes
- Use PascalCase for class names (e.g., `PizzaOrderService`)
- Use descriptive names that indicate purpose
- Suffix utility classes with appropriate terms (e.g., `Service`, `Helper`, `Util`)
- **For script includes in global scope, classes should be prefixed with 'mck'** (e.g., `mckPizzaOrderService`)
- **For scoped classes, there should be no prefix** (e.g., `PizzaOrderService`)

### Variables
- Use camelCase for variable names
- Use descriptive names (avoid abbreviations unless widely understood)
- Prefix boolean variables with `is`, `has`, `can`, etc. (e.g., `isActive`, `hasPermission`)
- **Variable names should be short (even a single letter) if they have a tiny scope, but should be long if they have a big scope**
  - ✅ Good (tiny scope): `for (var i = 0; i < orders.length; i++)` - single letter for loop counter
  - ✅ Good (tiny scope): `var order = orders[i]` - short name in small function
  - ✅ Good (big scope): `var pizzaOrderService = new PizzaOrderService()` - descriptive name for class-level variable
  - ✅ Good (big scope): `var customerDeliveryAddress = getAddress()` - descriptive name for widely-used variable

### Functions/Methods
- Use camelCase for function names
- Use verb-noun pattern (e.g., `createOrder`, `getUserOrders`, `updateStatus`)
- Be descriptive and clear about what the function does

## Code Structure

### Methods/Functions
- **Methods should be small, ideally 20-25 lines max**
- If necessary, it is acceptable to go beyond this limit, but consider refactoring into smaller, focused methods
- Each method should have a single, clear responsibility
- Break down complex methods into smaller helper methods
- **Method parameters should not be boolean - always use 2 methods, one for each boolean option**
  - ❌ Bad: `updateOrder(orderId, includeHistory)`
  - ✅ Good: `updateOrder(orderId)` and `updateOrderWithHistory(orderId)`
- **Methods should not have more than 3 parameters - if more are needed, combine them into an object**
  - ❌ Bad: `createOrder(pizzaType, quantity, size, customerName, address, phone, instructions)`
  - ✅ Good: `createOrder(orderData)` where `orderData = {pizzaType, quantity, size, customerName, address, phone, instructions}`
- **Command-Query Separation (CQS) should be followed - methods should either perform an action (command) or return data (query), but not both**
  - ❌ Bad: `var order = updateOrderStatus(orderId, 'delivered')` - modifies state AND returns data
  - ✅ Good: 
    - Command: `updateOrderStatus(orderId, 'delivered')` - modifies state, returns void or minimal confirmation
    - Query: `var order = getOrder(orderId)` - returns data, doesn't modify state
  - Commands modify state and typically return void or a simple success indicator
  - Queries return data and should not have side effects or modify state

### Script Includes
- Always include JSDoc comments for classes and methods
- Document parameters and return values
- Include error handling
- Use try-catch blocks for operations that might fail
- **Script Includes should contain the actual business logic and reusable code**

### Business Rules, Fix Scripts, REST APIs, and Similar Objects
- **Keep the actual definition/record of these objects as minimal as possible**
- **The actual code/logic should reside in Script Includes**
- Business rules, fix scripts, REST API scripts, etc. should primarily call methods from Script Includes
- This approach provides:
  - Better code reusability
  - Easier testing and debugging
  - Better version control and code organization
  - Improved maintainability

### Business Rules
- Keep business rules focused on a single purpose
- Add comments explaining complex logic
- Use descriptive names that indicate when they run
- **Call methods from Script Includes rather than implementing logic directly**

### Fix Scripts
- **Keep fix script definitions minimal**
- **Implement the actual fix logic in Script Includes**
- Call the Script Include method from the fix script

### REST APIs (Scripted REST APIs)
- **Keep REST API resource scripts minimal**
- **Implement the actual API logic in Script Includes**
- REST API scripts should primarily instantiate Script Include classes and call their methods

### Client Scripts
- Minimize client-side logic
- Prefer server-side processing when possible
- Use GlideAjax for server-side calls
- **For complex server-side operations, call Script Include methods via GlideAjax**

## ServiceNow-Specific Standards

### Scope Names
- **This section applies only to scoped apps**
- **Scope names must always be prefixed with 'x_mkmig'**
- **Scope names can be a maximum of 18 characters total** (including the 'x_mkmig' prefix)
- Example: `x_mkmig_pizza` (18 characters)
- **For global scope:** There is no scope name (global objects are not scoped)

### sys_id Values
- **sys_id values must be 32-character hexadecimal UUIDs and must be random**
- Never use sequential or predictable patterns for sys_id values in XML exports

### Reference Fields
- **Reference fields must be 32-character hexadecimal UUIDs and must reference existing records**
- Reference fields (like `opened_by`, `assigned_to`, etc.) should use the actual sys_id of an existing record, not random values

### Roles
- **This section applies only to scoped apps**
- **Roles in a scoped app must always be prefixed with 'app_'**
- Example: `x_mkmig_pizza.app_admin` instead of `x_mkmig_pizza.admin`
- **For global scope:** Roles follow standard ServiceNow naming conventions without the 'app_' prefix

### Tables
- **Table names are always singular, not plural**

## Documentation

### Code Comments
- **Comments in code are lies!** - Code should be self-documenting through clear naming and structure
- Avoid comments that explain "what" the code does - the code should speak for itself
- **Exceptions where comments are acceptable:**
  1. **Document public API** - JSDoc comments for public methods, classes, and interfaces
  2. **Warning of intent** - Explain "why" when the reason isn't obvious from the code
     - Example: `// Using legacy API due to compatibility requirements until Q2 migration`
  3. **Explain regex** - Complex regular expressions benefit from explanation
     - Example: `// Matches email format: user@domain.com`
- Prefer refactoring code to be clearer over adding comments
- If you need a comment to explain what code does, consider renaming variables/methods instead

### JSDoc Comments
- Document all public methods
- Include parameter types and descriptions
- Document return values
- Add usage examples for complex methods

## Error Handling

- Always handle errors gracefully
- Log errors appropriately (use `gs.error()` for errors, `gs.warn()` for warnings)
- Provide meaningful error messages
- Don't expose sensitive information in error messages

## Security

- Always validate user input
- Use ACLs to enforce security, don't rely on UI-only restrictions
- Never hardcode credentials or sensitive data
- Use system properties for configuration values

## Performance

- Avoid unnecessary queries
- Use GlideAggregate for counting/summarizing
- Limit query results when appropriate
- Cache frequently accessed data when possible

## Testing

- Test edge cases
- Test error conditions
- Verify ACLs work as expected
- Test with different user roles

## File Organization

- Keep related files together
- Use appropriate folder structure (tables, script-includes, business-rules, etc.)
- Name files descriptively

### Type Definitions

- **All custom TypeScript definition files should be consolidated in a single `types/project.d.ts` file**
- Place all project-specific type definitions in this single file for easier maintenance
- Include a reference to ServiceNow types at the top: `/// <reference types="servicenow" />`
- Configure `jsconfig.json` with `typeRoots` to include both `./types` and `./node_modules/@types`
- This organization keeps type definitions separate from source code, improves IDE support, and simplifies maintenance with a single file

---

*Add project-specific standards below as they are established*
