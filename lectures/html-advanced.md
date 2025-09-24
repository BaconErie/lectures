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

# `\<div\>`

Basic general use element for **blocks**, not inline

Wrapping, making a box, menus, whatever needs to be a block.

```html {monaco-run}
Blah blah blah blah
<div style="border: solid">Box. Not inline.</div>
blah blah blah blah.
```

---

# `\<span\>`

General use but inline.

Not as commonly used, but helpful.

```html {monaco-run}
Only highlight what is
<span style="border: solid">most important</span>
in your notes
```

---

```yaml
class: monaco-resizable
```

# Basic text

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

Also meta tag probably

TODO

---

```yaml
layout: center
```

# SEO

---

# Search Engine Optimization (SEO)

Top links on Google results are clicked on first

How do we get our website to show up first?

This is SEO

---

# What search engines look for

TODO

---

# What tags can help

TODO

---

```yaml
layout: center
```

# Components

---

# Components

New concept

Beyond plain HTML

Extensive use in JS libraries

Basically, reusable HTML templates with some logic

---

# Components example

Repeating ourselves a lot, and gets annoying to type all of these, cluttered

```html {monaco-run}
<div style="border: solid">
  <button>✕</button>
  <p>Finish HW</p>
  <p>
    Labels:
    <span style="background-color: red; color:white">most important</span>
    <span style="background-color: blue; color:white">school</span>
  </p>
</div>

<div style="border: solid">
  <button>✕</button>
  <p>Work on website</p>
  <p>
    Labels:
    <span style="background-color: green; color:white">coding</span>
  </p>
</div>
```

---

# Components example

What if, single tag, makes us a task box with button and styles everything?

```js

DEFINE <Task> WITH ATTRIBUTES text, labels AS
  <div style="border: solid">
    <button>✕</button>
    <p>{text}</p>
    <p>
      Labels: {labels}
      <span style="background-color: gray; color:white">{label}</span>
    </p>
  </div>
END DEFINITION
```

```html
<Task text="Finish HW" labels="most important, school" />
<Task text="Work on website" labels="coding" />
```

---

# Mini-project

- Setup a Director site (static) w/ an officer
- Nobody wants to look at my site
- Optimize the site for mobile (viewport meta), and SEO (meta tags)

[Shell code](https://drive.google.com/file/d/1tP-TSFGRk7qWJ_xpaivt2w9Z89lMF0k_/view?usp=sharing)

---

```yaml
layout: last
```

# \</lecture\>
