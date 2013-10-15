(function() {
  var View, _,
    __slice = [].slice;

  _ = this._;

  View = Backbone.View.prototype.constructor;

  Backbone.View.prototype.constructor = function() {
    var args, eventName, events, heapTrack, key, method, original, result, selector, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    result = View.apply(this, args);
    events = _.result(this, 'events');
    for (key in events) {
      method = events[key];
      _ref = key.match(/^(\S+)\s*(.*)$/), original = _ref[0], eventName = _ref[1], selector = _ref[2];
      eventName += ".heap.delegateEvents" + this.cid;
      heapTrack = (function(method) {
        var _this = this;
        return function() {
          return heap.track(method);
        };
      })(method);
      if (selector === '') {
        this.$el.on(eventName, heapTrack);
      } else {
        this.$el.on(eventName, selector, heapTrack);
      }
    }
    return result;
  };

}).call(this);
