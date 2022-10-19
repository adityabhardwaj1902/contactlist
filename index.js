const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 8000;

const db = require("./config/mongoos");
const Contact = require("./Models/contact");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));

// //Middleware1
// app.use(function (req, res, next) {
//   req.MyName = "purple";
//   //   console.log("middleware1 is called");
//   next();
// });

// // middleware2
// app.use(function (req, res, next) {
//   console.log("My name from MW2", req.MyName);

//   //   console.log("middleware 2 is called");
//   next();
// });

var contactlist = [
  {
    name: "Aditya",
    phone: "1111111111",
  },
  {
    name: "Shiva",
    phone: "2222222222",
  },
  {
    name: "pyar",
    phone: "3333333333",
  },
];

// app.get("/", function (req, res) {
// //   console.log(__dirname);
//   res.send("Cool,It is running");
// });

// app.get("/profile", function (req, res) {
//   res.send("<h1>PROFILE</h1>");
// });

// app.get("/Contact", function (req, res) {
//   res.send("<H1>Contact me on 7387527928</H1>");
// });

app.get("/", function (req, res) {
  //   console.log("from the get route controller", req.MyName);
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("error in fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "My Contacts List",
      contact_list: contacts,
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Let us play with ejs",
  });
});

app.post("/create-contact", function (req, res) {
  //   contactlist.push({
  //     name: req.body.name,
  //     phone: req.body.phone,
  //   });

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating !");
        return;
      }
      console.log("************", newContact);
      return res.redirect("back");
    }
  );

  //   console.log(req.body);
  //   console.log(req.body.name);
  //   return res.redirect("/practice");
});

// for deleting a contact
app.get("/delete-contact", function (req, res) {
  //console.log(req.params);
  // get the querry from the url
  //   let phone = req.query.phone;

  // get the id from query in the ul
  let id = req.query.id;

  //   let contactIndex = contactlist.findIndex((contact) => contact.phone == phone);

  //   if (contactIndex != -1) {
  //     contactlist.splice(contactIndex, 1);
  //   }

  // find the contact in the database using id and delete it

  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting an object from database");
      return;
    }
    return res.redirect("back");
  });
  //   return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server");
  }
  console.log("Yup! my Express server is running on port");
});
