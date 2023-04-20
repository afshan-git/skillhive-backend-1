import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const comparePasswords = (password,hash) =>{
    return bcrypt.compare(password,hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password,5)
    //5- salt -->second ingredient
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { 
        id: user.id,
        firname: user.firstname 
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req,res,next) => {
    const bearer = req.headers.authorization

    //bearer - authentication design pattern
    //generic way of describing person sent in a token

    if(!bearer){
        res.status(401)
        res.json({message:'not authorized'})
        return
    }  

    const [,token] = bearer.split(' ')
    if(!token){
        res.status(401)
        res.json({message:'not authorized'})
        return
    }

    try{
        const user = jwt.verify(token,process.env.JWT_SECRET)
        // checks whether its a valid JSON token or not

        req.user = user
        next()
    }
    catch(e){
        console.error(e)
        res.status(401)
        res.json({message:'not valid token'})
        return
    }


}