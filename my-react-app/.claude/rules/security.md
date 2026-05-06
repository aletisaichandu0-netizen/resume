# Security Rules

## Blocked Commands
- `rm -rf` on source directories, node_modules, or system paths
- `chmod 777` or `chmod -R 777` — never world-writable permissions
- `sudo rm` / `sudo chmod` — no sudo for file operations
- `curl <url> | bash` or `wget <url> | bash` — no piped remote execution
- `npx --yes` — no auto-accepting unknown packages
- `npm publish` — never publish without explicit user instruction

## Code Security
- Never hardcode secrets, API keys, or tokens in source files
- Use `.env` files for secrets; ensure `.env` is in `.gitignore`
- Never commit `.env` files
- Sanitize all user input before rendering (prevent XSS)
- Do not use `dangerouslySetInnerHTML` unless the content is explicitly sanitized

## Dependencies
- Do not install packages from unknown or unverified sources
- Review `package.json` changes before committing
- Do not use `--legacy-peer-deps` or `--force` with npm install without understanding the conflict

## Environment
- `BROWSER=none` is set in settings — do not override it in CI or scripts without reason
