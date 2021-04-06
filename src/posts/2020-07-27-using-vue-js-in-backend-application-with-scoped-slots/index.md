---
layout: post
title: "Using Vue.JS in backend application with Scoped Slots"
category: Dev
description: "If you ever have implement Vue.JS or any others UI libraries like React in your backend application, you probably know that there are multiples ways to achieve that."
lang: en
---

If you ever have implement [Vue.JS](https://vuejs.org/) or any others UI libraries like [React](https://reactjs.org/) in your backend application, you probably know that there are multiples ways to achieve that.

Vue.JS is a **progressive framework** to build UIs. It means that you don't have to use it everywhere to make it work. You can add component after component without rewriting your app from the ground up.

In these examples, I will use the [ERB](https://en.wikipedia.org/wiki/ERuby) templating language, but it's exactly the same with [Twig](https://twig.symfony.com/), [Blade](https://laravel.com/docs/7.x/blade) or any other templating system.

## How to use Vue.JS in backend

Basically, there are three ways to use both tools together.

### 1. Inject props in component

```html
<BlogPost title="<%= @post.title %>" content="<%= @post.content %>"></BlogPost>
```

This code will be rendered:

```html
<BlogPost title="My awesome blog post" content="My content"></BlogPost>
```

Here, `title` and `content` will be accessible in your `BlogPost` component as variables:

```html
<template>
  <div>
    <h2>{{ title }}</h2>

    <div>{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },

    content: {
      type: String
    }
  }
}
</script>
```

**Tip**: You can use [`v-bind`](https://vuejs.org/v2/guide/components-props.html#Passing-Static-or-Dynamic-Props) to convert strings to `Boolean`, `Number`, `Object` or `Array`.

A better approach to achieve that would be to serialize the `post` using the `v-bind` shorthand.

```ruby
<BlogPost :post="<%= @post.to_json %>"></BlogPost>
```

And use `post` as an object in your component.

```html
<template>
  <div>
    <h2>{{ post.title }}</h2>

    <div v-pre>{{ post.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
}
</script>
```

### 2. Retrieve data from an API

For more complicated components, sometimes it's easier to call an API to retrieve data.

For instance, to load all the blog posts in your `ERB` template:

```html
<p>Hello <%= current_user.name %></p>

<BlogPosts />
```

A simplified version of this component would be:

```html
<template>
  <BlogPost v-for="post in posts" :post="post" :key="post.id">
</template>

<script>
export default {
  data: () => ({
    posts: []
  }),

  mounted () {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => {
        this.posts = data.posts
      })
  }
}
</script>
```

With this approach, your component is a black box for your backend application.

Moreover, your browser **needs to download all your JavaScript** and load Vue.JS in order to retrieve your posts data. So for a moment your page **will be blank**.


### 3. Using scoped slots

[Scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) are not easy to understand. They are a particular form of [slots](https://vuejs.org/v2/guide/components-slots.html).

A slot defines a location to inject content in a component.

```html
<BlogPost>
  <h2><%= @post.title %></h2>
</BlogPost>
```

In your component, `<slot></slot>` will be replaced by the content inside your component declaration:

```html
<template>
  <slot></slot>
</template>
```

It's useful because they are easier than `props` to inject complex content in your component and use Vue.JS reactivity around that.

It would be even greater to use Vue to change your injected content and not only send data from parents to children! That's where `scoped slots` are used for.

## Using Scoped slots

Sometime you would like to **re-use the markup from your backend application** for multiple reasons.

You have your `helpers`, your custom `Form` Object, your `validators` or whatever.

For instance, we want to add a `DatePicker` component in our form, **without rewriting** the whole form in Vue.JS:

```jsx
<%= form_with(url: "/search", method: "get") do %>
  <%= label_tag(:start_at, "Start date:") %>

  <DatePicker>
    <%= text_field_tag(:start_at) %>
  </DatePicker>

  <%= submit_tag("Search") %>
<% end %>
```

If we want to send data **from children to parent**, we need to use `scoped slots`:

```jsx
<DatePicker v-slot="slotProps">
  <%= text_field_tag(:start_at, nil, ':value': 'slotProps.selectedDate') %>
</DatePicker>
```

Here, the `slotProps` contains all the parameters sent from `DatePicker` component to the slot. It's an `Object` and can contain anything, like an other `Object`, a `String` or even a `Function`.

In your `DatePicker` component:
```html
<template>
  <div>
    <slot :selectedDate="selectedDate"></slot>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedDate: new Date()
  })
}
</script>
```

To make `selectedDate` **available in the parent**, you need to bind it as an **attribute of the slot**. This is where all the magic happens!

And of course, you can send multiple parameters.

You can clean this up by using [destructuration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```html
<DatePicker v-slot="{ selectedDate }">
  <%= text_field_tag(:start_at, nil, ':value': 'selectedDate') %>
</DatePicker>
```

The value of your `text_field_tag` will be dynamically updated by Vue.JS when `selectedDate` is modified.

You can also use `Function` which blew my mind the first time I used it:

```html
<ExampleComponent v-slot="{ handleClick }">
  <div @click.prevent="handleClick">Click me!</div>
</ExampleComponent>
```

Vue.JS reactivity and custom events in ERB template 🤯.

## Conclusion

I think `scoped slots` are a nice way to progressively add Vue to your application.

You can do so many things with `scoped slots` like [renderless components](https://adamwathan.me/renderless-components-in-vuejs/).

[Here's a video](https://www.youtube.com/watch?v=GWdOucfAzTo) explaining how it works in details.

I hope this helps.

Thanks. 👋
