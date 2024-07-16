import { user } from "../model/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";

export const register_Controller = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    console.log(name, username, email, password);
    const check_user = await user.findOne({ username });
    if (check_user) {
      return res.send("user exist");
    }
    const hashpassword = await bcrypt.hash(req.body.password, 10);

    const profile = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const save_user = new user({
      name,
      username,
      email,
      password: hashpassword,
      profile,
    });
    await save_user.save();
    console.log(save_user);
    res.status(200).send({
      data: save_user,
      mes: `${name}  `,
      sucess: true,
    });
  } catch (error) {
    console.log(`error while registering ${error}`);
  }
};

export const login_controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkuser = await user.findOne({ email });

    // console.log(`data related to one email  comes here ${checkuser}`);
    if (!checkuser) {
      return res.send("email doesnot exists");
    }

    const check_password = await bcrypt.compare(password, checkuser.password);
    if (!check_password) {
      return res.send("internal server error");
    }
    // token generating
    const userid = { id: checkuser._id };
    const take = userid.id;
    const token = await pkg.sign({ take }, process.env.TOKEN, {
      expiresIn: "15D",
    });
    console.log(`token :${token}`);

    res.cookie("token", token, { maxAge: 15 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({
      success: true,
      mes: checkuser.name,
      userinfo: checkuser,
    });
  } catch (error) {
    console.log(`error${error}`);
  }
};

export const log_out = (req, res) => {
  return res.cookie("token", "").json({ mes: "logged out suceessfully" });
};

// 01)got to know the importance of try catch and

// 02) how findOne() function works  email and password working behind the scences and etc await

// 03) got to know the importance of res.send and json to be sent at last in order to include cookies  in headers
