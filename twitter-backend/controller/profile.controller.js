import { user } from "../model/user.model.js";

export const profile_controller = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(`id : ${id}`);
    const user_profile = await user.findById(id).populate("allmytweets")
    return res.status(201).json(user_profile);
  } catch (error) {
    console.log(`error while getting profile ${error}`);
  }
};

export const getallotherprofiles = async (req, res) => {
  const { currentuserid } = req.params;
  if (!currentuserid) {
    return req.send("internal server error");
  }
  const getall = await user
    .find({ _id: { $ne: currentuserid } })
    .populate("allmytweets");
  res.send(getall);
};

// echo "# twitter-backend" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Ravikant-biradar/twitter-backend.git
// git push -u origin main
