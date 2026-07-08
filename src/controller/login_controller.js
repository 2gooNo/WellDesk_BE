import { UserModel } from "../models/user-model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {

    const body = req.body;

    if (body.email === undefined) {
        res.status(400).json({ message: "Email required"})
        return;
    }
    if (body.password === undefined) {
        res.status(400).json({ message: "Password required"})
        return;
    }


    const user = await UserModel.findOne({email: body.email});
    console.log(body);
    console.log(user);

    if (!user) {
        res.status(404).json({ message: "User not found"});
        return;
    } else {
        if (await bcrypt.compare(body.password, oneUser.password)) {

            const token = jwt.sign(
                {user_id: oneUser._id, email:oneUser.email},
                "MySuperDuperPrivateKey",
                {
                    expiresIn: "72h"
                }
            )

            res.status(200).json({ token });
            return;
        } else {
            res.status(405).json({ message: "Password not match" });
            return;
        }
    }


}