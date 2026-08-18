# Git and GitHub Workflow

## Prerequisites

Before starting, install Git and create a GitHub account.

### 1. Install Git

Download and install the Git desktop application from:

https://git-scm.com/downloads

### 2. Create a GitHub Account

Sign up for a GitHub account:

https://github.com/signup

---

## Git Workflow

The basic Git workflow consists of the following steps:

1. Initialize a local Git repository.
2. Configure Git user information.
3. Stage files for commit.
4. Commit changes locally.
5. Connect the local repository to a remote repository.
6. Push changes to the remote repository.
7. Pull the latest changes from the remote repository.
8. Delete the local repository (optional).

---

## 1. Create a New Local Git Repository

Navigate to your project folder and initialize a Git repository:

```bash
git init
```

This creates a `.git` folder and converts the project directory into a Git repository.

---

## 2. Configure Git User Information

Configure your name and email address. This is typically a one-time setup.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

To verify the configuration:

```bash
git config --global --list
```

---

## 3. Add Files to the Staging Area

Use `git add` to stage files that you want to include in the next commit.

### Add all files and folders

```bash
git add .
```

or

```bash
git add -A
```

### Add a specific file

```bash
git add filename
```

Example:

```bash
git add package.json
```

### Add files with a specific extension

```bash
git add "*.ts"
```

### Add all files from a specific folder

```bash
git add foldername/
```

### Check the staging status

```bash
git status
```

---

## 4. Commit Changes to the Local Repository

Commit the staged changes with a descriptive commit message:

```bash
git commit -m "Add initial Playwright framework"
```

To view the commit history:

```bash
git log --oneline
```

---

## 5. Connect the Local Repository to GitHub

Create a new repository on GitHub, then connect your local repository to it.

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```

Example:

```bash
git remote add origin https://github.com/pavanoltraining/myproject.git
```

Verify the remote repository:

```bash
git remote -v
```

> **Note:** Replace `USERNAME` and `REPOSITORY` with your GitHub username and repository name.

---

## 6. Push Changes to GitHub

First, check your current branch:

```bash
git branch
```

If your main branch is `main`, push using:

```bash
git push -u origin main
```

For a repository using `master`:

```bash
git push -u origin master
```

After the first push, you can usually use:

```bash
git push
```

### GitHub Authentication

GitHub no longer accepts a normal account password for Git operations over HTTPS.

When authentication is required, use a **GitHub Personal Access Token (PAT)** instead of your GitHub password.

---

## 7. Pull the Latest Changes from GitHub

Use `git pull` to download and merge the latest changes from the remote repository.

### Option 1: Fetch and merge manually

```bash
git fetch origin
git merge origin/main
```

### Option 2: Fetch and merge automatically

```bash
git pull origin main
```

For a `master` branch:

```bash
git pull origin master
```

### Recommended workflow

Before starting new work, pull the latest changes:

```bash
git pull
```

---

## 8. Delete the Local Git Repository — Optional

If you want to remove Git tracking from a project while keeping the project files, delete the `.git` folder.

### Windows PowerShell

```powershell
Remove-Item -Recurse -Force .git
```

### Windows Command Prompt

```cmd
rmdir /s /q .git
```

### macOS/Linux

```bash
rm -rf .git
```

> **Warning:** Deleting the `.git` folder removes the local Git history and repository configuration. Your project files will remain, but the folder will no longer be a Git repository.

---

## Quick Git Workflow

The most commonly used commands are:

```bash
git init
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

git status
git add .
git commit -m "Initial commit"

git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main

git pull
```

## Typical Day-to-Day Workflow

```bash
git pull
git status
git add .
git commit -m "Update test cases"
git push
```
