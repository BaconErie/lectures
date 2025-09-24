---
theme: ./../
title: Advanced HTML
---

# \<html\> (adv.)

TJ Dev Club

---

# Quick HTML Refresher

- Markup language, little logic, little styling
- Forms the structure of the website
- \<tags\> and stuff

---

# Most important tags review: `\<div\>`

Basic general use element for **blocks**, not inline

Wrapping, making a box, menus, whatever needs to be a block.

```html {monaco-run}
Blah blah blah blah
<div style="border: solid">Box. Not inline.</div>
blah blah blah blah.
```

---

# Most important tags review: `\<span\>`

General use but inline.

Not as commonly used, but helpful.

```html {monaco-run}
Only highlight what is
<span style="border: solid">most important</span>
in your notes
```

---

# Review: basic text

```html {monaco-run}
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p>This is a paragraph</p>
<p>Auto line breaks after paragraph</p>
```

---

```yaml
layout: center
```

# Some more advanced tags

---

# `<meta>`

Various uses:

- Metadata
- Instructions for browser
- SEO
- HTTP header simulation

---

# Viewport meta

Mobile devices act weird

Pretend their screen is really big, then zoom everything out so the entire page
can be see

Why? Many (old) sites don't optimize for mobile, so they only look good on large
screens.

---

# Viewport meta

Simulated mobile view. Everything is too small, user must manually zoom in.

<img src="/zoomedout.png" alt="zoomedout" style="width: auto; height:300px;"/>

---

# Viewport meta

What we want. We tell the phone not to automatically zoom out.

<img src="/advanced-normal.png" alt="Normal" style="width: auto; height:300px;"/>

---

# Viewport meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Set `width` to `device-width`. `width` means VIRTUAL VIEWPORT width

Set `initial-scale` to `1.0`. `scale` means ZOOM level, 1.0 means no zoom in or
out

---

# That cool embed image

TODO

---

# Search Engine Optimization (SEO)

Top links on Google results are clicked on first

How do we get our website to show up first?

---

# What search engines look for

TODO

---

# What tags can help

TODO

---

```yaml
layout: last
```

# \</lecture\>
