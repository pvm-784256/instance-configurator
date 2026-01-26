# Claude AI Assistant Instructions

## ⚠️ CRITICAL: Coding Standards Compliance

**YOU MUST ALWAYS OBEY THE CODING STANDARDS DEFINED IN `docs/coding-standards.md`**

When writing, reviewing, or refactoring code, you MUST:

1. **Read and follow** all guidelines in `docs/coding-standards.md`
2. **Apply SOLID principles** when designing classes and methods
3. **Follow naming conventions** exactly as specified:
   - Script Includes: PascalCase, no prefix for scoped classes, 'mck' prefix for global
   - Variables: camelCase, descriptive names
   - Methods: camelCase, verb-noun pattern
4. **Respect method design rules**:
   - No boolean parameters (use separate methods)
   - Maximum 3 parameters (use objects for more)
   - Command-Query Separation
   - Methods should be 20-25 lines max
5. **Include JSDoc documentation** for all public methods and classes
6. **Follow ServiceNow-specific standards**:
   - Table names are singular
   - Scope naming conventions
   - Reference field requirements
7. **Keep code in Script Includes** - Business Rules, Fix Scripts, REST APIs should call Script Include methods

## Before Writing Any Code

1. **Read `docs/coding-standards.md`** to understand the project's standards
2. **Check existing code** in the project to maintain consistency
3. **Verify naming conventions** match the standards
4. **Ensure proper documentation** with JSDoc comments

## When Refactoring

- Maintain compliance with coding standards
- Improve code quality while following established patterns
- Update documentation to match any changes
- Ensure all methods follow the size and parameter guidelines

## ServiceNow-Specific Guidelines

- Follow the `.cursorrules` file for sn-scriptsync workflow
- Use TypeScript definitions from `types/project.d.ts` and `@types/servicenow`
- Reference `docs/coding-standards.md` for ServiceNow-specific naming and structure rules

**Remember: The coding standards are not optional - they are mandatory for all code in this project.**
