import bcrypt from 'bcrypt'

export async function getAllUsers(req,res){
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({error : err})
    }
}
export const getUser = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({error : err});
    }
}
export const createUser = async (req,res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({error : err});
    }
}
export const getUserbyid = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({error : err});
    }
}