# Fetch Top N Customers of Each Shop

Assume you wanna do this in PostgreSQL:

- Fetch top 3 customers of a group of shops in your database.
- Where we wanna sort users based on `id` (this can be anything you desire).

## Breaking Down the Problem

1. We know how we can select all `customers`:
   ```sql
   SELECT *
   FROM public.customers
   WHERE shop_at_id IN ('f0339f92-fa09-41f8-b782-044d49232af7', 'e2aed301-973d-468f-8f7b-d027a8aa58dc')
   ```
2. We know how we can group customers based on where they shop:
   ```sql
   SELECT shop_at_id
   FROM public.customers
   GROUP BY shop_at_id
   ```
3. So now we wanna do it in one query. So obviously we need a subquery/nested query:

   ```sql
   SELECT *
   FROM
   (
       SELECT *
       FROM public.customers
       WHERE shop_at_id IN ('f0339f92-fa09-41f8-b782-044d49232af7', 'e2aed301-973d-468f-8f7b-d027a8aa58dc')
   )
   # ??? How you can filter only the top 3 customer?
   ```

   To do this we need to assigns a unique rank to each row within each group. So that then we can filter customers who are ranked below or above a certain threshold.

4. We need `ROW_NUMBER` [_window function_](https://www.postgresql.org/docs/current/functions-window.html) (it's explained really good [here](https://neon.tech/postgresql/postgresql-window-function/postgresql-row_number)). A _window function_ provide the ability to **perform calculations across sets of rows** that are related to the current query row.

   ```sql
   SELECT *
   FROM
   (
       SELECT
           *,
           ROW_NUMBER() OVER(PARTITION BY shop_at_id ORDER BY id)
       FROM public.customers
       WHERE shop_at_id IN ('09c937c0-f1d1-461b-adde-1454dc3ab2fd', '6020dc04-e912-4ec5-a5a3-f1a25cc7c3fc')
   )
   WHERE row_number <= 3
   ```

   - Here we are first telling PostgreSQL to group our records based on `shop_at_id`: `PARTITION BY shop_at_id`
   - And then we are sorting them by `id`. PostgreSQL sorts them by default ascending.

     Let's say we need to sort customers of each shop based on their `id` **ascending** and `created_at` **descending**.

     ```sql
     ROW_NUMBER() OVER(PARTITION BY shop_at_id ORDER BY id ASC, created_at DESC)
     ```

   - Finally we can simply filter the result based on `row_number` :slightly_smiling_face:.
