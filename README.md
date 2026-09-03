# Geriatric Care Assessment Form

A polished, one-page frontend application designed for visiting nurses conducting in-home healthcare assessments for elderly patients (aged 60 and over). Built with React 19, TypeScript, Vite, Mantine v9, and Zod 4.

## Tech Stack

- **Framework & Language**: React 19, TypeScript, Vite
- **UI Library**: Mantine (`@mantine/core`, `@mantine/hooks`, `@mantine/dates`)
- **Form & Validation**: `@mantine/form`, `@mantine/form/schemaResolver`, Zod 4 (`zod`)
- **Testing**: Vitest, React Testing Library (`@testing-library/react`, `@testing-library/user-event`)
- **Date Handling**: `dayjs`

## Setup & Installation

Clone the repository and install dependencies using Yarn:

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

The application will be available at `http://localhost:5173`.

## Testing & Quality Checks

Run the individual testing or quality scripts:

```bash
# Run Vitest test suite
yarn vitest

# Run TypeScript typecheck
yarn typecheck

# Run linter checks
yarn lint

# Run code formatter check
yarn format:test
```

Run the complete test & verification suite (typecheck + format check + lint + vitest + production build):

```bash
yarn test
```

## Features

- **10-Field Clinical Assessment**: Captures MRN, patient name, date of birth, assessment date, mobility status, Barthel Index score, regular medication count, pharmacist review request, next review date, and patient consent.
- **Strict Zod 4 Schema Validation**: Validates all field formats and constraints without raw or duplicated validation logic in JSX.
- **Cross-Field Refinements**:
  - **Age Requirement**: Patient must be $\ge 60$ years old relative to the `assessmentDate`.
  - **Follow-up Date**: Next review date must be strictly after the `assessmentDate`.
  - **Polypharmacy Rule**: 5 or more regular medications requires pharmacist review request.
- **Form & Blur Validation**: Uses `@mantine/form` with `schemaResolver(assessmentSchema)` validating on blur and on submit. Quiet untouched fields.
- **Sample Patient Loader**: Pre-populates valid fictional patient data (`Sushila Deshpande`) with clear error reset.
- **Simulated Save**: Simulates an 800ms asynchronous save action with loading state on the submit button.
- **Parsed Result Display**: Displays Zod-parsed output in a formatted Mantine `Code` block inside a success alert upon successful save.

## Assumptions & Implementation Decisions

1. **Initial Form State Typing (`AssessmentFormValues`)**: Initial empty form fields (`barthelIndex: ''`, `medicationCount: ''`, `mobility: ''`) use an input shape type (`AssessmentFormValues`), ensuring that valid form submissions output the parsed `Assessment` type (`z.infer<typeof assessmentSchema>`) cleanly through `schemaResolver`.
2. **Date Handling**: Form dates use standard ISO strings (`YYYY-MM-DD`) compatible with `z.iso.date()` and `@mantine/dates` `DateInput`.
3. **Dynamic Mobility Options**: Select dropdown options for mobility are dynamically mapped from the `MOBILITY` tuple with title-casing (`cane` $\rightarrow$ "Cane"), ensuring added options automatically appear without manual UI edits.
4. **Test Save Callback (`onSave`)**: `AssessmentForm` accepts an optional `onSave` prop and configurable `saveDelayMs` (defaulting to 800ms in UI, set to 0ms in RTL integration tests) for fast and reliable automated testing.

## Time Spent

Approximate time spent: ~1.5 hours

## Unfinished Work

None. All requirements, validations, UI structures, and tests are completely implemented and verified.
