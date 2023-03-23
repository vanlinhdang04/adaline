const EmitEvents = {
  socket: {},
  events: {},
  dispatch: (event, data) => {
    let handlers = EmitEvents.events[event];
    if (handlers) {
      handlers.forEach((handler) => {
        handler(data);
      });
    }
  },
  subscribe: (event, handler) => {
    if (!EmitEvents.events[event]) EmitEvents.events[event] = [];
    EmitEvents.events[event].push(handler);
    return handler;
  },
  unsubscribe: (event, handler) => {
    if (!EmitEvents.events[event]) return;
    if (!handler) {
      delete EmitEvents.events[event];
    } else {
      EmitEvents.events[event] = EmitEvents.events[event].filter(
        (h) => handler != h
      );
    }
  },
};
module.exports = {
  EmitEvents,
};
