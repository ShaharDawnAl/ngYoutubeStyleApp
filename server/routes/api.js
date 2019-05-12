const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../modules/video');
const db = "mongodb://shahar:sha123@ds135653.mlab.com:35653/videoplayer";
mongoose.Promise = global.Promise;

router.get('/videos',function(req,res){
    //res.send('api works!');
    console.log("get request for all videos");
    Video.find({}).exec(function(err,videos){
        if(err){
            console.log("Error retrieving videos");
        }else{
            res.json(videos);
        }
    });
});

router.get('/videos/:id',function(req,res){
    //res.send('api works!');
    console.log("get request for a single videos");
    Video.findById(req.params.id).exec(function(err,videos){
        if(err){
            console.log("Error retrieving videos");
        }else{
            res.json(videos);
        }
    });
});

router.post('/video',function(req,res){
    console.log('post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err,insertedVideo){
        if(err){
            console.log('Error saving video');
        }else{
            res.json(insertedVideo);
        }
    });
});

router.put('/video/:id',function(req,res){
    console.log('Update a video');
    Video.findByIdAndUpdate(req.params.id,
        {
            $set: {title: req.body.title, url: req.body.url, description: req.body.description}
        },
        {
            new:true
        },
        function(err,UpdatedVideo){
            if(err){
                res.send("Error updating video");
            }else{
                res.json(UpdatedVideo);
            }
        }
    );
});


router.delete('/video/:id',function(req,res){
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){
        if(err){
            res.send('Error deleting video');
        }else{
            res.json(deletedVideo);
        }
    });
});

module.exports = router;

// Create the database connection 
mongoose.connect(db,{ useNewUrlParser: true }); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + db);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});





