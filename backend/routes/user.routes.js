import Router from 'express';
import { users } from '../server.js';
import cookieParser from 'cookie-parser';
import {User} from '../models/user.models.js';
import ApiError from '../utils/ApiError.js';
const router = Router();

router.use(cookieParser())

router.post('/api/login', async (req, res) => {
    const {username, password}=req.body
    console.log(username, password);
    if(username == "")
        {
            throw new ApiError(400, "Username is required");
        }

    if(password == "")
        {
            throw new ApiError(400, "password is required");
        }

    const user = await User.findOne({
                $or : [
                    {username}
                ]
            })
    if(!user)
            {
                throw new ApiError(400, "Account does not exists");
            }
    
    if(await !user.isPasswordCorrect(password))
                {
                    throw new ApiError(400, "Password is incorrect")
                }
                res.cookie('username', username, { httpOnly: true });
                res.status(200).json({ message: 'Login successful' }); 
});


router.get('/api/todo', async (req, res) => {
    const username = req.cookies.username;
    if(username){
        const user = await User.findOne({
            $or : [
                {username}
            ]
        })
        if(user.username !== username)
            {
                throw new ApiError(401, "Unauthorized")
            }
        else
            res.status(200).json({ tasks : user.tasks});
        console.log(user);
        
            console.log(user.tasks);
    }
});

export default router;