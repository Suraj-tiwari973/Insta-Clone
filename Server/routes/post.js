const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin")
const Post  = mongoose.model("Post");


// show all user post API  👇👇👇.

router.get("/allpost",(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")     // this metehod is used for explore something and second argument is telling about that what to explore...
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err);
    })
})

// create post API 👇👇👇.

router.post("/createpost",requireLogin,(req,res)=>{
    const {title,body} = req.body;
    if(!title || !body){
        return res.status(422).json({error:"All fields are required."});
    }

    req.User.password = undefined;
    const post = new Post({
        title,
        body,
        postedBy:req.User
    })

    post.save().then(result=>{
        
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
    })
})


router.get("/mypost",requireLogin,(req,res)=>{
    Post.find({postedBy:req.User._id})
    .populate("postedBy","_id name")
    .then(mypost=>{         // mypost is an object here...
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router;