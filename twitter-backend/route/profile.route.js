import express from "express";
import {
  getallotherprofiles,
  profile_controller,
} from "../controller/profile.controller.js";
const profile_route = express.Router();

profile_route.get("/profile/:id", profile_controller);
profile_route.get("/get-all-profiles/:currentuserid", getallotherprofiles);

export default profile_route;
