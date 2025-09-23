---
theme: ./../
title: Beginner HTML
---

# \<html\>
TJ Dev Club

---

# What's the commonality?

<img src="/html-only.png" alt="HTML Website" class="rounded-lg shadow-lg w-[80vh]">

---

# What's the commonality?

<img src="/css-page.png" alt="HTML and CSS Website" class="rounded-lg shadow-lg w-[80vh]">

---
layout: last
---

# They both use HTML!

---

# Table of Contents

1. What is HTML?
2. The Formatting of HTML
3. See the Similarities?
4. HTML Tags (many of them)
5. HTML Attributes
6. Putting Everything Together
7. Mini Project

---

# What is HTML?

- **H**yper**T**ext **M**arkup **L**anguage -> HTML
- Structures and formats a website (similar to APA or MLA!)
- Every website uses HTML. Some use CSS and JS.

You'll be using HTML all the time in Dev Club. Seriously.

---

# The Formatting of HTML
- Of course, there is a certain way to format HTML
- Some parts aren't required, but are recommended
- Works in **TAGS**

<br>

## <center>\<p\>hi dev club :)\<p\></center>
 
---

# See the Similarities?

```java
package club.tjdev; // <!doctype html>

public class Main { // <html>
    public static void main(String[] args) { // <body>
        // inner code (e.g., h1, h2, etc.)
    } // </body>
} // </html>
```

---

# \<!doctype html\>

\<!doctype html\> is not *strictly* required, but you should always include it. It basically tells the browser to use HTML5 (you don't need to remember that, dw).

```html {1} [index.html]
<!doctype html>
<html lang="en">
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>Welcome.</p>
  </body>
</html>
```
---

# \<html\>

Think of this like starting a `class` in Java. It holds *everything*.

```html {2,4} [index.html]
<!doctype html>
<html lang="en">
  <!-- document root -->
</html>
```

---

# \<head\>

The \<head\> tag stores metadata (e.g., title, favicon, seo).

```html {3,5} [index.html]
<!doctype html>
<html lang="en">
  <head>
    <!-- metadata, title, styles -->
  </head>
  <body>
  </body>
</html>
```

---

# \<body\>

This is the bread and butter of HTML. All the text, images, and whatever else you put on the page is held within here.

```html {4,6} [index.html]
<!doctype html>
<html lang="en">
  <head></head>
  <body>
    <!-- page content, your images, text, etc. -->
  </body>
</html>
```

---
layout: default
---

# What About Text?

```html {monaco-run}
<h1>
    biggest text (1 is the biggest)
</h1>
<h2>
    smaller big text (2)
</h2>
<h3>
    ...you get the point (this is 3)
</h3>
<p>
    paragraph text!!!! so i was looking at this club called dev club and its really
    cool and awesome and i think every student at tj should go if they want to get into
    a really good cool awesome college and stuff. its a really cool awesome club bc when
    you really think about it making websites is the future and its a very valuable skill.
</p>
```

---
layout: default
---

# Fancy Text?

```html {monaco-run}
<h2>
    Bold and Italic
</h2>
<p>
    this is <strong>bold</strong> and this is <em>italic</em>.
</p>
```

---
layout: default
---

# HTML Attributes
Some HTML tags require special properties, called **attributes**.

```html {monaco-run}
<h2>
    Image with attributes
</h2>
<img src="/html-only.png" alt="HTML Only Example" width="300" title="HTML only page"> <!-- NO CLOSING TAG!!! -->

<h2>
    Link with attributes
</h2>
<p>
    Visit <a href="https://tjdev.club" target="_blank" rel="noopener noreferrer" title="Visit TJ Dev Club">TJ Dev Club</a> in a new tab.
</p>
```

---
layout: default
---
# Putting Everything Together

```html {monaco-run}
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>
            This shows on the browser tab!
        </title>
    </head>
    <body>
        <h1>
            hi <strong>dev club</strong>
        </h1>
        <p>
            do you love dev club? <em>i do!!!</em>
        </p>
        <img src="/html-only.png" alt="HTML Only Example" width="300" title="HTML only page">
        <p>
            Visit <a href="https://tjdev.club" target="_blank" rel="noopener noreferrer" title="Visit TJ Dev Club">TJ Dev Club</a>
        </p>
    </body>
</html>
```

---

# Mini Project
- Setup a Director site (static) w/ an officer
- Create your own blog site

```html {monaco-run}
<!doctype html>
<html>
    <head>
        <title>WELCOME TO DEV CLUB BLOG</title>
    </head>
    <body>
        <h1>Dev Club Blog</h1>
        <p> a developers dream! </p>
        <br>
        <h2>why i hate pigeons</h2>
        <h4>by dev club officers</h4>
        <br>
        <p>i hate pigeonins because they are <strong>EVIL!!!!</strong>. i mean <em>really</em> think about it, why wouldn't the <a href="https://cia.gov">CIA</a> use pigeons as spying devices. it's honestly super crazy that people think pigeons are real. look at this leaked image
        <img src="https://preview.redd.it/row4ll2734v21.jpg?width=640&crop=smart&auto=webp&s=9175ddb3be60ac4b0de319d6f2aabd3ced84a78d">
    </body>
</html>
```

---
layout: last
---

<h1>&lt;/html&gt;</h1>