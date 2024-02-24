const User = require("../model/User_schema");
const bcrypt = require("bcrypt");


//to get all the users from db

const getUser = async (req, res) => {
  try {
    const data = await User.find({});
    if (!data) {
      res.status(404).json("Resource not found");
    }
    res.status(200).json({ success: true, data: data,length:data.length });
  } catch (err) {
    res.status(500).json(console.log(err));
  }
};

//signup page
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existinguser;
  if(!name || !email || !password){
    return res.status(404).json({msg:"enter all details"})
  }

  //find the email from db to check whether the user is there or not
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  //if user exist
  if (existinguser) {
    return res.status(400).json("User already exist");
  }

  const saltRounds = 10; // Number of salt rounds to use, higher is more secure
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      // Handle error
      console.error(err);
      return;
    }
    const user = new User({
      name,
      email,
      password: hash,
    });
    try {
      user.save();
    } catch (err) {
      return console.log("message:" + err);
    }
    res.status(200).json(user);
  });
};

//login

const login = async (req, res) => {
  let existinguser;
  const { email, password } = req.body;

  //find email
  try{
    existinguser = await User.findOne({ email });
    console.log(existinguser);
  } catch (err) {
    return console.log(err);
  }

  //if email is not existing
  if (!existinguser) {
    return res.status(400).json("User not exist.Please signup");
  }

  //password didnt match
  //   if(password!==existinguser.password){
  //       return res.status(404).json("Login unsuccessfull")
  //   }

  bcrypt.compare(password, existinguser.password, (err, result) => {
    if (err) {
      // Handle error
      console.error(err);
      return;
    }
    if (result) {
      // Passwords match, authentication successful
      // Proceed with login logic
      res.status(200).json("Login Success");
    } else {
      return res.status(404).json("Login unsuccessfull");
      // Passwords don't match, authentication failed
      // Handle invalid password (e.g., display error message)
    }
  });
  //success message
  //   res.status(200).json("Login Success")
};

module.exports = { getUser, signup, login };
