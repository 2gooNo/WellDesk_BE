import {UserModel} from '../models/user_models.js'
import bcrypt from 'bcrypt'

export async function getAllUsers(req,res){
    try{
        const users = await UserModel.find()
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({error : err})
    }
}
export const createUser = async (req,res) => {
    try{
        console.log(req.body)
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
        const HashPassword = await bcrypt.hash(req.body.password || "", 10)
        const user = await UserModel.create({
            ...req.body,
            password: HashPassword
        });
    }catch(err){
        res.status(400).json({error : err});
    }
}
export const getUserbyid = async (req,res) => {
    try{
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({error : err});
    }
}