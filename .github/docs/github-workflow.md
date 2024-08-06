# CI pipeline

- Boost productive.
- Improve overall code quality.
- Achieving faster deployments.
- Commit early, commit often:
  - It’s much easier to fix small problems than big problems.
  - Bugs are easier to identify because there is less code to sort through.
- Document your CI, create FAQs, and link these docs wherever needed.
- KISS:
  - No complex build process.
  - Every minute taken off build times is a minute saved for each developer every time they commit.
- Use failures to improve processes:
  - **Instead of** asking **who** caused the failure, **ask what** caused the failure.
  - Shift from a blaming culture to a learning culture.
- Similar env for both production and test.

\- [Ref](https://about.gitlab.com/topics/ci-cd/continuous-integration-best-practices/)

# `jobs`

## `jobs.job_ID`

## `jobs.job_ID.strategy`

- Use variables in a single job definition to automatically create multiple job runs that are based on the combinations of the variables.
- E.g. use a matrix strategy to test your code in multiple versions of a language or on multiple operating systems.

### `jobs.job_ID.strategy.matrix`

- Define one or more variables followed by an array of values.

![Variable and values in a matrix](./assets/variable-value-matrix.png)

### `jobs.job_ID.steps`

### `jobs.job_ID.steps[index].uses`

- A reusable unit of code.
- Use:
  - A public repository.
  - A published Docker container image.
  - An action defined in the same repository as the workflow.
    - Actions are either:
      - JavaScript files.
      - Docker containers.
    - ```cmd
      |-- hello-world (your repository)
      |   |__ .github
      |       └── workflows
      |           └── my-first-workflow.yml
      |       └── actions
      |           |__ hello-world-action
      |               └── action.yml
      ```
- **Specify the version**.

# Secrets

- Store sensitive information in your:
  - Organization.
  - Repository.
  - Repository environments.

## [`GITHUB_TOKEN`](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication1)

- At the **start of each workflow job**, GitHub automatically creates a unique `GITHUB_TOKEN` secret to use in your workflow.
- Use the `GITHUB_TOKEN` to authenticate in the workflow job.

# `github` context

- Information about the workflow run and the event that triggered the run.
- It contains `github.token`.
- `github.server_url`: The URL of the GitHub server. E.g. "https://github.com".
- `github.repository`: The owner and repository name. E.g. "octocat/Hello-World".
- `github.run_id`:
  - A unique number for each workflow run within a repository.
  - This number **does NOT** change if you re-run the workflow run.
