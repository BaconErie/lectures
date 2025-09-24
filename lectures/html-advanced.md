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
  - NOT A PROGRAMMING LANGUAGE!!!!
- Forms the structure of the website
- \<tags\> and stuff <br><br>

```html
<!doctype html>
<html>
  <head>
    <!-- metadata (e.g., title, seo stuff) -->
  </head>
  <body>
    <!-- actual content of page (e.g., text, headers, images, you name it!) -->
  </body>
</html>
```

---

```yaml
class: monaco-resizable
```

# Basic text

- Headers (increase in number, decrease in size): `<h[num]>`
- Paragraphs: `<p>`
- Bold and italic: `<strong>` and `<em>`

```html {monaco-run}
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p>This <strong>is</strong> <em>a</em> paragraph</p>
<p>Auto line breaks after paragraph</p>
```

---

```yaml
layout: default
```

# Example HTML Page

```html {monaco-run}
<!doctype html>
<html>
  <head>
    <title>WELCOME TO DEV CLUB BLOG</title>
  </head>
  <body>
    <h1>Dev Club Blog</h1>
    <p>a developers dream!</p>
    <br />
    <h2>why i hate pigeons</h2>
    <h4>by dev club officers</h4>
    <br />
    <p>
      i hate pigeonins because they are <strong>EVIL!!!!</strong>. i mean
      <em>really</em> think about it, why wouldn't the
      <a href="https://cia.gov">CIA</a> use pigeons as spying devices. it's
      honestly super crazy that people think pigeons are real. look at this
      leaked image
      <img
        src="https://preview.redd.it/row4ll2734v21.jpg?width=640&crop=smart&auto=webp&s=9175ddb3be60ac4b0de319d6f2aabd3ced84a78d"
      />
    </p>
  </body>
</html>
```

---

# \<div\>

Basic general use element for **blocks** (not inline!). Wrapping, making a box,
menus, whatever needs to be a block.

```html {monaco-run}
Blah blah blah blah
<div style="border: solid">Box. Not inline.</div>
blah blah blah blah.
```

---

# \<span\>

General use inline element, doesn't make any changes to the element but can be
used to apply classes, animations, or anything else you want.

```html {monaco-run}
Only highlight what is
<span style="border: solid">most important</span>
in your notes
```

---

# \<link\>

- Used to link external resources (e.g., CSS files) or favicons
- Placed in the `<head>` section

```html
<head>
  <!-- External CSS file -->
  <link rel="stylesheet" href="styles.css" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" />
</head>
```

---

# \<details\> and \<summary\>

Dropdowns

```html {monaco-run}
<details>
  <!-- Summary is what you click on -->
  <summary>Pigeon information</summary>

  <!-- Content that is only shown when you click on the summary -->
  <p>
    Pigeons are contentious aircraft. Some people believe they are spies for the
    government. Others believe they are animals.
  </p>
</details>
```

---

# \<details\> and \<summary\>

Open attribute lets it be open initially

```html {monaco-run}
<details open>
  <!-- Summary is what you click on -->
  <summary>Pigeon information</summary>

  <!-- Content that is only shown when you click on the summary -->
  <p>
    Pigeons are contentious aircraft. Some people believe they are spies for the
    government. Others believe they are animals.
  </p>
</details>
```

---

# \<abbr\>

Use for abbreviations. Helps with accessibility and screen readers

```html {monaco-run}
The report was published by <abbr title="National Public Radio">NPR</abbr>.
```

---

# \<meta\>

Various uses:

- **Meta**data
- Instructions for browser
- Search Engine Optimization (SEO)
- HTTP header simulation

<br>
```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

# \<meta name="viewport"\>

- Mobile devices tend to act weird (thanks iOS 28)
- Usually mobile devices pretend that their screen is really big, then zoom
  everything out so the entire page can be seen
- Why? Many (old) sites don't optimize for mobile, so they only look good on
  large screens.

---

# \<meta name="viewport"\>

On a mobile device, because everything is so small, the user must manually zoom
in (very bad UX!). Can you even read anything on this page?

<img src="/zoomedout.png" alt="zoomedout" style="width: auto; height:300px;"/>

---

# \<meta name="viewport"\>

This is what we want. By including `<meta name="viewport">`, mobile devices
don't automatically zoom out and our website looks a _lot_ nicer.

<img src="/advanced-normal.png" alt="Normal" style="width: auto; height:300px;"/>

---

# \<meta name="viewport"\>

Now that I know about `<meta name="viewport">`, how can I use it?

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- no end tag -->
  <!-- other metadata and stuff -->
</head>
```

Set `width` to `device-width`. `width` means VIRTUAL VIEWPORT width

