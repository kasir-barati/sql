# `json_build_object`

- Creates a new object.
- Can be used in subqueries where you're allowed to only return one column.
- Its parameters alternate, the first parameter is the column name and the second is it's value.
- The column name is coerced into string.
- Values are converted implicitly using `to_json` and `to_jsonb`.

&mdash; [Ref](https://www.postgresql.org/docs/current/functions-json.html#FUNCTIONS-JSON-CREATION-TABLE)
