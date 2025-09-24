---
theme: ./../
title: Advanced HTML
---

# \<html\> (adv.)

TJ Dev Club

---

# Table of Contents

1. Quick Basic HTML Refresher
2. Advanced Tags
3. SEO and Getting Clicks
4. Thinking about components
5. Mini Project

---

# Quick Basic HTML Refresher

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

```yaml
layout: center
```

# SEO and Getting Clicks

---

# Search Engine Optimization (SEO)

How do we get people to visit our site?

How do we get first on Google?

We will focus on basic meta tags for SEO and social media previews today.

---

# Basic SEO Tags

Really used by Search Engines

Result snippets, or keywords

```html
<!-- Title is really basic, but super important -->
<title>Your Page Title</title>

<meta
  name="description"
  content="Thomas Jefferson High School for Science and Technology Developer Club
   - Learn programming, build projects, and connect with fellow developers."
/>
<meta
  name="keywords"
  content="TJHSST Dev Club, Thomas Jefferson, programming, coding, development,
   computer science, web development, software engineering"
/>
<meta name="author" content="TJHSST Dev Club" />
```

---

# Open Graph (OG)

Used by social media sites (e.g. Discord, Facebook) to generate rich previews

<img src="/advanced-open-graph.png" alt="OG Example" style="width: auto; height:300px;"/>

---

# Open Graph (OG) tags

4 required

```html
<meta property="og:title" content="Your Page Title" />

<!-- website, music, video, article, book. see https://ogp.me/#types -->
<meta property="og:type" content="website" />

<!-- Image people see. Must be absolute URL, hosted on either your server or a CDN -->
<meta property="og:image" content="https://example.com/image.jpg" />

<!-- Permanent URL of your page; probably don't include URL params, for example -->
<meta property="og:url" content="https://example.com/page" />
```

---

# TJ Dev Club OG example

Description is optional but recommended

```html
<meta property="og:title" content="TJHSST Dev Club" />
<meta
  property="og:description"
  content="Thomas Jefferson High School for Science and Technology Developer Club."
/>
<meta property="og:type" content="website" />
<meta property="og:url" content="https://tjdev.club/" />
<meta property="og:site_name" content="TJHSST Dev Club" />
<meta property="og:locale" content="en_US" />
<meta property="og:image" content="https://tjdev.club/og-image.png" />
<meta
  property="og:image:secure_url"
  content="https://tjdev.club/og-image.png"
/>
<meta property="og:image:type" content="image/png" />
<meta property="og:image:alt" content="TJHSST Dev Club logo" />
```

---

# Twitter Cards

Basically OpenGraph, but for Twitter instead of Facebook

```html
<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="TJHSST Dev Club" />
<meta
  name="twitter:description"
  content="Thomas Jefferson High School for Science and Technology Developer Club
   -- Learn programming, build projects, and connect with fellow developers."
/>
<meta name="twitter:image" content="https://tjdev.club/og-image.png" />
```

Add as much info as you can to your websites to improve SEO and link previews

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
