import express from "express";
import {
  bookmarks,
  creat_tweet_controller,
  delete_tweet,
  getAllTweetWhomUfollow,
  getalltweets,
  getalltweetsrelatedtologedinuser,
  like_and_dislike,
} from "../controller/tweet.controller.js";

const tweet_Route = express.Router();

tweet_Route.post("/createtweet", creat_tweet_controller);
tweet_Route.delete("/deletetweet/:id", delete_tweet);
tweet_Route.put("/like-&-dislike/:id", like_and_dislike);
tweet_Route.put("/bookmarks/:id", bookmarks);
tweet_Route.get("/tweets/:id", getAllTweetWhomUfollow);
tweet_Route.get("/get-all-tweets", getalltweets);
tweet_Route.get(
  "/get-all-tweets-of-logedin-user/:logedinuser",
  getalltweetsrelatedtologedinuser
);

export default tweet_Route;
