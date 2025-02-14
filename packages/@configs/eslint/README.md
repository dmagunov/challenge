# `@configs/eslint`

Collection of internal eslint configurations.

## Usage

Exports the following configurations:

- `base` - for base/node projects
- `next` - for nextjs projects
- `react` - for react projects

To inspect the configuration of a package, run the following command:

```bash
pnpm -F <package> exec eslint --inspect-config .
```
