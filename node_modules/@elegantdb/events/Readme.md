
```markdown
# ElegantDB EventEmitter

`ElegantDB EventEmitter` is a lightweight and simple event emitter module designed specifically for the `elegantdb` module.

## Installation

You can install the `elegantdb` module using npm:

```bash
npm install @elegantdb/events
```

## Usage

Here's how you can use the `ElegantDB EventEmitter` in your project:

```javascript
const { EventEmitter } = require('@elegantdb/events');

// Create a new instance of ElegantDB EventEmitter
const emitter = new EventEmitter();

// Define event listeners
const onConnect = () => {
  console.log('Connected to the database');
};

const onDataReceived = data => {
  console.log('Received data:', data);
};

// Register event listeners
emitter.on('connect', onConnect);
emitter.on('data', onDataReceived);

// Emit events
emitter.emit('connect'); // Outputs: Connected to the database
emitter.emit('data', 'Sample data'); // Outputs: Received data: Sample data

// Check if a specific listener is registered for an event
console.log(emitter.hasListener('connect', onConnect)); // Outputs: true
console.log(emitter.hasListener('disconnect', onConnect)); // Outputs: false

// Remove an event listener
emitter.off('connect', onConnect);
emitter.emit('connect'); // No output, as the listener was removed
```

## API

### `on(event, listener)`

Registers an event listener for the specified event.

- `event`: A string representing the event name.
- `listener`: A function that will be called when the event is emitted.

### `emit(event, ...args)`

Emits an event with the provided arguments.

- `event`: A string representing the event name.
- `...args`: Arguments to be passed to the event listeners.

### `off(event, listener)`

Removes a specific event listener.

- `event`: A string representing the event name.
- `listener`: The listener function to remove.

### `hasListener(event, listener)`

Checks if a specific listener is registered for the event.

- `event`: A string representing the event name.
- `listener`: The listener function to check.
- Returns `true` if the listener is registered, `false` otherwise.

## License

This module is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Bu `readme.md` dosyası, `ElegantDB EventEmitter` modülünün nasıl kullanılacağına dair temel bilgileri içerir. Lütfen gerekli düzenlemeleri ve modülün gerçek kullanımına uygun şekilde ayarlamayı unutmayın.
