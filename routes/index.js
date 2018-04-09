//these are the packages that need to be installed first before running
//this program
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../lib/User');
var session = require('express-session');
//conncts to the database using the userdata table
mongoose.connect('mongodb://localhost/userdata');

//Ignore this, it was for testing and diagonosing errors
//My real Schema is located in ../lib/User.js
var mySchema = mongoose.Schema({
  icecreamname: String,
  name: String
});
//Again Ignore for testing purposes
var choiceModel = mongoose.model('choices', mySchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Wargaming News Blog" });
});

//render the login page when a GET request is sent for login
router.get('/login', function(req, res){
  res.render("../views/login.jade");
});

//POST request for Login deals with findng the user and matching the password
//we have with the passowrd the server has
router.post('/login', function(req, res){
  //Gets the username and password from the text boxes
  var username = JSON.stringify(req.body.username);
  var password = JSON.stringify(req.body.password);

//Tries to match the username with the username in the data base
  User.findOne({username: username}, function(err, user){
    //If there is an error display 500 in the console which is an error
    //message
    if(err){
      console.log(err);
      return res.status(500).send();
    }

    //If the username doesnt match one in the database sliferthedragon
    //redirect them to the login patch displaying 404 which is a not
    //found error
    if(!user) {
      res.render("../views/login.jade");
      return res.status(404).send();
    }

    //Compare the password with the one we have in DB
    user.comparePassword(password, function(err, isMatch){
      //if its a match then get all of the posts the user has
      //on file
      if (isMatch && isMatch == true){
        req.session.user = user;
        var postTitle = req.session.user.posttitle;
        var postDesc = req.session.user.postdescription;
        var date = req.session.user.date;
        var postTitle1 = req.session.user.posttitle1;
        var postDesc1 = req.session.user.postdescription1;
        var date1 = req.session.user.date1;
        var postTitle2 = req.session.user.posttitle2;
        var postDesc2 = req.session.user.postdescription2;
        var date2 = req.session.user.date2;
        var postTitle3 = req.session.user.posttitle3;
        var postDesc3 = req.session.user.postdescription3;
        var date3 = req.session.user.date3;
        var postTitle4 = req.session.user.posttitle4;
        var postDesc4 = req.session.user.postdescription4;
        var date4 = req.session.user.date4;
        var postTitle5 = req.session.user.posttitle5;
        var postDesc5 = req.session.user.postdescription5;
        var date5 = req.session.user.date5;
        //If the first title is empty then the user has no posts
        //If they do then render index3 which extends the dashboard and will
        //display all the users posts
        if(req.session.user.posttitle && req.session.user.postdescription != null){
          return res.render('../views/index3.jade', { newPostTitle: postTitle, newPostDescription: postDesc, date: date, newPostTitle1: postTitle1, newPostDescription1: postDesc1, date1: date1,
           newPostTitle2: postTitle2, newPostDescription2: postDesc2, date2: date2,  newPostTitle3: postTitle3, newPostDescription3: postDesc3, date3: date3,  newPostTitle4: postTitle4, newPostDescription4: postDesc4, date4: date4,
          newPostTitle5: postTitle5, newPostDescription5: postDesc5, date5: date5 });

          //else if the password is a match then just render the dashboard
          //noramlly
        }else if (isMatch && isMatch == true){
          req.session.user = user;
          res.render('../views/dashboard.jade');
        }else{
          //if the password doesnt match then redirect the user to the Login
          //page saying error 404
          res.render("../views/login.jade");
          return res.status(404).send()
        }
      }
    })
  });
});


