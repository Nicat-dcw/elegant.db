const { Database, JSONAdaptor, ElegantAdaptor }= require( './dist/esm/index.js' )
const db = new Database({ adaptor: JSONAdaptor, path: "", disableCheckUpdates: false })
db.add("hi", +1)
console.log(db.has("hi"))
