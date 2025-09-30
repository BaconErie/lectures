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

Notice that in CSS, our comments are surrounded by `/* */` instead of
`<!-- -->`.

Remember that comments are notes for us and other humans and are ignored by the
computer.

---

# Milestone

Check with the officer and make sure you've loaded your HTML correctly and put
your tags in the right place.

```html{4-7}
<!DOCTYPE html>
<html>
  <head>
    <!-- <style> tags between <head> tags -->
    <style>
      /* CSS between <style> tags */
    </style>
  </head>
</html>
```

---

# Thinking like the computer

Let's consider our first goal: we want to change the background color to
something other than default white.

Think about what information the computer needs or what we need to tell the
computer in order for it to achieve that goal.

Obviously we need to tell it what color we want the background to be set to, but
_first_ we need to select the element that we want to change the background of.

---

# Thinking like the computer

There are so many elements on this page (the h1 element, the two p elements, the
image element, the div element, the body element, etc.)

We need to choose one to style.

<img src="/beginner-css-1.png" style="width:auto; height: 250px; border-radius: 5px">

---

# Changing background color

In our style tag, let's select the `<body></body>` element by writing in "body".

We then put a set of curly braces `{ }`. We will put our instructions on how to
style the page inside those braces later.

```html{5-6}
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
      }
    </style>
  </head>
</html>
```

The body element is the background we see, so we need to select that to change
the background color.

---

# Changing background color

Now, let's actually put an instruction inside the curly braces. Each instruction
is called a _declaration_. It follows the format: `PROPERTY: VALUE;`

Let's set the `background-color` attribute to `blue`.

```html{5-7}
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-color: blue;
      }
    </style>
  </head>
</html>
```

---

# Milestone

Check with the officer and make sure the background is blue.

```html {monaco-run}
<!doctype html>
<html>
  <head>
    <title>My wobsite</title>
    <style>
      body {
        background-color: blue;
      }
    </style>
  </head>

  <body>
    <h1>My wobsite!</h1>

    <p>Hi! This is where I write about it in my blag.</p>

    <div>
      <p>Picture of me:</p>
      <img src="https://www.explainxkcd.com/wiki/images/4/46/Cueball.png" />
    </div>
  </body>
</html>
```

---

# Changing the font color

It's hard to read the black text with this blue background.

Try on your own to set the `h1` tag's font color to white, using the `color`
property.

You can either set the value to `white`, or specify a color in _hexadecimal_
format. In this case, pure white is `#ffffff`.

You can get the hex code from a color picker, such as the
[Google color picker](https://www.google.com/search?q=color+picker).

Check in with your officer once you have done this.

---

# Changing the font color

You should have:

```html{9-11}
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-color: blue;
      }

      h1 {
        color: #ffffff;
      }
    </style>
  </head>
</html>
```

---

# The \* selector

What if we want to change the font color for all elements? It would be tedious
or even impossible to select each element individually.

Instead, we can select all elements using `*`, instead of the name of an
element.

Try to change the font color of all elements to white right now.

---

# Changing the font color

You should have:

```html{9-11}
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-color: blue;
      }

      * {
        color: #ffffff;
      }
    </style>
  </head>
</html>
```

We removed the `h1` styling because it is no longer necessary.

---

# The meaning of "Cascading"

Add back a declaration block for `h1` elements. Set the font color to red.

```css{5-11}
body {
  background-color: blue;
}

* {
  color: #ffffff;
}

h1 {
  color: red;
}
```

We now have two declarations that changes the font color for `h1` elements: the
one selected by `*`, and the one selected by `h1`.

Which one is used?

---

```yaml
layout: image-right
image: /beginner-css-cascading.png
backgroundSize: 70%
```

# The meaning of "Cascading"

Notice that now the h1 tag is now red, not white.

The most specific declaration is used for styling.

This is what "cascading" means: authority starts from the most broad declaration
and "cascades" down to the most specific.

---

# class and id

The "Picture of me:" text should be special. Let's change the color of only that
text to yellow.

Let's try to do it by selecting the `p` tags, and coloring them green. Do you
see the problem?

```css
p {
  color: yellow;
}
```

---

```yaml
layout: image-right
image: /beginner-css-before-id.png
backgroundSize: 70%
```

# class and id

Ignoring the readability problem, notice that ALL `p` elements have green text.

We need some way to specify which element we are selecting, some _identifier_.

---

# class and id

To do this, we need to go back into the HTML.

Find an element you want to style. Then, add the HTML attribute `id=""`. Put a
relevant and useful identifier between the quotes. Make sure not to use spaces.

```html
<body>
  <div>
    <p id="picture-caption">Picture of me:</p>
  </div>
</body>
```

---

```yaml
layout: image-right
image: /beginner-css-after-id.png
backgroundSize: 70%
```

# class and id

Notice now only the "Picture of me" text is green.

Check in with your officer and make sure only the selected element with the id
is green.

---

# class and id

---

# Cool selectors

font, border, shadow,

# Sizing..

insane madness.