//Post request Register adds a user to the database
router.post('/register', function (req, res){
  //Gets all of the users data from the text boxes
  var username = JSON.stringify(req.body.username);
  var password = JSON.stringify(req.body.password);
  var firstname = JSON.stringify(req.body.firstname)
  var lastname = JSON.stringify(req.body.lastname)
  var datetime = new Date();

  //Uses the User() Schema to add the data to the database
  var newuser = new User();

  //Set all the users data to the newuser so it can be added to the database
  newuser.username = username;
  newuser.password = password;
  newuser.firstname = firstname;
  newuser.lastname = lastname;
  newuser.date = datetime;

  //save the user to the database
  newuser.save(function(err, savedUser){
    //if there is an error display error 500
    if(err){
      console.log(err)
      return res.status(500).send();
    }else{
      //Else begin the users session and checking again if there is an error
      User.findOne({username: username}, function(err, user){
        if(err){
          console.log(err);
          return res.status(500).send();
        }

      //then render the dashboard with no posts as they have Just
      //created their account
      req.session.user = user;
      res.render('../views/dashboard.jade');
     })
    }
  });
})

//Get Request for the dashboard gets all the users posts if they have
//any
router.get('/dashboard', function(req, res){
  //First checks if they are logged in if not redirects them to
  //the login page first
  if (!req.session.user){
    res.redirect('/login')
    return res.status(401).send();
  }

//Gets all of the user posts if they have any
  var postTitle = req.session.user.posttitle;
  var postDesc = req.session.user.postdescription;
  var date = req.session.user.date;
  var postTitle1 = req.session.user.posttitle1;
  var postDesc1 = req.session.user.postdescription1;
  var date1 = req.session.user.date1;
  var postTitle2 = req.session.user.posttitle2;
  var postDesc2 = req.session.user.postdescription2;
  var date2 = req.session.user.date2;
  var postTitle3 = req.session.user.posttitle3;
  var postDesc3 = req.session.user.postdescription3;
  var date3 = req.session.user.date3;
  var postTitle4 = req.session.user.posttitle4;
  var postDesc4 = req.session.user.postdescription4;
  var date4 = req.session.user.date4;
  var postTitle5 = req.session.user.posttitle5;
  var postDesc5 = req.session.user.postdescription5;
  var date5 = req.session.user.date5;

  //if the first post is null then they dont have a post
  //if its not null then render the index3 with all the posts
  //on the dashboard
  if(postTitle != null){
    return res.render('../views/index3.jade', { newPostTitle: postTitle, newPostDescription: postDesc, date: date, newPostTitle1: postTitle1, newPostDescription1: postDesc1, date1: date1,
     newPostTitle2: postTitle2, newPostDescription2: postDesc2, date2: date2,  newPostTitle3: postTitle3, newPostDescription3: postDesc3, date3: date3,  newPostTitle4: postTitle4, newPostDescription4: postDesc4, date4: date4,
    newPostTitle5: postTitle5, newPostDescription5: postDesc5, date5: date5 });
  }else{
    //else just render out the dashboard
      res.render('../views/dashboard.jade');
  }
})

//just some global variables
var done = false;
var done1 = false;
var done2 = false;
var done3 = false;
var done4 = false;
var done5 = false;


