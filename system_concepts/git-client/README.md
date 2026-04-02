# Git Client Concept Guide

## Concept Overview
A Git client interacts with the Git content-addressable storage to record snapshots, manage branches, and synchronize repositories. Git stores blobs, trees, and commits identified by SHA-1 (or SHA-256) hashes. Clients orchestrate commands such as `init`, `add`, `commit`, `status`, `fetch`, and `push`, handling index management, object packing, and network protocols (smart HTTP, SSH).

## Real-World Usage
- **Command-Line Clients:** `git` is the reference implementation. Tools like `tig`, `lazygit`, and `GitHub CLI` build on top of it to streamline workflows.
- **GUI Clients:** GitHub Desktop, GitKraken, and SourceTree provide visual diffing, branch management, and conflict resolution.
- **Embedded Clients:** IDEs (VS Code, IntelliJ) embed Git functionality to manage repositories directly from the editor.

## Architecture Highlights
1. **Object Database:** Blobs, trees, commits, and tags are stored in `.git/objects/` with optional packfiles for compression.
2. **Index (Staging Area):** The index maps working tree paths to staged blob hashes, enabling multi-file commits and conflict resolution.
3. **Refs & Branches:** References (e.g., `refs/heads/main`) point to commit hashes. HEAD is a symbolic ref to the current branch.
4. **Protocols:** Git smart protocol negotiates object transfer. Clients support SSH, HTTP(S), and Git daemon transports.

## Included Working Example (Node.js)
The `example.js` script demonstrates a toy Git client. It implements `init`, `add`, `commit`, and `log` against a `.minigit` directory with SHA-1 object storage. Example session:

```bash
node example.js init
node example.js add README.md
node example.js commit -m "Initial commit"
node example.js log
```

The goal is educational: the script shows how blobs and commits can be persisted with hashes without reimplementing the full Git plumbing.

## React 19 Interactive Demo
`example.jsx` simulates staging files and creating commits entirely in-browser:

```jsx
import GitClientDemo from "./git-client/example.jsx";

export default function App() {
  return <GitClientDemo />;
}
```

Use the component to show how staging areas, commits, and logs relate without touching the filesystem.

## Learning Checklist
- Extend the index to handle deletions and file mode changes.
- Implement `status` by comparing working tree hashes with the latest commit.
- Add networking by pushing/pulling objects over HTTP or SSH.

## References
- Pro Git Book: https://git-scm.com/book/en/v2
- Git Internals Documentation: https://git-scm.com/docs
- Git Rev News – Client Ecosystem Updates: https://git.github.io/rev_news/
