let knex = require("./connection.js")

knex.schema.createTable("User", (table) => {
    table.increments("User_id")
    table.string("Name")
    table.string("Email_id")
    table.string("Password")
    table.string("SuperAdmin")
    table.string("Admin")

}).then(()=>{
    console.log("created tbl")
}).catch((err)=>{
    console.log(err)
})

// second tbl for blog deatils.

knex.schema.createTable("Article", (table) => {
    table.increments("id")
    table.string("Title")
    table.string("Content")
    table.string("AuthorName")
    table.string("Feature_img")
    table.string("Date")
    table.string("Approve")
    table.integer("User_id").unsigned()
    table.foreign("User_id").references("User.User_id")
}).then(()=>{
    console.log("created tbl")
}).catch((err)=>{
    console.log(err)
})

//

