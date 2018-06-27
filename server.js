// require express
var express = require("express");
// path module
var path = require("path");
var mongoose = require('mongoose');
var session = require('express-session');
var moment = require('moment');
// create the express app
var app = express();
app.use(session({
    secret: 'mattisking',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/DanielsMarketplace/dist/DanielsMarketplace' ));


//DB stuff
    mongoose.connect('mongodb://localhost/DanielsMarketplaces');
    var Schema = mongoose.Schema

    var UserSchema = new mongoose.Schema({
        id: {
            type: String,
        },
        locked: {
            type: Boolean,
        },
        admin: {
            type: Boolean,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        age: {
            type: Number,
        },
        email: {
            type: String,
        },
        orders: [{
            type: Object,
        }],
        password: String,
    }, { timestamps: true })

    var ItemSchema = new mongoose.Schema({
        type: {
            type: String,
        },
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        description: {
            type: String,
        },
        img_url: {
            type: String,
        },        
        _user: {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    }, { timestamps: true })

    mongoose.model('User', UserSchema);
    mongoose.model('Item', ItemSchema);

    var User = mongoose.model('User');
    var Item = mongoose.model('Item');
//end DB stuff

//routes
    //log-reg routes
        app.post('/loginUser', function (req, res) {
            console.log('looking for user in DB')
            User.findOne({email:req.body.email},function(err, user) {
                if(user != null) {
                    console.log('found user in server')
                    if(user.password != req.body.password) {
                        console.log("e0rr0r, wrong pass",)
                        res.json({errorMsg:'Wrong password'})
                    } else {
                        req.session.loggedUser = user;
                        // console.log('user', user)
                        // console.log('sesion', req.session)
                        res.json({message:'The Logged in one', loggedUser: user})
                    }
                } else {
                    res.json({errorMsg: 'user don\'t exists'})
                }
            })
        })
        app.post('/registerUser', function(req, res) {
            User.find({email: req.body.email}, function(err, user) {
                console.log('in server')
                if(user.length == 0) {            
                    console.log("creating new User in server")
                    newUser = new User();
                    newUser.admin = req.body.admin;
                    newUser.locked = false;
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;
                    newUser.email = req.body.email;
                    newUser.password = req.body.password;
                    console.log(user)
                    newUser.save(function(err) {
                        if(err){
                            console.log('new user error')
                            res.json({err})
                        }else{
                            res.json({message:`${newUser.firstName} added to Users collection`})
                            console.log('user added');
                        }
                    })
                } else {
                    res.json({error: 'that email already exists in our DBs'});
                }
            })
        })
        app.post('/retrieveUser', function(req, res) {
            console.log('sessssssion', req.session.loggedUser)
            if(req.session.loggedUser != null) {
                res.json({message: 'User currently logged in', loggedUser: req.session.loggedUser})
            }
        })
        // app.post('/updateUser', function (req, res) {
        //     console.log('upating users in server')
        //     user.update({_id: req.body.user_id}, {status: req.body.status}, function(err, user) {
        //         if(err){
        //             console.log("update error",)
        //         }else{
        //             res.json({message:`${user.name} updated`})
        //         }
        //     })
        // })
    //end log-reg routes

    //create-course routes
        app.post('/createCourse', function(req, res) {
            User.find({email: req.body.email}, function(err, user) {
                console.log('in server')
                if(user.length == 0) {            
                    console.log("creating new User in server")
                    newUser = new User()
                    newUser.admin = true            // this will need updating after i implement courses.
                    newUser.locked = false
                    newUser.firstName = req.body.firstName
                    newUser.lastName = req.body.lastName
                    newUser.email = req.body.email
                    newUser.password = req.body.password
                    console.log(user)
                    newUser.save(function(err) {
                        if(err){
                            console.log('new user error')
                            res.json({err})
                        }else{
                            res.json({message:`${newUser.firstName} added to Users collection`})
                            console.log('user added');
                        }
                    })
                } else {
                    res.json({error: 'that email already exists in our DBs'});
                }
            })
        })
    //end create-course routes

    //marketplace routes
        app.post('/getAllItems', function (req, res) {
            console.log('getting items in server')
            Item.find({},function(err, items) {
                if(err){
                    console.log("e0rr0r",)
                }else{
                    res.json({message:'All Items', items: items})
                }
            })
        })

        app.post('/addItem', function(req, res) {
            console.log("creating new item in server", req.body)
            newItem = new Item()
            newItem.type = req.body.type
            newItem.name = req.body.name
            newItem.description = req.body.description
            newItem.price = req.body.price
            newItem.img_url = req.body.imgUrl
            newItem._user = req.body.userID
            console.log('newItem', newItem)
            newItem.save(function(err) {
                if(err){
                    console.log('item creation error')
                    res.json({err})
                }else{
                    res.json({message:`${newItem.name} item added`})
                }
            })
        })

        app.post('/deleteItem', function(req, res) {
            console.log('deleteing item in server', req.body)
            Item.remove({_id: req.body._id}, function(err, user) {
                if(err){
                    console.log("deleteing error",)
                }else{
                    res.json({message:`item deleted`})
                }
            })           
        })

        //old routes
            app.post('/contact', function (req, res) {
                console.log('getting user in server')
                User.find({_id: req.body.id},function(err, user) {
                    if(err){
                        console.log("e0rr0r",)
                    }else{
                        res.json({message:'The User', user: user})
                    }
                })
            })

            app.get('/allBikes', function (req, res) {
                console.log('getting bikes in server')
                Bike.find({},function(err, bikes) {
                    if(err){
                        console.log("e0rr0r",)
                    }else{
                        console.log(bikes)
                        res.json({message:'The Bikes', bikes: bikes})
                    }
                })
            })

            app.post('/userBikes', function (req, res) {
                console.log('getting user bikes in server')
                Bike.find({_user: req.body._id},function(err, bikes) {
                    if(err){
                        console.log("e0rr0r",)
                    }else{
                        console.log(bikes)
                        res.json({message:'The user Bikes', bikes: bikes})
                    }
                })
            })

            app.post('/updateBike', function (req, res) {
                console.log('upating bike in server')
                Bike.update({_id: req.body._id}, {
                    title: req.body.title,
                    description: req.body.description,
                    img_url: req.body.img_url,
                    price: req.body.price,
                    location: req.body.location,
                }, function(err, user) {
                    if(err){
                        console.log("update error",)
                    }else{
                        res.json({message:`bike updated`})
                    }
                })
            })

            app.post('/deleteBike', function (req, res) {
                console.log('deleteing bike in server')
                Bike.remove({_id: req.body._id}, function(err, user) {
                    if(err){
                        console.log("deleteing error",)
                    }else{
                        res.json({message:`bike deleted`})
                    }
                })
            })
        //end old routes
    //end marketplace routes

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./DanielsMarketplace/dist/DanielsMarketplace/index.html"))
    });
//end routes


// tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
