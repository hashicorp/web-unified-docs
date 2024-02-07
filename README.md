# Experimental Docs

This repo is currently a WIP experimental exploration of storing the documentation for all of our products in one central repository.

## Clone Time

```
$ time git clone https://github.com/hashicorp/web-presence-experimental-docs
Cloning into 'web-presence-experimental-docs'...
remote: Enumerating objects: 28513, done.
remote: Counting objects: 100% (28513/28513), done.
remote: Compressing objects: 100% (11766/11766), done.
remote: Total 28513 (delta 15940), reused 28513 (delta 15940), pack-reused 0
Receiving objects: 100% (28513/28513), 247.14 MiB | 7.09 MiB/s, done.
Resolving deltas: 100% (15940/15940), done.
Updating files: 100% (63437/63437), done.
git clone https://github.com/hashicorp/web-presence-experimental-docs  9.89s user 17.64s system 47% cpu 57.898 total
```

## Sparse Checkout

```
$ time git clone https://github.com/hashicorp/web-presence-experimental-docs --no-checkout
Cloning into 'web-presence-experimental-docs'...
remote: Enumerating objects: 28516, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 28516 (delta 0), reused 3 (delta 0), pack-reused 28513
Receiving objects: 100% (28516/28516), 247.14 MiB | 6.31 MiB/s, done.
Resolving deltas: 100% (15940/15940), done.
git clone https://github.com/hashicorp/web-presence-experimental-docs   3.88s user 1.36s system 12% cpu 40.641 total

$ cd web-presence-experimental-docs

$  web-presence-experimental-docs git:(main) ✗ git sparse-checkout init --cone

$  web-presence-experimental-docs git:(main) ✗ git sparse-checkout set products/consul

$  web-presence-experimental-docs git:(main) ✗ git checkout main
Updating files: 100% (7978/7978), done.
Already on 'main'
Your branch is up to date with 'origin/main'.

$  web-presence-experimental-docs git:(main) ls
README.md  products

$  web-presence-experimental-docs git:(main) ls products
consul

$  web-presence-experimental-docs git:(main) ls products/consul
v1.10.x  v1.11.x  v1.12.x  v1.13.x  v1.14.x  v1.15.x  v1.16.x  v1.17.x  v1.18.x  v1.8.x  v1.9.x

$  web-presence-experimental-docs git:(main) git status
On branch main
Your branch is up to date with 'origin/main'.

You are in a sparse checkout with 13% of tracked files present.

nothing to commit, working tree clean
```