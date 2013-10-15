_ = @_

View = Backbone.View::constructor
Backbone.View::constructor = (args...) ->
  result = View.apply @, args
  events = _.result @, 'events'

  for key, method of events
    # Split event name from selector (lifted from backbone.js)
    [original, eventName, selector] = key.match /^(\S+)\s*(.*)$/

    eventName += ".heap.delegateEvents#{@cid}"
    heapTrack = do (method) ->
      # TODO (matin): Avoid double-counting events.
      () => heap?.track method

    if selector is ''
      @$el.on eventName, heapTrack
    else
      @$el.on eventName, selector, heapTrack

  return result

undelegate = Backbone.View::undelegateEvents
Backbone.View::undelegateEvents = (args...) ->
  result = undelegate.apply @, args
  @$el.off ".heap.delegateEvents#{@cid}"
  return result
