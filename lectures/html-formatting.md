---
theme: ./../
title: HTML Formatting Basics
---

# HTML Formatting (Intro)
Short, focused slides on the basic HTML document structure.

---
hideInToc: true
---

# Table of Contents
<Toc />

---
layout: default
---

# <!doctype html>

```html {1} [index.html]
<!doctype html> <!-- ← Doctype: tell the browser to use HTML5 -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome.</p>
  </body>
</html>
```

---
layout: default
---

# <html>

```html {2,11} [index.html]
<!doctype html>
<html lang="en"> <!-- ← Root element; wraps the whole page -->
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome.</p>
  </body>
</html> <!-- ← Closing </html> ends the document -->
```

---
layout: default
---

# <head>

```html {3-7} [index.html]
<!doctype html>
<html lang="en">
  <head> <!-- ← Page metadata (not shown on the page) -->
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome.</p>
  </body>
</html>
```

---
layout: default
---

# <meta charset="utf-8">

```html {4} [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"> <!-- ← Text encoding: support emojis and all characters -->
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome.</p>
  </body>
</html>
```

---
layout: default
---

# <title>

```html {5} [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Page</title> <!-- ← Shown on the browser tab -->
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome.</p>
  </body>
</html>
```

---
layout: default
---

# <body>

```html {7-10} [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body> <!-- ← Visible page content goes here -->
    <h1>Hello</h1>
    <p>Welcome.</p>
  </body>
</html>
```

---
layout: default
---

# <h1>

```html {8} [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1> <!-- ← Main heading for the page -->
    <p>Welcome.</p>
  </body>
</html>
```

---
layout: default
---

# <p>

```html {9} [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome.</p> <!-- ← Paragraph of text -->
  </body>
</html>
```

---
layout: default
---

# Closing tags

```html {2,3,5,7,8,9,10,11} [index.html]
<!doctype html>
<html lang="en"> <!-- opening tag -->
  <head> <!-- opening tag -->
    <meta charset="utf-8"> <!-- void element: no closing tag -->
    <title>My Page</title> <!-- has closing tag below -->
  </head> <!-- closing tag -->
  <body> <!-- opening tag -->
    <h1>Hello</h1> <!-- opening + closing -->
    <p>Welcome.</p>
  </body> <!-- closing tag -->
</html> <!-- closing tag -->
```

---
layout: default
---

# Attributes

```html {2,8} [index.html]
<!doctype html>
<html lang="en"> <!-- ← Attribute name="value" (here: lang="en") -->
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
  </head>
  <body>
    <h1 class="title">Hello</h1> <!-- ← class attribute adds a label for CSS/JS -->
    <p>Welcome.</p>
  </body>
</html>
```

---
layout: default
---

# Comments

```html {1,8} [snippet.html]
<!-- This is a comment --> <!-- ← Not rendered on the page -->
<h1>Hello</h1>
<p>Welcome.</p>
<!-- TODO: add a link --> <!-- ← Use for notes to yourself -->
```

---
layout: default
---

# Indentation & Nesting

```html {2-6} [index.html]
<body>
  <header>
    <h1>Site</h1>
    <nav>
      <a href="#">Home</a>
    </nav>
  </header>
</body>
```

- Indent children under their parent for readability.

---
layout: last
---

# </lecture>


