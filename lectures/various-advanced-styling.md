---
theme: ./../
title: Various Advanced Styling
---

# Various Advanced Styling

TJ Dev Club

---

# Intro

Assuming every one already knows basic CSS: selectors, declarations, properties

Beginner CSS slides are available to help you refresh if you need

---

# Position property

Used in conjunction with top, left, right, bottom.

Changes how the element is laid out on the screen.

```css{2-2}
div {
  position: absolute;
  top: 40px;
  left: 40px;
}
```

---

# position: static;

Default. Browser automatically lays it out.

```html {monaco-run}
<style>
  #target {
    position: static;
    top: 10px;
    right: 10px;
    background-color: green;
  }

  div {
    background-color: blue;
    color: white;
    margin: 5px;
  }
</style>

<div>1</div>
<div id="target">I AM THE TARGET</div>
<div>3</div>
```

---

# position: relative;

Moves the element from where it would normally be. The gap where it normally
would be is still there.

```html {monaco-run}
<style>
  #target {
    position: relative;
    top: 10px;
    right: 10px;
    background-color: green;
  }

  div {
    background-color: blue;
    color: white;
    margin: 5px;
  }
</style>

<div>1</div>
<div id="target">I AM THE TARGET</div>
<div>3</div>
```

---

# position: absolute;

Position relative to the container. No gap is left for it.

```html {monaco-run}
<style>
  #target {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: green;
  }

  div {
    background-color: blue;
    color: white;
    margin: 5px;
  }
</style>

<div>1</div>
<div id="target">I AM THE TARGET</div>
<div>3</div>
```

---

# BTW: z-index

z-index controls layering position. Only works with elements not positioned
static.

```html {monaco-run}
<style>
  #target {
    z-index: 1;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: green;
  }

  div {
    position: relative;
    z-index: 2;
    background-color: blue;
    color: white;
    margin: 5px;
  }
</style>

<div>1</div>
<div id="target">I AM THE TARGET</div>
<div>3</div>
```

---

# backdrop-filter

Set the background color to something not completely opaque, and then add
`backdrop-filter` to `blur` to make a glass background.

```html {monaco-run}
<style>
  #inside {
    position: absolute;
    background-color: #ffffff55;
    margin: 55px;
    padding: 100px;
    backdrop-filter: blur(10px);
  }

  #wrapper {
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1280px-HTML5_logo_and_wordmark.svg.png");
    background-size: contain;
    width: 100%;
    height: 100vh;
  }
</style>

<div id="wrapper">
  <div id="inside">Hello</div>
</div>
```

---

# Custom Fonts

---

# Custom Fonts

Get a copy of
[IBM Plex Mono](https://drive.google.com/file/d/1KOSMCZa8GYINVzqGAbfB8sRINGK2nThf/view?usp=sharing)
or find another font on [fonts.google.com](https://fonts.google.com/).

Download the template HTML file.

---
