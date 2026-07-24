import { UserModel } from '../models/user-model.js';

export const UpdateDailyWaterGoal = async (req, res) => {

    try{

        const { userID, goal } = req.body;
        const user = await UserModel.findById(userID);
        
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.daily_water_goal = goal;

        await user.save();

        res.status(200).json({
            message: "Daily water goal updated successfully"
        })
    }catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

export const addWater = async (req, res) =>{

    try{
        
        const { userID, value } = req.body;
        const user = await UserModel.findById(userID);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const today = new Date().toDateString();
        let todayHistory = user.month_water_history.find(item =>
            new Date(item.date).toDateString() === today
        );

        if(todayHistory){
            todayHistory.value += value;
        } else {
            todayHistory = {
                date: new Date(),
                value: value
            };
            user.month_water_history.push(todayHistory);
        }

        await user.save();
        const drankToday = todayHistory.value;
        const remaining = Math.max(user.daily_water_goal - drankToday, 0);

        res.status(200).json({
            message: "Water intake updated successfully",
            goal: user.daily_water_goal,
            drankToday: drankToday,
            remaining: remaining
        });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getWeeklyWaterHistory = async (req, res) => {

    try{
        const { userID } = req.body;
        const user = await UserModel.findById(userID);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

        const history = user.month_water_history
        .filter(item => new Date(item.date) >= sevenDaysAgo);
        history.sort((a, b) => new Date(a.date) - new Date(b.date));
       
        res.status(200).json({
            message: "Weekly water history retrieved successfully",
            history: history
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};