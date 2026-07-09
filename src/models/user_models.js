import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    medicine_schedule:[
        {
            medicine_name: {
                type: String,
                required: true},
            info: [
                {
                    day: {type: Number, required: true},
                    when: [
                        {
                            time: {type: Number, required: true},
                            quantity: {type: Number, required: true},
                        }
                    ]
                }
            ]
        }
    ],
    month_water_history:[
        {
            date: {type: Date, required: true},
            value: {type: Number, required: true},
        }
    ],
    month_butt_history:[
        {
            date: {type: Date, required: true},
            value: {type: Number, required: true},
        }
    ],
    month_back_history:[
        {
            date: {type: Date, required: true},
            value: {type: Number, required: true},
        }
    ],
    butt_mean:[
        {
            col: {type: Number, required: true},
            row: {type: Number, required: true},
            value: {type: Number, required: true},
        }
    ],
    back_mean: {type: Number, required: true},
    displayName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    daily_water_goal: {type: Number, required: true},

})
export const UserModel = mongoose.model("user", userSchema)