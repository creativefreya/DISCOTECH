#!/usr/bin/env bash
# Preflight: checks a laptop is ready for the Techella gameshow.
# Works on Mac, Linux and Windows (Git Bash, which Claude Code uses on Windows).
# Prints one line per check: PASS / WARN / FAIL, with a fix hint. Exits 1 if anything FAILs.

fails=0
warns=0

pass() { echo "PASS  $1"; }
warn() { echo "WARN  $1"; echo "      fix: $2"; warns=$((warns + 1)); }
fail() { echo "FAIL  $1"; echo "      fix: $2"; fails=$((fails + 1)); }

echo "Techella gameshow preflight"
echo "---------------------------"

# 1. Git installed
if command -v git >/dev/null 2>&1; then
  pass "Git installed ($(git --version | sed 's/git version //'))"
else
  fail "Git is not installed" "Mac: run 'xcode-select --install'. Windows: install from https://git-scm.com/download/win"
fi

# 2. Git identity (needed to save your work)
if command -v git >/dev/null 2>&1; then
  if [ -n "$(git config user.name)" ] && [ -n "$(git config user.email)" ]; then
    pass "Git knows who you are ($(git config user.name))"
  else
    warn "Git doesn't know your name/email yet" "git config --global user.name \"Your Name\" && git config --global user.email \"you@example.com\""
  fi
fi

# 3. Node.js 18+
if command -v node >/dev/null 2>&1; then
  node_major=$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null)
  if [ -n "$node_major" ] && [ "$node_major" -ge 18 ]; then
    pass "Node.js installed ($(node --version))"
  else
    fail "Node.js is too old ($(node --version)), need 18 or newer" "Install the LTS version from https://nodejs.org"
  fi
else
  fail "Node.js is not installed" "Install the LTS version from https://nodejs.org"
fi

# 4. npx (used to preview pages)
if command -v npx >/dev/null 2>&1; then
  pass "npx available"
else
  warn "npx not found" "It comes with Node.js: reinstall Node LTS from https://nodejs.org"
fi

# 5. Inside this repo
repo_root=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -n "$repo_root" ] && [ -f "$repo_root/CLAUDE.md" ] && [ -f "$repo_root/scripts/preflight.sh" ]; then
  pass "You're inside the gameshow repo"
  cd "$repo_root" || exit 1
else
  fail "Not inside the gameshow repo" "Open the techella-unlikely-gameshow folder in Claude Code (see PREP.md step 3)"
fi

# 6. Folder structure intact
if [ -n "$repo_root" ]; then
  missing=""
  for d in company customers brand departments/marketing departments/sales departments/content departments/crm departments/emails apps votes; do
    [ -d "$d" ] || missing="$missing $d"
  done
  if [ -z "$missing" ]; then
    pass "All business folders present"
  else
    warn "Some folders are missing:$missing" "Run 'git checkout --$missing' to restore them (or re-clone the repo)"
  fi
fi

# 7. Connected to GitHub and up to date
if [ -n "$repo_root" ]; then
  if git remote get-url origin >/dev/null 2>&1; then
    if GIT_TERMINAL_PROMPT=0 git fetch --quiet origin 2>/dev/null; then
      upstream=$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)
      if [ -n "$upstream" ]; then
        behind=$(git rev-list --count HEAD.."$upstream" 2>/dev/null || echo 0)
        if [ "$behind" -gt 0 ]; then
          warn "Your copy is $behind update(s) behind" "Run 'git pull' (or ask Claude to pull the latest)"
        else
          pass "Up to date with GitHub"
        fi
      else
        pass "Connected to GitHub"
      fi
    else
      warn "Couldn't reach GitHub (offline?)" "Check your internet, then run /preflight again"
    fi
  else
    warn "Not connected to GitHub (no 'origin')" "Clone the repo from GitHub instead of downloading a zip (PREP.md step 3)"
  fi
fi

# 8. Claude Code command line (optional: the desktop app doesn't need it)
if command -v claude >/dev/null 2>&1; then
  pass "Claude Code command line installed"
else
  echo "INFO  Claude Code command line not found. That's fine if you're using the Claude desktop app."
fi

echo "---------------------------"
if [ "$fails" -gt 0 ]; then
  echo "RESULT: NOT READY ($fails to fix, $warns to check)"
  exit 1
elif [ "$warns" -gt 0 ]; then
  echo "RESULT: READY, with $warns thing(s) worth fixing"
else
  echo "RESULT: READY"
fi