//POST request for the dashboard checks to see if they are user
//and will upload the post they have just written
router.post('/dashboard', function (req, res){
  //gets the title and Descripton of the post from the
  //text boxes and setup the date
  var title = JSON.stringify(req.body.postTitle);
  var desc = JSON.stringify(req.body.postDesc);
  var datetime = new Date();
  //sets the session username to the username var
  var username  = req.session.user.username;
  //checks to see if there is actually a username on the database
  User.findOne({ username: username}, function(err, foundObject){
    //if there is an error then error 500
    if(err){
      console.log(err);
      res.status(500).send();
    }else{
      //if no user is found then error 404
      if(!foundObject){
        res.status(404).send();
      }else{
        //sets the foundObjects data to = the current users data
        if(req.body.username){
          foundObject.username = req.body.username;
        }
        if(req.body.password){
          foundObject.password = req.body.password;
        }
        if(req.body.firstname){
        foundObject.firstname = req.body.firstname;
        }
        if(req.body.lastname){
          foundObject.lastname = req.body.lastname;
        }
        //if there is no first post then done will be false
        //so the first post data will be send to the
        //foundObject
        if(!done){
          foundObject.posttitle = title;
          foundObject.postdescription = desc;
          foundObject.date = datetime;
          done = true;
         //Same for the rest if post1 is there then put the new post
         //into post number 2 etc etc
        }else if(!done1){
          foundObject.posttitle1 = title;
          foundObject.postdescription1 = desc;
          foundObject.date1 = datetime;
          done1 = true;
        }else if(!done2){
          foundObject.posttitle2 = title;
          foundObject.postdescription2 = desc;
          foundObject.date2 = datetime;
          done2 = true;
        }else if(!done3){
          foundObject.posttitle3 = title;
          foundObject.postdescription3 = desc;
          foundObject.date3 = datetime;
          done3 = true;
        }else if(!done4){
          foundObject.posttitle4 = title;
          foundObject.postdescription4 = desc;
          foundObject.date4 = datetime;
          done4 = true
        }else if(!done5){
          foundObject.posttitle5 = title;
          foundObject.postdescription5 = desc;
          foundObject.date5 = datetime;
          done5 = true;
        }
        //if all post lots are filled then begin overwriting all posts
        //stupid way of doing it but it does work
        if(done5){
          done = false;
          done1 = false;
          done2 = false;
          done3 = false;
          done4 = false;
          done5 = false;
        }
        //save the found Object to the database with the new posts added on
        //more like an update function
        foundObject.save(function(err, updatedObject){
          //if there is an error display erorr 500
          if(err){
            console.log(err);
            res.status(500).send();
          }else{
            //Get all of the posts for the user and render them on Dashboard
            //so they can see all of their posts
            var postTitle = foundObject.posttitle;
            var postDescription = foundObject.postdescription;
            var date = foundObject.date;
            var postTitle1 = foundObject.posttitle1;
            var postDescription1 = foundObject.postdescription1;
            var date1 = foundObject.date1;
            var postTitle2 = foundObject.posttitle2;
            var postDescription2 = foundObject.postdescription2;
            var date2 = foundObject.date2;
            var postTitle3 = foundObject.posttitle3;
            var postDescription3 = foundObject.postdescription3;
            var date3 = foundObject.date3;
            var postTitle4 = foundObject.posttitle4;
            var postDescription4 = foundObject.postdescription4;
            var date4 = foundObject.date4;
            var postTitle5 = foundObject.posttitle5;
            var postDescription5 = foundObject.postdescription5;
            var date5 = foundObject.date5;

            res.render('../views/index3.jade', { newPostTitle: postTitle, newPostDescription: postDescription, date: date, newPostTitle1: postTitle1, newPostDescription1: postDescription1, date1: date1,
             newPostTitle2: postTitle2, newPostDescription2: postDescription2, date2: date2,  newPostTitle3: postTitle3, newPostDescription3: postDescription3, date3: date3,  newPostTitle4: postTitle4, newPostDescription4: postDescription4, date4: date4,
            newPostTitle5: postTitle5, newPostDescription5: postDescription5, date5: date5 });
          }
        })
      }
    }
  })
})

