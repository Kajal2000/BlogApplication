let knex = require("./connection.js")

knex.schema.createTable("registration", (table) => {
    table.increments("id")
    table.string("userName")
    table.string("email_id")
    table.string("password")
    table.string("boolean")
}).then(()=>{
    console.log("created tbl")
}).catch((err)=>{
    console.log(err)
})

// second tbl for blog deatils.

knex.schema.createTable("userTable", (table) => {
    table.increments("id")
    table.string("Title")
    table.string("Content")
    table.string("AuthorName")
    table.string("Feature_img")
    table.string("Date")
    table.string("Approve")
}).then(()=>{
    console.log("created tbl")
}).catch((err)=>{
    console.log(err)
})