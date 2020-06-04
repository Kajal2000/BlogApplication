let knex = require('../connection.js')

let insert_data = (post_data) => {
    return knex("registration").insert(post_data)
}
// login API

var login_email = (email_id) => {
    return knex.select("*").from("registration").havingIn("registration.email_id", email_id)
}
var login_password = (password) => {
    return knex.select("*").from("registration").havingIn("registration.password", password)
}

// Super Admin

var boolean_data = (boolean) => {
    return knex.select("*").from("registration").havingIn("registration.boolean", boolean)
}
// 
var update_data = (boolean,id)=>{
    return knex("registration").update(boolean).where("registration.id", id)
}
// // blog deatils
let insert = (post) => {
    return knex("userTable").insert(post)
}
// 
var admin_boolean_data = (boolean) => {
    return knex.select("*").from("registration").havingIn("registration.boolean", boolean)
}
//
var updatedA = (Approve,id)=>{
    return knex("userTable").update(Approve).where("userTable.id", id)
}

var get_data = ()=>{
    return knex("*").from("registration")
}

var getAproveAndblog_deatils = ()=>{
    return knex("registration")
    .join("userTable","registration.id", "userTable.id")
    .select("registration.boolean","AuthorName")
};
module.exports = {insert_data,login_email,login_password,boolean_data
    ,update_data,insert,admin_boolean_data,updatedA,
    getAproveAndblog_deatils,get_data}
