/*
  This library wraps the existing DOM events system.  It exposes the existing
  system in pub-sub way. It's just sugar.  This library is 100% specific to the
  DOM (browser only) and has no application on the server side.

  registerAnEasyEvent
  subscribeToAnEasyEvent
  publishAnEasyEvent

  registerAnEasyEvent
  Creates an event that can be published or subscribed to.

  subscribeToEasyEvent
  Declares a function that should be executed whenever the event it fired.

  publishAnEasyEvent
  Declares that an event happenned.

  USAGE:

    function loadedHandler() {
      alert('I handle being loaded... lol.');
    }
    
    var $EDE = EasyDomEvents();

    //  First register an event.
    $EDE.register('loaded');

    //  Second subscribe to an event.
    $EDE.subscribe('loaded', loadedHandler);

    //  Third publish the event.
    $EDE.publish('loaded');

*/

function EasyDomEvents() {
  var events = {};

  function executeEasyDomEventsCallbacks(eventName) {
    var callbacks = [];
    if (events[eventName]) {
      callbacks = events[eventName];
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i]();
      }
    }
  }

  function registerAnEasyEvent(eventName) {
    document.addEventListener(eventName,
      function(data) {
        executeEasyDomEventsCallbacks(eventName);
      }
    );
  }

  function subscribeToAnEasyEvent(eventName, callback) {
    if (!events[eventName]) {events[eventName] = [];}

    events[eventName].push(callback);
  }

  function publishAnEasyEvent(eventName) {
    document.dispatchEvent(new Event(eventName));
  }

  var eventSystem = {};
  eventSystem.register = registerAnEasyEvent;
  eventSystem.subscribe = subscribeToAnEasyEvent;
  eventSystem.publish = publishAnEasyEvent;

  return eventSystem;
};
