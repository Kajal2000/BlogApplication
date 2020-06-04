const express = require('express');
const blog_app = express.Router();
const blog_appDB = require("../Model/blogDB")
var jwt = require("jsonwebtoken")

blog_app.post("/regApi",(req, res) => {
    post_data = {
        userName: req.body.userName,
        email_id: req.body.email_id,
        password: req.body.password,
        boolean : req.body.boolean
    }
    blog_appDB.insert_data(post_data)
        .then(() => {
            res.send("inserted data")
        }).catch((err) => {
            console.log(err)
    })
})
// login Api
blog_app.post("/loginApi",(req, res) => {
    var email_id = req.body.email_id;
    var password = req.body.password;
    blog_appDB.login_email(email_id)
    .then((logindata)=>{
            if (logindata.length == 0){
            res.send("Email is wrong")
        }else{blog_appDB.login_password(password)
            .then((logindata) =>{
            if (logindata.length == 0){
                res.send("Password is wrong")
            }else{
                let newToken = jwt.sign({ "blog_app" : logindata }, "kajal")
                    res.cookie(newToken)
                    res.send('loing successsful')
                }
            })
        }
    }).catch((err)=>{
        console.log(err); 
    })
});

// superAdmin and Admin
blog_app.put("/adminApi/:id",(req, res) => {
    var id = req.params.id
    var boolean = req.body.boolean;
    blog_appDB.boolean_data(boolean)
    .then((logindata)=>{
        var booleanData = logindata[0]["boolean"]
        if (booleanData == "True"){
            var boolean_data = "True"

            var boolean1 = {
                boolean : boolean_data
            }
            blog_appDB.update_data(boolean1,id)
            .then(()=>{
                res.send("updated")
            })
            .catch((err)=>{
                res.send(err)
                console.log(err)
            })
        }
        else{
            console.log("something wrong")
        }
    })
});

// // blog deatils
blog_app.post("/userApi",(req, res) => {
    post = {
        Title: req.body.Title,
        Content: req.body.Content,
        AuthorName: req.body.AuthorName,
        Feature_img : req.body.Feature_img,
        Approve : req.body.Approve,
        Date : new Date()
    }
    blog_appDB.insert(post)
        .then(() => {
            res.send("inserted data")
        }).catch((err) => {
            console.log(err)
    })
})

// 
blog_app.put("/Api/:id",(req, res) => {
    var id = req.params.id
    var boolean = req.body.boolean;
    blog_appDB.boolean_data(boolean)
    .then((logindata)=>{
        var booleanData = logindata[0]["boolean"]
        console.log(booleanData)
        if (booleanData == "True"){

            var Approve = "Yes"

            var Approve_data = {
                Approve : Approve
            }
            blog_appDB.updatedA(Approve_data,id)
            .then(()=>{
                res.send("updated")
            })
            .catch((err)=>{
                res.send(err)
                console.log(err)
            })
        }
        else{
            console.log("something wrong")
        }
    })
});

// approved by written bye name

blog_app.get("/getAPi",(req,res)=>{
    blog_appDB.getAproveAndblog_deatils()
    .then((res_data)=>{
        // console.log(res_data)
        var Author_name = res_data[0]["AuthorName"]
        blog_appDB.get_data()
        .then((data)=>{
            for (var i = 0; i < data.length; i++){
                var boolean_data = data[i]["boolean"]
                if (boolean_data == "True"){
                    var userName = data[0]['userName']
                    var userName1 = data[1]['userName']
            }
            var data1 = {
                AuthorName : Author_name,
                superAdmin : userName,
                Admin : userName1
            }
            res.send(data1)
            }
        }).catch((err)=>{
            res.send(err)
        })
    })
})

module.exports = blog_app;
