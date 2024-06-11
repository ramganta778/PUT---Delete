let mongoose = require("mongoose");
let express = require("express");
let multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

let upload = multer({ storage: storage });

let cors = require("cors");

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  mobile: String,
  profilePic: String,
});

let user = new mongoose.model("user", userSchema);

app.post("/register", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  try {
    let newUser = await new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      profilePic: req.file.path,
    });
    await user.insertMany([newUser]);
    res.json({ status: "Success", msg: "User Created Successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "Unable to create user", err: err });
  }

  console.log("recieved request from client");

  console.log(req.body);

  // res.json(["user created successfully"]);
});

app.post("/login", upload.none(), async (req, res) => {
  console.log(req.body);

  let userDetialsArr = await user.find().and({ email: req.body.email });

  if (userDetialsArr.length > 0) {
    if (userDetialsArr[0].password == req.body.password) {
      let loggedInUserDetails = {
        firstName: userDetialsArr[0].firstName,
        lastName: userDetialsArr[0].lastName,
        age: userDetialsArr[0].age,
        email: userDetialsArr[0].email,
        password: userDetialsArr[0].password,
        mobile: userDetialsArr[0].mobile,
        profilePic: userDetialsArr[0].profilePic,
      };

      res.json({ status: "success", data: loggedInUserDetails });
    } else {
      res.json({ status: "failure", msg: "Invalid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "user is not available" });
  }
});

app.delete("/deleteAccount",upload.none(), async (req,res)=>{


let result = await user.deleteMany({email:req.body.email});

console.log(result);

if(result.acknowledged == true){

res.json({status:"success",msg:"user deleted successfully"});

}else{


res.json({status:"failure",msg:"unable to delete user"});

}


});

app.put("/updateDetails", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);

  try {
    if (req.body.firstName.trim().length > 0) {
      await user.updateMany(
        { email: req.body.email },
        { firstName: req.body.firstName }
      );
    }

    if (req.body.lastName.trim().length > 0) {
      await user.updateMany(
        { email: req.body.email },
        { lastName: req.body.lastName }
      );
    }

    if (req.body.age.trim().length > 0) {
      await user.updateMany({ email: req.body.email }, { age: req.body.age });
    }

    if (req.body.password.length > 0) {
      await user.updateMany(
        { email: req.body.email },
        { password: req.body.password }
      );
    }

    if (req.body.mobile.trim().length > 0) {
      await user.updateMany(
        { email: req.body.email },
        { mobile: req.body.mobile }
      );
    }

    if (req.file) {
      await user.updateMany(
        { email: req.body.email },
        { profilePic: req.file.path }
      );
    }
    res.json({ status: "success", msg: "successfully updated" });
  } catch (err) {
    res.json({ status: "failure", msg: "unable updated", err: err });
  }
});

app.listen(9441, () => {
  console.log("Port Number Is Ready");
});

let connectToMDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/registerForm");

    console.log("Connected to MDB Successfully");
  } catch (err) {
    console.log("Unable to connect to MDB");
  }
};

connectToMDB();
