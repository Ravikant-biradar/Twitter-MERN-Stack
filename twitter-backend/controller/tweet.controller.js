import { tweet } from "../model/tweet.model.js";
import { user } from "../model/user.model.js";
import mongoose from "mongoose";
// create tweet
export const creat_tweet_controller = async (req, res) => {
  try {
    const { posttweet, createdby } = req.body;
    const findcreator = await user.findById(createdby);
    const create_tweet = await new tweet({
      posttweet,
      createdby,
    }).save();

    findcreator.allmytweets.push(create_tweet._id);
    await findcreator.save();
    res.status(201).send("tweet created");
  } catch (error) {
    console.log(`error in tweet controller ${error}`);
  }
};

// delete tweet
export const delete_tweet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`got is here ${id}`);

    // Trim any newline characters and spaces
   const  logedinuser = id.trim();
    console.log("Trimmed logedinuser:", logedinuser);

    // Check if logedinuser is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(logedinuser)) {
      return res.status(400).send({ error: "Invalid user ID" });
    }

    await tweet.findOneAndDelete({ createdby: logedinuser });
    res.status(201).json({ mes: "deleted tweet" });
  } catch (error) {
    console.log(`error while deleting post ${error}`);
  }
};

// like and dislike
export const like_and_dislike = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const { logged_in_user_id } = req.body;
    // console.log(logged_in_user_id);
    console.log(`logged_in_user_id${logged_in_user_id}`);
    const tweets_one = await tweet.findById(id);
    // console.log(`tweets_one ${tweets_one}`);

    if (tweets_one.like.includes(logged_in_user_id)) {
      await tweet.findByIdAndUpdate(tweets_one, {
        $pull: { like: logged_in_user_id },
      });
      console.log("disliked");
      return res.send("u unliked the tweet ");
    } else {
      await tweet.findByIdAndUpdate(tweets_one, {
        $push: { like: logged_in_user_id },
      });
      console.log("liked");
      res.send("Tweet liked");
    }
  } catch (error) {
    console.log(`logged error ${error}`);
  }
};

// bookmarks

export const bookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`id${id}`);
    const { createdby } = req.body;
    console.log(`logged_user${createdby}`);
    const loggeduser = await tweet.findOne({ createdby });
    console.log(loggeduser.Bookmark);

    if (loggeduser.Bookmark.includes(id)) {
      return await tweet.findByIdAndUpdate(loggeduser, {
        $pull: { Bookmark: id },
      });
    } else {
      return await tweet.findByIdAndUpdate(loggeduser, {
        $push: { Bookmark: id },
      });
    }
  } catch (error) {
    console.log(`error in bookmarks ${error}`);
  }
};

// export const getAllTweetWhomUfollow = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`id : ${id}`);
//     const loggeduser = await user.findById(id);
//     const usertweet = await tweet
//       .findOne({ createdby: id })
//       .populate("createdby");
//     console.log(`usertweet : ${usertweet}`);
//     const hello = await Promise.all(
//       loggeduser.following.map((ids) => tweet.find({ createdby: ids }).populate("createdby"))
//     );
//     console.log(`hello : ${loggeduser}`);
//     return res.status(201).json({ tweets: hello.concat(usertweet) });
//   } catch (error) {
//     console.log(`error while  getting All Tweet Whom U follow : ${error}`);
//   }
// };

/////

export const getAllTweetWhomUfollow = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(`id : ${id}`);

    // Find the logged-in user
    const loggeduser = await user.findById(id);
    // console.log(`loggeduser : ${loggeduser}`);

    // Get tweets from users whom the logged-in user follows
    const hello = await Promise.all(
      loggeduser.following.map((ids) =>
        tweet.find({ createdby: ids }).populate("createdby")
      )
    );

    // Flatten the array of arrays
    const followedTweets = hello.flat();

    // console.log(`followedTweets : ${followedTweets}`);

    return res.status(201).json({ tweets: followedTweets });
  } catch (error) {
    console.log(`error while getting All Tweet Whom U follow : ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

////

export const getalltweets = async (req, res) => {
  const getalltweets = await tweet.find().populate("createdby");
  res.send(getalltweets);
};

// export const getalltweetsrelatedtologedinuser = async (req, res) => {
//   try {
//     const { logedinuser } = req.params;
//     console.log(`logedinuser ${logedinuser}`);
//     const getall = await tweet.find({createdby:logedinuser});
//     console.log(getall);
//     res.send(getall);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getalltweetsrelatedtologedinuser = async (req, res) => {
  try {
    let { logedinuser } = req.params;
    console.log("Raw logedinuser:", logedinuser);

    // Trim any newline characters and spaces
    logedinuser = logedinuser.trim();
    console.log("Trimmed logedinuser:", logedinuser);

    // Check if logedinuser is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(logedinuser)) {
      return res.status(400).send({ error: "Invalid user ID" });
    }

    const getall = await tweet
      .find({ createdby: logedinuser })
      .populate("createdby");
    // console.log(getall);

    res.status(200).send(getall);
  } catch (error) {
    console.error("Error fetching user tweets:", error);
    res.status(500).send({ error: "Failed to fetch user tweets" });
  }
};
