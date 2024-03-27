
const dl = require('./datalayer');
const userExists = async(username,password)=>
{
    // hashedpassword = createHash('sha256').update(password)
    // console.log(hashedpassword);
        try{
      user = await dl.getUser(username);
     if(user.length !=0){
        
            if (user[0].passwordhash == password)
            // uncomment below and delete above when you've figured out what password was used -Netra
        // if (user[0].passwordhash == hashedpassword)
            { console.log(password);
                return true;
            }
            else
                return false;
        

        }
        else
            return false;
    }
    
catch(error)
{
    console.log(error);
    throw error;
}


}



































// this should be the name of the function to check login, refer to index.js for return type and arguments
module.exports = {
    userExists
}

