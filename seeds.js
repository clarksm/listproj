var mongoose = require("mongoose");
var Listitem = require("./models/listitem");
var Comment  = require("./models/comment");

var data = [
	{
		name: "Red Rocks", 
		image: "http://static.thousandwonders.net/Red.Rocks.Amphitheatre.original.11553.jpg", 
		description: "Film on the Rocks"
	},
	{
		name: "Sand Dunes", 
		image: "https://www.nps.gov/common/uploads/grid_builder/imr/crop16_9/8EADDB13-1DD8-B71B-0B43FFA9BE6A3D82.jpg?width=950&quality=90&mode=crop", 
		description: "So Sandy"
	},
	{
		name: "Glenwood Springs", 
		image: "http://www.hotspringspool.com/sites/default/files/styles/gallery_zoom/public/3.0HeroWinter.jpg?itok=xGr6K-3T", 
		description: "Hot Springs"
	}
]

function seedDB(){
   //Remove all campgrounds
   Listitem.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed list items!");
         //add a few campgrounds
        data.forEach(function(seed){
            Listitem.create(seed, function(err, listitem){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a item");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                listitem.comments.push(comment);
                                listitem.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}
module.exports = seedDB;