//POST request for editing a post edits the post the user wants
router.post('/editdashboard', function(req,res){
  //Gets the session username and all of the titles and
  //descriptions from all of the edit boxes
  var username  = req.session.user.username;
  var title = JSON.stringify(req.body.editTitle);
  var title1 = JSON.stringify(req.body.editTitle1);
  var title2 = JSON.stringify(req.body.editTitle2);
  var title3 = JSON.stringify(req.body.editTitle3);
  var title4 = JSON.stringify(req.body.editTitle4);
  var title5 = JSON.stringify(req.body.editTitle5);
  var desc = JSON.stringify(req.body.editDesc);
  var desc1 = JSON.stringify(req.body.editDesc1);
  var desc2 = JSON.stringify(req.body.editDesc2);
  var desc3 = JSON.stringify(req.body.editDesc3);
  var desc4 = JSON.stringify(req.body.editDesc4);
  var desc5 = JSON.stringify(req.body.editDesc5);
  var datetime = new Date();
  //Trys to find the users username in the database
  User.findOne({username: username}, function(err, editObject){
    //if there is an error then erro 500
    if(err){
      console.log(err);
      res.status(500).send();
    }else{
      //Sets the editObject to = the current sessions data
      editObject.username = req.session.user.username;
      editObject.password = req.session.user.password
      editObject.firstname = req.session.user.firstname;
      editObject.lastname = req.session.user.lastname;
      //if the title doesnt = null then set the editObject to have
      //the data from the edit boxes on the webpage
      if(title != null){
        editObject.posttitle = title;
        editObject.postdescription = desc;
        editObject.date = datetime;
      }
      //This is the same for each one if it is null though then
      // the user doesnt want to edit that post
      if(title1 != null){
        editObject.posttitle1 = title1;
        editObject.postdescription1 = desc1;
        editObject.date1 = datetime;
      }
      if(title2 != null){
        editObject.posttitle2 = title2;
        editObject.postdescription2 = desc2;
        editObject.date2 = datetime;
      }
      if(title3 != null){
        editObject.posttitle3 = title3;
        editObject.postdescription3 = desc3;
        editObject.date3 = datetime;
      }
      if(title4 != null){
        editObject.posttitle4 = title4;
        editObject.postdescription4 = desc4;
        editObject.date4 = datetime;
      }
      if(title5 != null){
        editObject.posttitle5 = title5;
        editObject.postdescription5 = desc5;
        editObject.date5 = datetime;
      }
      //save this editObject to the database
      editObject.save(function(err, updatedObject){
        //if there is an error then error 500
        if(err){
          console.log(err);
          res.status(500).send();
        }else{
          //Else get all of the users posts and render the dashboard
          //with all their posts on it
          var postTitle = editObject.posttitle;
          var postDescription = editObject.postdescription;
          var date = editObject.date;
          var postTitle1 = editObject.posttitle1;
          var postDescription1 = editObject.postdescription1;
          var date1 = editObject.date;
          var postTitle2 = editObject.posttitle2;
          var postDescription2 = editObject.postdescription2;
          var date2 = editObject.date;
          var postTitle3 = editObject.posttitle3;
          var postDescription3 = editObject.postdescription3;
          var date3 = editObject.date;
          var postTitle4 = editObject.posttitle4;
          var postDescription4 = editObject.postdescription4;
          var date4 = editObject.date;
          var postTitle5 = editObject.posttitle5;
          var postDescription5 = editObject.postdescription5;
          var date5 = editObject.date;

        res.render('../views/index3.jade', { newPostTitle: postTitle, newPostDescription: postDescription, date: date, newPostTitle1: postTitle1, newPostDescription1: postDescription1, date1: date1,
          newPostTitle2: postTitle2, newPostDescription2: postDescription2, date2: date2,  newPostTitle3: postTitle3, newPostDescription3: postDescription3, date3: date3,  newPostTitle4: postTitle4, newPostDescription4: postDescription4, date4: date4,
          newPostTitle5: postTitle5, newPostDescription5: postDescription5, date5: date5 });
          }
        })
      }
    })
  });

