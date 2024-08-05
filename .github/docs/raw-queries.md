# Raw SQL queries

When we wanna use raw queries?

- We need to run an optimized query.
- We need a feature that ORM does not yet support.

## `$queryRaw`

- Safe from SQL injections.
- Returns actual records (e.g. `SELECT`).
- Write queries with a [tagged template](./glossary.md#taggedTemplate).
