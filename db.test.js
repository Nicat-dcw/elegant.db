const { Database, JSONAdaptor, ElegantAdaptor }= require( './dist/esm/index.js' )
const db = new Database({ adaptor: JSONAdaptor, path: "", disableCheckUpdates: false })
/*db.add("hi", +1)
event.emit("test", "xd")
db.on("dataset", (i) => console.log(i))
console.log(db.has("hi"))*/

test('Set a variable with key to database', () => {
  expect(db.set("hi", "Welcome"))
})