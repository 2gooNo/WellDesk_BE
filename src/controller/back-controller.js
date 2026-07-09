import {UserModel} from '../models/user_models.js';

export const BackData = async (req, res) => {

    try {
        const { userID, angle } = req.body;
        const user = await UserModel.findById(userID);

        if(!user) {
            return res.status(404).json({ message: "User not found"});
        }
        user.back_mean =  (angle + user.back_mean) / 2;
        await user.save();
        res.status(200).json({ message: "Back data updated successfully", back_mean: user.back_mean });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const DailyPush  = async (req, res) => {

    try {
        const userID = req.body;
        const user = await UserModel.findById(userID);

        if(!user) {
            return res.status(404).json({ message: "User not found"});
        }
        user.month_back_history.push({ 
            date: new Date(),
            value: user.back_mean 
        });
        user.back_mean = 0;
        await user.save();
        res.status(200).json({ message: "Daily back data pushed successfully", month_back_history: user.month_back_history });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}