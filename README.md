# Webflow Custom Code Set

This repository contains custom code snippets for enhancing Webflow projects. It helps maintain consistency, traceability, and safe version control for all injected code.

## Naming Convention

- Use all lowercase letters.
- Words must be separated by hyphens (`-`).
- Do not use spaces, underscores, or camelCase.

## Backup Policy

Before modifying any existing file, always create a backup version:
- Append `--backup` to the filename.
- Optionally add a date or short note for context.

Example:  
`form-handler--backup-2025-07-24.js`

## Publish Rule

- **Always compress (minify) any JavaScript file** before publishing to the live Webflow project.
- Keep the original (readable) version in the repo for future editing.
- Store minified versions separately or paste directly into Webflow’s custom code fields.

## Notes

- All snippets are intended for direct use in Webflow’s custom code areas.
- Keep code modular and conflict-free.
- Test changes before applying to live projects.
