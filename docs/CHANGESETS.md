# Changesets Workflow

This project uses [Changesets](https://github.com/changesets/changesets) to manage versions and publishing.

## Quick Start

### 1. Make your changes

```bash
git checkout -b feature/my-feature
# ... make your changes ...
```

### 2. Create a changeset

```bash
pnpm changeset
```

Select the change type:

- **patch**: Bug fixes (0.1.4 → 0.1.5)
- **minor**: New features (0.1.4 → 0.2.0)
- **major**: Breaking changes (0.1.4 → 1.0.0)

Write a clear summary of your changes.

### 3. Commit and push

```bash
git add .
git commit -m "feat: add new component"
git push
```

### 4. Automated release

When merged to `main`:

1. GitHub Actions creates a **Version PR**
2. Review and merge the Version PR
3. Package is automatically published to npm

## Example

```bash
# Add a new Button component
pnpm changeset
# → Select: minor
# → Message: "Add Button component with variants"

git add .
git commit -m "feat: add Button component"
git push
```

## Multiple changes

You can create multiple changesets for different changes:

```bash
pnpm changeset  # minor: "Add DatePicker"
pnpm changeset  # patch: "Fix Select dropdown bug"
```

Both will be included in the same version bump.

## Commands

| Command                 | Description                |
| ----------------------- | -------------------------- |
| `pnpm changeset`        | Create a new changeset     |
| `pnpm changeset status` | Preview version bump       |
| `pnpm release`          | Publish (automated via CI) |

## Important Notes

- ✅ Always create a changeset before merging to `main`
- ✅ Write clear, user-facing changeset messages
- ❌ Don't manually edit `package.json` version
- ❌ Don't manually edit `CHANGELOG.md`

## Troubleshooting

**"No changesets found"**

- Solution: Run `pnpm changeset` before pushing

**Version PR not created**

- Check GitHub Actions logs in the **Actions** tab

**Publish failed**

- Verify `NPM_TOKEN` secret is configured
- Ensure token has "Bypass 2FA" enabled

---

For more details, see the [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md).
