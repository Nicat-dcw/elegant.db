const { Database, JSONAdaptor, ElegantAdaptor }= require( './dist/esm/index.js' )
const db = new Database({ adaptor: JSONAdaptor, path: "", disableCheckUpdates: false, useExperimentalCaches: true })
db.set("hi", "normall")
console.log(db.get("hi"))
async function test() {
  await db.all()
}
console.log((async() => await test()))
//db.remove("hi")
console.log(db.getCache())