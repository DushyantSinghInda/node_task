const user = require("../models/user");

exports.register = async (request, response) => {
  let userData = await user.findOne({ email: request.body.email });
  let data = user({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  });
  if (userData) {
    var arr = {
      status: false,
      message: "User Already Exist !!",
    };
  } else {
    await data.save();
    var arr = {
      status: true,
      message: "Registered Successfully !!",
    };
  }
  response.send(arr);
};

exports.login = async (request, response) => {
  let userData = await user.findOne({ username: request.body.username });
  if (userData) {
    if (userData.password == request.body.password) {
      var arr = {
        status: true,
        message: "Login Successful !!",
      };
    } else {
      var arr = {
        status: false,
        message: "Incorrect password !!",
      };
    }
  } else {
    var arr = {
      status: false,
      message: "Username and password invalid !!",
    };
  }
  response.send(arr);
};

exports.changePassword = async (request, response) => {
  const { email } = request.params;
  var userData = await user.findOne({ email: email });
  const { password, confirmPassword } = request.body;
  var varpass = password == confirmPassword;
  if (userData) {
    if (varpass) {
      await user.updateOne({ email: email }, { $set: { password: password } });
      var arr = {
        status: true,
        message: "Password updated successfully!!",
      };
    } else {
      var arr = {
        status: false,
        message: "Password Mismatch!!",
      };
    }
  } else {
    var arr = {
      status: false,
      message: "Invalid Username!!!",
    };
  }
  response.send(arr);
};
