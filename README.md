# Aria UI

Aria NFT Marketplace and Social Marketing Platform

## Contributing

The preferred package manager is [PNPM](https://pnpm.js.org/en/), so go ahead and [install](https://pnpm.io/installation) it.

Later, install this repo's dependencies...

```bash
pnpm install
```

### Development build

To start a development build (e.g. with file watching and live-reload) run `pnpm dev`.

Mocking is supported (server side & client side) using [MSW](https://mswjs.io) and can be enabled by using the `API_MOCKING` environment variable.

### Storybook

To use storybook as a component development environment run `pnpm storybook`.
Make sure that `./.svelte-kit/dev/runtime/app` path exists. If not, run `pnpm build` first.

### Formatting

To enforce a common style guide we use [Prettier](https://prettier.io).

In order to format all files, run `pnpm format`.

### Linting

To check your code, run `pnpm lint` and `pnpm check`.

### Testing

To test your code and generate coverage reports in `/coverage` directory, run `pnpm test`.

To run tests in watch mode, run `pnpm tdd`.

### E2E

We use [Cypress](https://www.cypress.io) to create the e2e tests. You can leverage all available commands through `pnpm cypress`.

To run E2E tests from the CLI without the GUI, run `pnpm e2e`.

### Production build

To build a specific project for production, run `pnpm build my-project`.

> You can preview the built app with `pnpm preview`.

| Project  | Development                   |
| -------- | ----------------------------- |
| aria     | https://dev.ariaexchange.com  |
| infinite | https://dev.infiniteworld.com |

### Commit Message Guidelines

We follow the [Conventional Commits specification](https://www.conventionalcommits.org).

In general, the commit message should follow the following format:

```
type(scope): summary
BLANK LINE
body (optional)
BLANK LINE
Closes #ISSUE_NUMBER
```

Use the "summary" field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
