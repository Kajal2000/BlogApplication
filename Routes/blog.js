const express = require('express');
const blog_app = express.Router();
const blog_appDB = require("../Model/blogDB")
var jwt = require("jsonwebtoken")

blog_app.post("/regApi", (req, res) => {
    post_data = {
        Name: req.body.Name,
        Email_id: req.body.Email_id,
        Password: req.body.Password,
        SuperAdmin: req.body.SuperAdmin,
        Admin: req.body.Admin
    }
    blog_appDB.insert_data(post_data)
        .then(() => {
            res.send("inserted data")
        }).catch((err) => {
            console.log(err)
        })
})
// login Api
blog_app.post("/loginApi", (req, res) => {
    var Email_id = req.body.Email_id;
    var Password = req.body.Password;
    blog_appDB.login_email(Email_id)
        .then((logindata) => {
            if (logindata.length == 0) {
                res.send("Email is wrong")
            } else {
                blog_appDB.login_Password(Password)
                .then((logindata) => {
                    if (logindata.length == 0) {
                        res.send("Password is wrong")
                    } else {
                        let newToken = jwt.sign({ "blog_app": logindata }, "kajal")
                        res.cookie(newToken)
                        res.send('loing successsful')
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
        })
});

// Access!!!!!

blog_app.put("/adminApi/:User_id", (req, res) => {
    var User_id = req.params.User_id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length - 2]).slice(2, 600)
    jwt.verify(token, 'kajal', (err, data) => {
        var SuperAdmin = data["blog_app"][0]['SuperAdmin']
        // res.send(SuperAdmin)
        if (SuperAdmin == "Kajal Sharma") {
            var data1 = {
                Admin: req.body.Admin
            }
            blog_appDB.update_data(data1, User_id)
                .then(() => {  
                    res.send("update")
                })
                .catch((err) => {
                    res.send(err)
                })
        }
        else {
            res.send(err)
        }

    })
});

blog_app.get("/airtcleApi/:User_id", (req,res) => {
    var User_id = req.params.User_id
    blog_appDB.get_data_id(User_id)
    .then((res_data) => {
        var User_ID = res_data[0]["User_id"]         
        var post = {
            Title : req.body.Title,
            Content : req.body.Content,
            AuthorName : req.body.AuthorName,
            Feature_img : req.body.Feature_img,
            Date: new Date(),
            Approve : req.body.Approve,
            User_id : User_ID
        }
        blog_appDB.insert(post)
        .then(()=>{
            res.send("inserted")
        })
    }).catch((err) => {
        console.log(err)
    })
})

// Aprove 
blog_app.put("/Api/:id", (req, res) => {
    var id = req.params.id 
    blog_appDB.get_all_data()
        .then((res_data) => {
            var SuperAdmin  = res_data[0]["SuperAdmin"]
            var Admin  = res_data[0]["Admin"]
            if (SuperAdmin == "Kajal Sharma") {
                if(Admin == "zeba parween"){
                    var Approve = "True"
                    var Approve_data = {
                        Approve: Approve
                    }
                blog_appDB.updatedA(Approve_data, id)
                    .then(() => {
                        res.send("updated")
                    })
                    .catch((err) => {
                        console.log(err)
                        res.send(err)
                    })
                }
            else {
                console.log("something wrong")
                }
            }
        })
});

// approved by written bye name

blog_app.get("/getAPi", (req, res) => {
    blog_appDB.getAproveAndblog_deatils()
    .then((res_data) => {
        // console.log(res_data);
        var array = []
        var Admin = res_data[0]["Admin"]
        for(var i =0; i<res_data.length; i++){
            var Approve = res_data[i]["Approve"]   
            var SuperAdmin = res_data[i]["SuperAdmin"]
            var Author_name = res_data[i]["AuthorName"] 
            if (Approve == "True") {
                var data1 = {
                    AuthorName: Author_name,
                    SuperAdmin: SuperAdmin,
                    Admin: Admin
                }
                array.push(data1)
            }
        }
        res.send(array)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = blog_app;
