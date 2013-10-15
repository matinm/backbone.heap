# backbone.heap

A drop-in plugin that automatically captures all your Backbone.View events for analysis in [Heap](https://heapanalytics.com).

## Setup
1. Add [Heap](https://heapanalytics.com/signup) to your website.
2. Include `backbone.heap.js` in your site's `<head>` directly *after* including `backbone.js`:

```html
<head>
  <script src="underscore.js"></script>
  <script src="backbone.js"></script>
  <script src="backbone.heap.js"></script>
</head>
```

That's it! You'll immediately see rich, semantically-named events in your Heap dashboard.

## Benefits

1. No manual event tracking.
2. Automatically retroactive analysis.
3. Rich, semantic events.

By default, Heap lets you retroactively define events in terms of DOM event types and CSS selectors. For example, you may define an "Add to Shopping Cart" event after-the-fact as `click on div.btn.add-to-cart`.

But this would be a much more streamlined experience if we didn't have to name these events at all. Luckily, in Backbone, every View's `events` hash names these user interactions for us!

This lets us eliminate the friction of finding/naming events like `addToShoppingCart`. Instead, your Heap account is instantly populated with understandable activity. No extra code required.

## Example

Let's take the following example Backbone.View.

```javascript
var DocumentRow = Backbone.View.extend({
  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  }
  ...
});
```

Every time a `click .icon` event occurs, Backbone.Heap sends an `open` event to your Heap account. Likewise for `openEditDialog` and `destroy`.
