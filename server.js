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
        cart: {
            current: [{
                _id: String,
                itemType: String,
                name: String,
                description: String,
                price: Number,
                img_url: String,
                createdAt: String,
                updatedAt: String,
                quantity: Number,
            }]
        },
        orders: {
            current: [{
                items: [{
                    _id: String,
                    itemType: String,
                    name: String,
                    description: String,
                    price: Number,
                    img_url: String,
                    createdAt: String,
                    updatedAt: String,
                    quantity: Number,
                }],
                status: String,
                targetAddress: String,
                dateOrdered: Date
            }],
            past: [{ //copy the above current schema here when doing past but add date delieverd
                _id: String,
                itemType: String,
                name: String,
                description: String,
                price: Number,
                img_url: String,
                createdAt: String,
                updatedAt: String,
                quantity: Number,
            }]
        },
        password: String,
    }, { timestamps: true })

    var ItemSchema = new mongoose.Schema({
        itemType: {
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
    var User = mongoose.model('User');
    
    mongoose.model('Item', ItemSchema);
    var Item = mongoose.model('Item');
//end DB stuff

//routes
    //user routes
        app.post('/loginUser', function (req, res) {
            console.log('looking for user in DB')
            User.findOne({email:req.body.email},function(err, user) {
                if(user != null) {
                    console.log('found user in server')
                    if(user.password != req.body.password) {
                        console.log("e0rr0r, wrong pass",)
                        res.json({errorMsg:'Wrong password'})
                    } else {
                        req.session.currentUser = user;
                        res.json({message:'The Logged in one', currentUser: user})
                    }
                } else {
                    res.json({errorMsg: 'user doesn\'t exist'})
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
                    // newUser.orders = [];
                    console.log(user)
                    newUser.save(function(err) {
                        if(err){
                            console.log('new user error')
                            res.json({err})
                        }else{
                            res.json({message:`${newUser.firstName} added to Users collection. Please log in.`})
                            console.log('user added');
                        }
                    })
                } else {
                    res.json({error: 'that email already exists in our DBs'});
                }
            })
        })

        app.post('/retrieveUser', function(req, res) {
            console.log('session user id', req.session)
            if(req.session.currentUser != null) {
                res.json({message: 'User currently logged in', currentUser: req.session.currentUser})
            } else {
                res.json({message: 'no user stored in server session'})
            }
        })

        app.post('/updateUser', function (req, res) {
            console.log('upating user in server with id:', req.body._id)
            console.log('number of orders in user:', req.body.cart.current.length)
            var currentCart = [];
            for (var i = 0; i < req.body.cart.current.length; i++) {
                currentCart.push(req.body.cart.current[i]);
            }
            User.findOne({_id: req.body._id}, function(err, user) {
                user.admin = req.body.admin,
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.cart.current = currentCart;
                user.orders = req.body.orders;
                user.email = req.body.email,
                user.password = req.body.password,
                // updatedAt = add a time stamp here
                user.save(function(err) {
                    if(err){
                        console.error(err)
                        res.json({message: 'error while updating'})
                    }else{
                        res.json({message:`${user.firstName} ${user.lastName} updated`, user})
                    }
                })
            })
        })

        app.post('/placeOrder', function(req, res) {
            User.findOne({_id: req.body._id}, function(err, user) {
                console.log('error:', err);
                console.log('cart:', user.cart.current);
                let newOrder = {
                    items: user.cart.current,
                    // targetAddress: // insert address fucntion here
                    status: 'Processing',
                    dateOrdered: new Date(),
                }
                user.cart.current = [];
                user.orders.current.push(newOrder);
                user.save(function(err){
                    if(err){
                        console.log('err0r err0r does not compute', err);
                    }else{
                        console.log('user after purchase', user);
                        res.json({message:`${user.firstName} ${user.lastName} updated`, 'currentUser': user})
                    }
                })
            })
            
        })

        app.post('/logoutUser', function(req, res) {
            req.session.currentUser = null;
            res.json({message: 'user logged out.'})
        });
    //end user routes

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

        app.post('/getItem', function (req, res) {
            console.log('getting item in server with id:', req.body.id)
            Item.findOne({_id:req.body.id},function(err, item) {
                if(err){
                    console.log("e0rr0r:", err)
                }else{
                    res.json({message:'Item', item: item})
                }
            })
        })

        app.post('/addItem', function(req, res) {
            console.log("creating new item in server", req.body)
            newItem = new Item();
            newItem.itemType = req.body.type;
            newItem.name = req.body.name;
            newItem.description = req.body.description;
            newItem.price = req.body.price;
            newItem.img_url = req.body.imgUrl;
            newItem._user = req.body.userID;
            console.log('newItem', newItem);
            newItem.save(function(err) {
                if(err){
                    console.log('item creation error')
                    res.json({err})
                }else{
                    res.json({message:`${newItem.name} item added`})
                }
            })
        })

        app.post('/editItem', function (req, res) {
            Item.findOne({_id:req.body.item._id},function(err, editItem) {
                if(err){
                    console.log("e0rr0r with editing:", err);
                }else{
                    editItem.itemType = req.body.item.itemType;
                    editItem.name = req.body.item.name;
                    editItem.description = req.body.item.description;
                    editItem.price = req.body.item.price;
                    editItem.img_url = req.body.item.img_url;
                    editItem._user = req.body.item.userID;
                    console.log('edited Item: ', editItem);
                    editItem.save(function(err) {
                        if(err){
                            console.log('item edit error');
                            res.json({err});
                        }else{
                            res.json({message:`${editItem.name} item edited`, item: editItem});
                        }
                    })
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

    //end marketplace routes

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./DanielsMarketplace/dist/DanielsMarketplace/index.html"))
    });
//end routes


// tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
