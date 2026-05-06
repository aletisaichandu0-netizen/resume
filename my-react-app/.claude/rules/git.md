# Git Rules

## Blocked — Never Run
- `git push --force` / `git push -f` — destroys remote history
- `git reset --hard` — discards uncommitted work permanently
- `git clean -f` / `-fd` / `-fdx` — deletes untracked files permanently
- `git commit --no-verify` / `-n` — bypasses pre-commit hooks
- `git branch -D` — force-deletes a branch without merge check
- `git filter-branch` — rewrites history, dangerous on shared branches
- `git config --global` — modifies system-wide git config

## Requires Explicit User Confirmation
- `git push` to `main` or `master`
- `git merge` into `main` or `master`
- Amending a commit that has already been pushed
- `git rebase` on a branch shared with others

## Always Do
- Create new commits instead of amending published ones
- Use `git stash` before switching branches with uncommitted work
- Use `--force-with-lease` instead of `--force` if a force push is absolutely necessary — and only after user confirms
- Stage specific files by name, not `git add -A` or `git add .`
