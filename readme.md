# Git Stats

Git Stats is a browser-based dashboard for exploring Git commit history. Load one or more history dumps to compare project activity, inspect contributions over time, and filter results by project, author, or date.

## Features

- Daily contribution graph and commit timeline
- Author and project activity summaries, including insertions, deletions, changed files, and commit counts
- Commit table with author and committer details
- Project, author, and date-range filters
- Options to ignore merge commits and the first commit in a history
- Load multiple projects and compare them in one view

## Getting started

1. Open `index.html` in a browser. The page uses Tailwind CSS from its CDN, so an internet connection is needed for styling.
2. Export a history dump for each Git repository you want to inspect:
   - On Windows, drag one or more repository folders onto `git-history.bat`. It creates a `<repository-name>-git-history.txt` file beside each repository.
   - Alternatively, open a terminal in the repository folder and run:

     ```bash
     git log --all --numstat --date=iso-strict \
       --pretty=format:'
     @@COMMIT@@
     hash=%H
     parents=%P
     author_name=%an
     author_email=%ae
     author_date=%aI
     committer_name=%cn
     committer_email=%ce
     committer_date=%cI
     subject=%s
     body=%b
     @@FILES@@' \
       > git-history.txt
     ```

     The command includes commits from all branches. To export a specific branch instead, replace `--all` with its name, for example `main`.

3. In Git Stats, choose the dump file for a project. Use the **+** button to add more projects.
4. Select **Parse dump** to display the results. Adjust the filters to explore the data; select **Clear** to reset it.

## Local web server

If you prefer to serve the page locally, run a static file server from the project directory. For example, with `http-server` installed:

```bash
http-server .
```

Then open `http://127.0.0.1:8080`.