//POST Request for deleting a POST deletes the post the user wants
router.post('/deletepost'), function(req,res){
  //Gets the sessions username and all of the data from
  //the text boxes like editing the post
  var username  = req.session.user.username;
  var title = JSON.stringify(req.body.editTitle);
  var title1 = JSON.stringify(req.body.editTitle1);
  var title2 = JSON.stringify(req.body.editTitle2);
  var title3 = JSON.stringify(req.body.editTitle3);
  var title4 = JSON.stringify(req.body.editTitle4);
  var title5 = JSON.stringify(req.body.editTitle5);
  var desc = JSON.stringify(req.body.editDesc);
  var desc1 = JSON.stringify(req.body.editDesc1);
  var desc2 = JSON.stringify(req.body.editDesc2);
  var desc3 = JSON.stringify(req.body.editDesc3);
  var desc4 = JSON.stringify(req.body.editDesc4);
  var desc5 = JSON.stringify(req.body.editDesc5);
  var datetime = new Date();
  //Trys to find the user with that username
  User.findOne({username: username}, function(err, editObject){
    //If error then error 500
    if(err){
      console.log(err);
      res.status(500).send();
    }else{
      //Sets the editObject to = the current sessions data
      editObject.username = req.session.user.username;
      editObject.password = req.session.user.password
      editObject.firstname = req.session.user.firstname;
      editObject.lastname = req.session.user.lastname;
      //if the title doesnt = null then set the editObject to have
      //the data from the edit boxes on the webpage
      if(title != null){
        editObject.posttitle = title;
        editObject.postdescription = desc;
        editObject.date = datetime;
        done = false;
      }
      //This is the same for each one if it is null though then
      // the user doesnt want to delete that post
      if(title1 != null){
        editObject.posttitle1 = title1;
        editObject.postdescription1 = desc1;
        editObject.date1 = datetime;
        done1 = false;
      }
      if(title2 != null){
        editObject.posttitle2 = title2;
        editObject.postdescription2 = desc2;
        editObject.date2 = datetime;
        done2 = false;
      }
      if(title3 != null){
        editObject.posttitle3 = title3;
        editObject.postdescription3 = desc3;
        editObject.date3 = datetime;
        done3 = false;
      }
      if(title4 != null){
        editObject.posttitle4 = title4;
        editObject.postdescription4 = desc4;
        editObject.date4 = datetime;
        done4 = false;
      }
      if(title5 != null){
        editObject.posttitle5 = title5;
        editObject.postdescription5 = desc5;
        editObject.date5 = datetime;
        done5 = false;
      }
      //save this editObject to the database with the deleted post
      editObject.save(function(err, updatedObject){
        //if error then error code 500
        if(err){
          console.log(err);
          res.status(500).send();
        }else{
          //Re render the dashboard with all of the posts except the post that Logout
          //deleted as it is now gone
          var postTitle = editObject.posttitle;
          var postDescription = editObject.postdescription;
          var date = editObject.date;
          var postTitle1 = editObject.posttitle1;
          var postDescription1 = editObject.postdescription1;
          var date1 = editObject.date;
          var postTitle2 = editObject.posttitle2;
          var postDescription2 = editObject.postdescription2;
          var date2 = editObject.date;
          var postTitle3 = editObject.posttitle3;
          var postDescription3 = editObject.postdescription3;
          var date3 = editObject.date;
          var postTitle4 = editObject.posttitle4;
          var postDescription4 = editObject.postdescription4;
          var date4 = editObject.date;
          var postTitle5 = editObject.posttitle5;
          var postDescription5 = editObject.postdescription5;
          var date5 = editObject.date;

        res.render('../views/index3.jade', { newPostTitle: postTitle, newPostDescription: postDescription, date: date, newPostTitle1: postTitle1, newPostDescription1: postDescription1, date1: date1,
          newPostTitle2: postTitle2, newPostDescription2: postDescription2, date2: date2,  newPostTitle3: postTitle3, newPostDescription3: postDescription3, date3: date3,  newPostTitle4: postTitle4, newPostDescription4: postDescription4, date4: date4,
          newPostTitle5: postTitle5, newPostDescription5: postDescription5, date5: date5 });
          }
        })
      }
    })
};

//GET request for loging out just logs out the user
router.get('/logout', function(req, res){
  //destroys the session and redirects them to the home page
  req.session.destroy();
  res.redirect('/')
  return res.status(200).send();
})

//used for rendering the register page
router.get('/register', function(req, res){
  res.render("../views/signup.jade")
});




module.exports = router;
