# Playwright Common Harness Demo

## Overview

This project demonstrates the usage of a custom Playwright testing framework with reusable utilities and keywords. It showcases how to consume a GitHub package (`@ramam-v/common-pw`) and implement a base test fixture for robust test automation.

## Features

- 🚀 Custom Playwright Test Fixture
- 🧰 Reusable Keyword-Driven Testing Approach
- 🔍 Advanced Data Generation
- 📸 Integrated Screenshot Capabilities
- 🌐 Cross-Browser Testing Support

## Project Structure

```
pw-common-harness/
│
├── test/
│   ├── fixtures/
│   │   └── basePage.ts     # Base test fixture
│   │
│   ├── pages/
│   │   ├── HomePage.ts     # Home page object
│   │   └── RegistrationPage.ts  # Registration page object
│   │
│   └── tests/
│       ├── demo.spec.ts    # Traditional test specification
│       └── demo-fixture.spec.ts  # Fixture-based tests
│
├── playwright.config.ts    # Playwright configuration
└── package.json            # Project dependencies
```

## Dependencies

- `@playwright/test`: Core testing framework
- `@ramam-v/common-pw`: Custom utility library

## Key Components

### Base Test Fixture (`basePage.ts`)

The base test fixture extends Playwright's test with:
- Common utilities
- Web keywords
- Page keywords
- Page objects

```typescript
export const test = base.extend<{
    cmn: CommonUtils;
    web: WebKeywords;
    pkey: PageKeywords;
    reg: RegistrationPage;
    home: HomePage;
}>({ ... });
```

### Page Objects

Custom page objects leverage keyword-driven approach:
- Utilize `WebKeywords` for interactions
- Use `PageKeywords` for navigation and screenshots
- Implement page-specific methods

### Data Generation

Utilizes `CommonUtils` for dynamic test data generation:
- Random name generation
- Date manipulation
- Unique ID creation

```typescript
// Example data generation
const testUser = {
    firstName: cmn.dataValueHandler('<FIRSTNAME>'),
    lastName: cmn.dataValueHandler('<LASTNAME>'),
    email: `${firstName.toLowerCase()}@example.com`
};
```

## Running Tests

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Execution

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test demo-fixture.spec.ts

# Run tests in UI mode
npx playwright test --ui
```

## Customization

- Modify `playwright.config.ts` to configure:
  - Browser settings
  - Parallel execution
  - Reporting

## Key Concepts

1. **Keyword-Driven Testing**: Abstracts low-level interactions
2. **Dynamic Data Generation**: Flexible test data creation
3. **Page Object Model**: Encapsulates page-specific logic
4. **Custom Fixture**: Dependency injection and test setup

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License

## Contact

For more information, please contact the repository owner.