Set `initial-scale` to `1.0`. `scale` means ZOOM level, 1.0 means no zoom in or
out

---

# Search Engine Optimization (SEO)

- When you try to find a website, where do you usually go first?
  - **SEARCH ENGINES!!!**
  - Higher ranking on search engines = more impressions
- How do we get our website to show up first? This is what SEO is for!
  - Making our websites attractive to search engine algorithims
  - How do we rank first on Google?

---

# What Search Engines Look For

- Keywords (title, description, tags)
- Images to show the end user
- High quality content/backlinks

How do we make this information accessible to search engines? **Metadata!**

---

# Example SEO Head

These tags should be in every HTML site you create!

```html{2-3}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Best Hiking Trails in Northern Virginia</title>
  <meta name="description" content="Discover top hiking trails in NoVA with maps.">
  <meta
    name="keywords"
    content="TJHSST Dev Club, Thomas Jefferson, programming, coding, development,
     computer science, web development, software engineering"
  />

  <meta property="og:title" content="Best Hiking Trails in Northern Virginia">
  <meta property="og:description" content="Top routes, maps, and tips for every hiker.">
  <meta property="og:image" content="https://example.com/images/nova-hikes.jpg">
  <meta property="og:url" content="https://example.com/hiking/northern-virginia">
</head>
```

---

# Example SEO Head

The title on your website is **VERY IMPORTANT**!!!

```html{4}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Best Hiking Trails in Northern Virginia</title>
  <meta name="description" content="Discover top hiking trails in NoVA with maps.">
  <meta
    name="keywords"
    content="TJHSST Dev Club, Thomas Jefferson, programming, coding, development,
     computer science, web development, software engineering"
  />

  <meta property="og:title" content="Best Hiking Trails in Northern Virginia">
  <meta property="og:description" content="Top routes, maps, and tips for every hiker.">
  <meta property="og:image" content="https://example.com/images/nova-hikes.jpg">
  <meta property="og:url" content="https://example.com/hiking/northern-virginia">
</head>
```

---

# Example SEO Head

`<meta name="description">` and `<meta name="keywords">` describe your site, so
putting useful keywords in here is **very important**.

```html{5-11}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Best Hiking Trails in Northern Virginia</title>
  <meta name="description" content="Discover top hiking trails in NoVA with maps.">
  <!-- this is used for search engine keywords, so definitely do this!!! (comma separated) -->
  <meta
    name="keywords"
    content="hiking, northern virginia, trails, maps, travel"
  />

  <meta property="og:title" content="Best Hiking Trails in Northern Virginia">
  <meta property="og:description" content="Top routes, maps, and tips for every hiker.">
  <meta property="og:image" content="https://example.com/images/nova-hikes.jpg">
  <meta property="og:url" content="https://example.com/hiking/northern-virginia">
</head>
```

---

# Example SEO Head

OpenGraph (og): control the embeds on messaging and social media platforms.
Descriptive image ==> More clicks

```html{12-19}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Best Hiking Trails in Northern Virginia</title>
  <meta name="description" content="Discover top hiking trails in NoVA with maps.">
  <meta
    name="keywords"
    content="hiking, northern virginia, trails, maps, travel"
  />

  <meta property="og:title" content="Best Hiking Trails in Northern Virginia">
  <!-- description of your site... pretty self explanatory -->
  <meta property="og:description" content="Top routes, maps, and tips for every hiker.">
  <!-- Image people see. Must be absolute URL, hosted on either your server or a CDN -->
  <meta property="og:image" content="https://example.com/images/nova-hikes.jpg">
  <!-- permanent URL of your site... should be static! -->
  <meta property="og:url" content="https://example.com/hiking/northern-virginia">
</head>
```

---

```yaml
layout: center
```

No Open Graph tags, super boring. <img src="/no-seo.png" />

---

```yaml
layout: center
```

OG tags gives us a nice preview! <img src="/with-seo.png">

---

```yaml
layout: center
```

name="description" controls the small text snippet <img src="/dc-seo.png">

---

# Components

- New concept that allow us to go beyond plain HTML
- Extensive use in JS libraries
  - Not just limited to JS (e.g., Python w/ Jinja)
- Reusable HTML templates with some logic

---

# Components Example

Repeating ourselves a lot, and gets annoying to type all of these, cluttered
websites

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

# Components Example

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

[Shell Code](https://drive.google.com/file/d/1tP-TSFGRk7qWJ_xpaivt2w9Z89lMF0k_/view?usp=sharing)
-> https://tinyurl.com/tjdevclub-shell-12

---

```yaml
layout: last
```

# \</lecture\>
