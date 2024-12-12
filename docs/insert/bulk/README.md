# Bulk Insert

> [!NOTE]
>
> I am not gonna speak about why we ain't doing individual `INSERT` statements since there are ample reason to believe that it'll be slow.

- You have a lot of data (thousands of records per second).
- Need to do the bulk inserts as quick as possible.

## Batching

- Commonly known as multi-valued `INSERT`s.
- Little effort in the code itself:

  | Python                                                                                                                                           | NodeJS                                                                                                                                    |
  | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
  | https://github.com/ryanbooz/Presentations/blob/29493b17141a86c1933b1f98779c3cf4355b71c1/Bulk%20Inserts%20with%20PostgreSQL/batch_save.py#L50-L63 | https://github.com/kasir-barati/sql/blob/d42d90bd2451ad72c4ce45a033b5df860afc87b6/docs/bulk-insert/assets/multi-valued-inserts.js#L15-L33 |

> [!CAUTION]
>
> PostgreSQL has its own limitations, i.e. that we cannot have more than 65535 parameterized values in a single SQL query :expressionless: ([ref](https://www.postgresql.org/docs/current/limits.html), search for "query parameters").

## `unnest` Function

- One potential solution for the PostgreSQL limitation on how many parameter you can pass to a single query can be using `unnest` array function.
- Learn more about it [here](./unnest.md)

## `copy`

TK

## [pgloader](https://pgloader.io/)

TK

## [`UNLOGGED` Tables](https://www.postgresql.org/docs/current/sql-createtable.html#SQL-CREATETABLE-UNLOGGED)

- Data written to this kind of table is **NOT** written to the write-ahead log.
- Considerably faster than ordinary tables.
- Not crash-safe:
  - No failure-tolerance!
  - Not replicated to standby servers.
  - Indexes created on it are automatically unlogged as well.

## Ref

- [https://youtu.be/aQrQnNvJguA?si=DLBHf_v9jbv81v8M](https://youtu.be/aQrQnNvJguA?si=DLBHf_v9jbv81v8M).
