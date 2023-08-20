import EventEmitter from './index.js';

const myEmitter = new EventEmitter();

const greetListener = name => {
  console.log(`Merhaba, ${name}!.`);
};

async function get() { 
  myEmitter.on('greet', greetListener);
}

async function test() {
  await get(); // Ensure the listener is added before emitting the event
  await myEmitter.emit('greet', 'Ahmet'); // "Merhaba, Ahmet!" output will be displayed
}

setTimeout(async () => {
  await test();
}, 4000);
