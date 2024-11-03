# `SELECT`

## Pagination in raw SQL

> [!CAUTION]
>
> [Stop using offset for pagination - Why it's grossly inefficient](https://www.reddit.com/r/programming/comments/knlp8a/stop_using_offset_for_pagination_why_its_grossly/).
>
> By [u/fyzic](https://www.reddit.com/user/fyzic/) in [programming](https://www.reddit.com/r/programming/).

- We have a table called "news_articles".

  | column name  | type        |
  | ------------ | ----------- |
  | `id`         | `uuid`      |
  | `title`      | `Timestamp` |
  | `created_at` | `Timestamp` |
  | `updated_at` | `Timestamp` |

- We wanna fetch part of the store data according to the `WHERE` clause, `OFFSET`, and `LIMIT`.

## Breaking the problem into two half

1. How can I do it in two separate queries (super simple).
2. How can I combine them into one query, I do not like the sound of a two I/O whereas I can do it in one.

### Separate queries

- Selecting data:

  ```sql
  SELECT *
  FROM public.news_articles
  WHERE title LIKE '%something%'
  ORDER BY created_at ASC
  OFFSET 0
  LIMIT 10;
  ```

  > [!CAUTION]
  >
  > - It is important to add `OFFSET` and `LIMIT` after everything else. Otherwise your query will fail when you execute it.
  > - Do not omit `ORDER BY` when you have used `LIMIT` if you want to be able to predict what subset of data you're gonna receive.
  >
  >   Query optimizer takes `LIMIT` into account when generating query plans, so you are very likely to get different plans (yielding different row orders) depending on what you give for `LIMIT` and `OFFSET`.
  >
  >   Using different `LIMIT`/`OFFSET` values to select different subsets will give inconsistent results unless you enforce a predictable result ordering with `ORDER BY`.
  >
  >   **This is not a bug**; it is an inherent consequence of the fact that **SQL does not promise to deliver the results of a query in any particular order unless `ORDER BY` is used**.
  >
  > &mdash; [Ref](https://www.postgresql.org/docs/current/queries-limit.html).

- Counting all the records, so that we can calculate next page and previous page number if any:

  ```sql
  SELECT COUNT(id) as "total"
  FROM public.news_articles;
  ```

  Here we are using `COUNT(id)` so that we are sure we are counting all the records. As you know this aggregate function won't count null values. Thus `id` is the best choice.
  &mdash; [Ref](https://www.postgresql.org/docs/8.2/functions-aggregate.html)

- And then we can just calculate the previous page and next page like this:

  ```sql
  SELECT total / 10::double precision AS "totalPage";
  ```

  Then if `totalPage` is bigger than the current page (`(limit + offset) / limit`)

  - I just increase the page by one and previous page will be the current page.
  - Otherwise there is not next page. But our previous page would be the current page minus one.

  [Learn more about casting](https://www.postgresql.org/docs/current/sql-createcast.html). In this example we: - Invoked a cast through its `construct`: i.e. `10::double precision`. - But we could do it also explicitly: i.e. `CAST(10 AS double precision)`.

### Smashing and combining all of these

- **Nested queries**: For that to happen we need to write a **subquery** within our main query. So that we can get everything in one fell swoop.

  Read about more [here](https://www.postgresql.org/docs/17/queries-table-expressions.html#QUERIES-SUBQUERIES), and I could not find something more elaborate. Dunno if they missed it or simply I was not able to find the doc related to subqueries. But most likely it is scattered in their website.

- We also need to utilize some of the builtin functions of PSQL:
  - `TO_JSONB` converts all columns of "news_articles" into a jsonb or json datatype ([ref](https://www.postgresql.org/docs/9.5/functions-json.html)).
    - Alternatively we can use `JSONB_BUILD_OBJECT` where we should alternating keys and values.
  - `JSON_AGG` to aggregating json data ([ref](https://www.postgresql.org/docs/9.5/functions-aggregate.html)).

```sql
SELECT *, (total / 10::double precision)::int AS "totalPage"
FROM (
  SELECT
    (SELECT COUNT(id) FROM public.news_articles) AS "total",
    (
      SELECT JSON_AGG(TO_JSONB(filtered_news_articles))
      FROM (
	    	SELECT *
		    FROM public.news_articles
		    WHERE title LIKE '%something%'
            ORDER BY created_at ASC
	    	OFFSET 0
	    	LIMIT 10
	    ) as "filtered_news_articles"
	  ) AS "data"
);
```

This query will return something like this if you wanted to see it in plain JSON:

```js
{
  "total": 50,
  "data": [
    {
      "id": "9b050c4f-e0dc-4c19-9e02-844957a67522",
      "title": "A title with something inside it!"
      // ...
    },
    {
      "id": "b5c5c3c9-75c9-4495-908f-47e42abc92a9",
      "title": "Is something ready?"
      // ...
    },
    // ...
  ],
  "totalPage": 5
}
```

> [!IMPORTANT]
>
> - In a real world app we usually tend to use dynamic values for `limit` & `offset`. That's why I used a cast operator to convert limit into double precision. Otherwise it would performed an integer operation and that could lead to not seeing last page's data.
> - Here we are converting the `totalPage` back to `int` again after it is calculated.
> - Calculating everything in SQL can become cumbersome if you over do it. Just look at how much harder it is to read it just because we wanted to have the `totalPage` calculate inside SQL. But instead we could do it in our codebase.
