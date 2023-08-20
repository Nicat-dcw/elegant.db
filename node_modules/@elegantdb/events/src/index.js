class EventEmitter {
  constructor() {
    /**
     * @private
     * @type {Object.<string, Function[]>}
     */
    this.events = {};
  }
  /**
   * Register an event listener for the specified event.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The event listener function.
   */
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  /**
   * Learn information about listener is working with event name.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The event listener function.
   */
  hasListener(event, listener) {
    if (!this.events[event]) {
      return false;
    }
    const isAvaliable = this.events[event];
    return isAvaliable.includes(listener)
  }

  /**
   * Emit an event with the provided arguments.
   * @param {string} event - The name of the event to emit.
   * @param {...any} args - Arguments to be passed to the event listeners.
   */
  emit(event, ...args) {
  const listeners = this.events[event] || [];
  for (const listener of listeners) {
    if (typeof listener === 'function') {
      listener(...args);
    }
  }
}

  /**
   * Remove a specific event listener.
   * @param {string} event - The name of the event.
   * @param {Function} listenerToRemove - The listener function to remove.
   */
  off(event, listenerToRemove) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        listener => listener !== listenerToRemove
      );
    }
  }

  /**
   * Add a one-time event listener.
   * @param {string} event - The name of the event to listen for once.
   * @param {Function} listener - The one-time listener function.
   */
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

export default EventEmitter;
