# ServiceNow Instance Configuration

This project contains ServiceNow Script Includes for managing instance-specific configuration properties.

## Prerequisites

- Node.js and npm installed on your system
- Git installed

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd ServiceNow-Instance-Config
```

### 2. Install Dependencies

Install the required npm packages (TypeScript definitions for ServiceNow):

```bash
npm install
```

This will install:
- `@types/servicenow` - TypeScript definitions for ServiceNow OOTB classes

### 3. Project Structure

```
ServiceNow-Instance-Config/
├── InstanceConfig.js           # Main Script Include class
├── InstanceConfig_Test.js     # Test cases for InstanceConfig
├── mckMailHelper.js            # Mail helper utility
├── types/
│   └── project.d.ts           # TypeScript definitions for custom classes
├── jsconfig.json              # JavaScript/TypeScript configuration
├── package.json               # npm dependencies
└── CODING_STANDARDS.md        # Project coding standards
```

## Type Definitions

This project uses TypeScript definition files for better IDE support:

- **OOTB Types**: ServiceNow out-of-the-box types are installed via `@types/servicenow`
- **Custom Types**: Project-specific type definitions are in `types/project.d.ts`

The `jsconfig.json` file configures your IDE to recognize these type definitions, providing:
- IntelliSense/Autocomplete
- Type checking (optional)
- Better documentation and hover information

## Usage

### InstanceConfig

The `InstanceConfig` class provides access to instance-specific configuration properties:

```javascript
var config = new InstanceConfig();
var propertyValue = config.getKey('property_key');
var instanceName = config.getName();
```

## Development

### Running Tests

Test cases are located in `InstanceConfig_Test.js`. To run tests in ServiceNow:

```javascript
var test = new InstanceConfig_Test();
test.runAllTests();
```

### Code Standards

Please refer to `CODING_STANDARDS.md` for coding standards and best practices for this project.

## Contributing

1. Follow the coding standards outlined in `CODING_STANDARDS.md`
2. Write tests for new functionality
3. Update type definitions in `types/project.d.ts` when adding new classes
4. Ensure all code is properly documented with JSDoc comments
