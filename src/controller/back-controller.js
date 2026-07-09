import { UserModel } from "../models/user_models.js";

export const BackData = async (req, res) => {
    try {

        const { userID, angle } = req.body;

        const user = await UserModel.findById(userID);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.back_mean += angle;
        user.back_count++;

        await user.save();

        res.status(200).json({
            message: "Back data updated successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
};

export const DailyPush = async (req, res) => {

    try {

        const { userID } = req.body;

        const user = await UserModel.findById(userID);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        let average = 0;

        if (user.back_count > 0) {
            average = user.back_mean / user.back_count;
        }

        user.month_back_history.push({
            date: new Date(),
            value: average
        });

        user.back_mean = 0;
        user.back_count = 0;

        await user.save();

        res.status(200).json({
            message: "Daily back data pushed successfully",
            today_average: average
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
};