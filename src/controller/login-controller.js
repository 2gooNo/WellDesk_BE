import {UserModel} from '../models/user_models.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const Login = async (req,res) => {

    const body = req.body;

    if (body.email === undefined) {
        res.status(403).json({ message: "Email required" })
        return;
    }
    if (body.password === undefined) {
    res.status(403).json({ message: "Password required" })
        return;
    }

    const oneUser = await UserModel.findOne({ email: body.email });
        console.log(body);
        console.log(oneUser);

    if (!oneUser) {
        res.status(405).json({ message: "User not found" });
    } else {
        if (await bcrypt.compare(body.password, oneUser.password)) {

            const token = jwt.sign(
                {user_id: oneUser._id, email:oneUser.email},
                "privitekey",
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