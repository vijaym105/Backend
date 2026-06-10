export async function regUser(err, req, res , next){
    try{
        console.log(user)
    }
    catch(err){
        err.status = 409
        next(err)
    }
}

