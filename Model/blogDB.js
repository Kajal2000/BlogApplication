let knex = require('../connection.js')

let insert_data = (post_data) => {
    return knex("User").insert(post_data)
}
// login API

var login_email = (Email_id) => {
    return knex.select("*").from("User").havingIn("User.Email_id", Email_id)
}
var login_Password = (Password) => {
    return knex.select("*").from("User").havingIn("User.Password", Password)
}
//Access

var update_data = (data1,User_id)=>{
    return knex("User").update(data1).where("User.User_id",User_id)
}
// // blog deatils
var get_data_id = (User_id)=>{
    return knex("*").from("User").where("User.User_id",User_id)
}

let insert = (post) => {
    return knex("Article").insert(post)
}
var get_all_data = ()=>{
    return knex("*").from("User")
}
// ...............................................
var updatedA = (Approve,id)=>{
    return knex("Article").update(Approve).where("Article.id", id)
}

// // 
// var admin_boolean_data = (boolean) => {
//     return knex.select("*").from("User").havingIn("User.boolean", boolean)
// }

var get_data = ()=>{
    return knex("*").from("User")
}

var getAproveAndblog_deatils = ()=>{
    return knex("User")
    .join("Article","User.User_id", "Article.id")
    .select("User.SuperAdmin","Admin","AuthorName","Approve")
};
module.exports = {insert_data,login_email,login_Password,
    update_data,insert,
    updatedA,getAproveAndblog_deatils,get_data_id,get_all_data,get_data}
