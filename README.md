## TJ Dev Club Lectures

### Requirements
- Node.js 18+

### Install
```bash
npm install
```

### Run the dev server
```bash
npm run dev -- lectures/example.md
```
- Replace `lectures/example.md` with your deck file.
- Opens at http://localhost:3030 by default.

### Where to put your slides
- Put your `.md` decks in the `lectures/` folder.
- Start each deck with this frontmatter to use this theme from the parent folder:

```md
---
theme: ./../
---
```

### Create a new lecture
```bash
cp lectures/example.md lectures/my-talk.md
npm run dev -- lectures/my-talk.md
```

### Export (optional)
- PDF:
```bash
npm run export -- lectures/example.md
```
- PNG screenshots:
```bash
npm run screenshot -- lectures/example.md
```

### Minimal structure
- `lectures/` — your decks
- `layouts/`, `components/`, `styles/`, `setup/` — theme files
