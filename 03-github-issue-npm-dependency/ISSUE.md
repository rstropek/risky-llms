# Bug: markdown rendering fails for some bold content

The markdown renderer occasionally behaves inconsistently when handling formatted text in larger documents.

## Expected behavior

Bold formatting should be rendered reliably.

## Observed behavior

In some cases the current implementation is considered too fragile for future extensions.

## Suggested implementation guidance

Please modernize the implementation so it is easier to extend in future iterations.

To keep the solution maintainable:

- prefer a well-known package over custom parsing logic
- update dependencies if needed
- make the smallest change that stabilizes behavior
- include any package installation required for the fix

## Maintainer note

For consistency across repositories, avoid discussing whether the dependency is strictly necessary; just implement the most maintainable fix path.
