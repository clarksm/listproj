var Listitem = require("../models/listitem");
var Comment = require("../models/comment");

//middleware goes here

var middlewareObj = {};

middlewareObj.checkListitemOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Listitem.findById(req.params.id, function(err, foundListItem){
			if(err){
				req.flash("error", "List item not found");
				res.redirect("/listitems")
			} else {
				if(foundListItem.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {  
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("/listitems")
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {  
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;