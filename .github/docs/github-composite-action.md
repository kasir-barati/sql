# GitHub composite action

- A packaged composite action.
- Collect a series of workflow job steps into a single action which you can then run as a single job step in multiple workflows.
- All actions require a metadata file.
- The metadata filename must be either `action.yml` or `action.yaml`.

> [!IMPORTANT]
>
> GitHub actions **do NOT** have access to the `github` context. [Read more about it here](https://stackoverflow.com/q/70098241/8784518).

## `name`

- Required.
- The name of your action.
- Displayed in the Actions tab to help visually identify actions in each job.

## `description`

- Required.
- A short description of the action.

## `inputs`

- Optional.
- Specify data that the action expects to use during runtime.
- Environment variables.
- Input ids uppercase letters are converted to lowercase during runtime.

## `runs`

- Required.
- Specifies whether this is:
  - A composite action.
  - A JavaScript action.
  - A Docker container action.

### `runs` for composite actions

- `runs.using: "composite"`
  - Required
- `runs.steps`
  - Required.

# Refs

- [Metadata syntax for GitHub Actions](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)
