var express = require("express");
var router = express.Router();
var Listitem = require("../models/listitem");
var middleware = require("../middleware");

//INDEX - show all list items
router.get("/", function(req, res){
	Listitem.find({}, function(err,allListitems){
		if(err){
			console.log(err);
		} else {
			res.render("listitems", {listitems: allListitems, currentUser: req.user});
		}
	});
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newlistItem = {name: name, image: image, description: description, author: author}
	Listitem.create(newlistItem, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/listitems");
		}
	});
});

//NEW form to create new list item
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("listitems/new");
});

//shows more info about one item
router.get("/:id", function(req,res){
	Listitem.findById(req.params.id).populate("comments").exec(function(err, foundListItem){
		if(err){
			console.log(err);
		} else {
			console.log(foundListItem);
			res.render("listitems/show", {listitem: foundListItem});
		}
	});
	
});

//edit route
router.get("/:id/edit", middleware.checkListitemOwnership, function(req,res){
		Listitem.findById(req.params.id, function(err, foundListItem){
			res.render("listitems/edit", {listitem: foundListItem});		
		});
});

//update route
router.put("/:id", middleware.checkListitemOwnership, function(req,res){
	//find and update the correct cammpground and redirect
	Listitem.findByIdAndUpdate(req.params.id, req.body.listitem, function(err, updatedListitem){
		if(err){
			res.redirect("/listitems");
		} else {
			res.redirect("/listitems/" + req.params.id);
		}
	});
});

//destory list item route
router.delete("/:id", middleware.checkListitemOwnership, function(req,res){
	Listitem.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/listitems");
		} else {
			res.redirect("/listitems");
		}
	});
});

module.exports = router;