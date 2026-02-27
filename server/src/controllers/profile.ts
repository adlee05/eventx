import { Request, Response } from "express";
import { UserModel } from "../models/user.js";
import { success } from "zod";

function getUpcoming() { }
function getPast() { }
function getSaved() { }
async function updateProfile(req: Request, res: Response) {
  try {
    const userId = req.user.userId;
    const { fName, lName, bio, username, location } = req.body

    const inputs: any = {};

    if (fName) inputs.firstname = fName;
    if (lName) inputs.lastname = lName;
    if (bio) inputs.bio = bio;
    if (username) inputs.username = username;

    if (Object.keys(inputs).length == 0) {
      return res.status(400).json({
        message: "Empty fields, try better",
        success: false
      })

    }
    console.log(inputs);

    await UserModel.findByIdAndUpdate(
      userId,
      inputs
    );

    return res.status(200).json({
      message: "updated successfully",
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Update failed",
      success: false
    });
  }
}

export { getUpcoming, getPast, getSaved, updateProfile }
