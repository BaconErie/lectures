---
theme: ./../
title: Beginner CSS
---

# CSS and Styling

TJ Dev Club

---

# How do we get our website from this...

<img src="/before-css.png" style="width: auto; height: 350px;">

---

# ...to this?

<img src="/after-css.png" style="width: auto; height: 400px;">

---

# Let's begin with some HTML.

We need some HTML to style. That is, we are going to add color to it, change
sizes, fonts, etc.

Open up your HTML file from last week.

If you don't have it, you can use this template: LINK HERE

---

Find the `<head>` tag, and make sure you put your cursor between the `<head>`
and `</head>`.

```html{3-7}
<!DOCTYPE html>
<html>
  <head>
    <title>My wobsite</title>

    <!-- Make sure you are going to work between the <head> tags! -->
  </head>

  <!-- Body code omitted -->
</html>
```

---

# The \<style\> tag

We gotta tell the browser the instructions on how to style the website.

This is going to be done in a new language called **Cascading Style Sheets**, or
**CSS** for short.

We put our CSS between `<style>` and `</style>` tags, which **tells the browser
we are** **entering the styling language zone**

---

# The \<style\> tag

In **between the head tags**, write a new set of `<style></style>` tags.

```html{4-6}
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Get ready to work in here! */
    </style>
  </head>
</html>
```
