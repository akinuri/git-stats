## All branches:

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

## Only main:

```bash
git log main --numstat --date=iso-strict \
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