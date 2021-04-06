---
layout: post
title: "Rendering React Components With Custom Elements"
category: Dev
lang: en
---

A common approach to render a component in React is to call the `ReactDOM.render` method on a DOM element. If you want to use both React and your backend templating engine at the same time, you're probably going to do something like that.

For instance, here we want to lazy load the comments of a post:

```html
<div id="post-comments" data-post="{{ $post->id }}" data-nested="true" />
```

```jsx
import {render} from 'react-dom'
import Comments from './Comments'

const component = document.querySelector('#post-comments')

if (component) {
  const props = {...component.dataset}

  render(<Comments {...props} />, component)
}
```

Or with explicit destructuring:

```jsx
if (component) {
  const {post, nested} = component.dataset

  render(
    <Comments
      post={post}
      nested={nested}
    />,
    component
  )
}
```

I personally find the [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) more elegant, but both of them are [a great way](https://reactjs.org/docs/components-and-props.html) to mount your components in React.

As I'm used to [Vue](https://vuejs.org/) syntax, I think it's too verbose and at the same time it's not very explicit that the `<div id="post-comments" />` tag will be replaced with a React Component at runtime. Moreover if I want to mount this component multiple times in the same page, I will need to change my code with a loop and a `querySelectAll`:

```html
<div class="post-comments" data-post="{{ $post->id }}" data-nested="true" />
<div class="post-comments" data-post="{{ $relatedPost->id }}" data-nested="false" />
```

```jsx
import {render} from 'react-dom'
import Comments from './Comments'

const components = document.querySelectorAll('.post-comments')

components.forEach(component => {
  const props = {...component.dataset}

  render(<Comments {...props} />, component)
})
```

We can loop over the items in the NodeList with a `forEach` loop and render each components once at a time. It increases the complexity of this code for nothing.

## Using Custom Elements

As I said, I would like to see something like this in my views because it's **explicit** and I know what I have to deal with on the first look:

```html
<post-comments post="{{ $post->id }}" nested="true" />
```

This is a [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). If you are not familiar with them, you should take a look because they are absolutely awesome 🤯! They are part of the [official HTML specification](https://html.spec.whatwg.org/multipage/custom-elements.html) which means they are native to browsers and are surprisingly [widely supported](https://caniuse.com/#feat=custom-elementsv1). Basically, if you're using React in your app, Custom Elements will work too.

It's not a React component nor a Vue component, it doesn't need ~~fancy~~ complicated tooling like [Babel](https://babeljs.io/) or Webpack to work, it's just a "dumb" JavaScript Class for your browser.

To define a `Custom Element`, you'll need to write a `class`, here's the basic structure:

```js
class PostComments extends HTMLElement {
  connectedCallback () {
    console.log('connected')
  }

  disconnectedCallback () {
    //
  }
}

customElements.define('post-comments', PostComments)

export default PostComments
```

`connectedCallback` and `disconnectedCallback` have a very close behaviour as the `componentDidMount` and `componentWillUnmount` in React or `mounted` and `destroy` in Vue.

Once the custom Element is appended to a document element in the brower, the `connectedCallback` is called. You can define a constructor too, like you would do in your React components.

You can call the same custom Elements multiple times because they are not related to an `id` and they don't share the same context, which is very useful.

From the previous example, the console will print `connected` 3 times:

```html
<post-comments />
<post-comments />
<post-comments />
```

Behind the scenes, they are still DOM related elements. It means that we can use attributes and render a React component on them like we always did. We can tweak a bit our previous `PostComments` custom Element:

```js
import {createElement} from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {Comments} from './Comments'

class PostComments extends HTMLElement {
  connectedCallback () {
    render(createElement(Comments), this)
  }

  disconnectedCallback () {
    unmountComponentAtNode(Comments)
  }
}
```

We still use the `render` and the `createElement` methods, but `this` is used as a container for React. That's where the magic happens!

Also, it feels wrong for me to use `data-* attributes` with custom elements, that's why I'd rather go with custom attributes.

```js
connectedCallback () {
  const props = Object.values(this.attributes).map(attribute => [attribute.name, attribute.value])

  render(createElement(Comments, Object.fromEntries(props)), this)
}
```

With this little tweak, we can use props in a seamlessly way!

```html
<post-comments post="{{ $post->id }}" nested="true" />
```

Instead of

```html
<post-comments data-post="{{ $post->id }}" data-nested="true" />
```

## In the end...

It may be overkill in some situations, which is true, but I find this very useful when your components list start to grow with your views.

If you want to try it in a "real world" application, I scaffolded a [Laravel](https://laravel.com/) application with the [React Preset](https://laravel.com/docs/7.x/frontend#using-react): 👉 [https://github.com/guillaumebriday/react-with-custom-elements](https://github.com/guillaumebriday/react-with-custom-elements)


Thanks. 👋
