const express = require('express');
require("./moongoseconnect");
const userD = require('./userDetails');
const bcrypt=require('bcrypt');
const app = express();


app.use(express.json());
app.post('/login',async(req,resp)=>{
    
    const passhash=await bcrypt.hash(req.body.password,10);
     console.log(passhash);

    const data = new userD({
        email: req.body.email,
        password: passhash,
        username: req.body.username
    })

        const dataToSave = await data.save();
    
   
    console.log(dataToSave);
    resp.send(dataToSave);

})



app.post('/check',async(req,resp)=>{
    try{
const bemail=req.body.email;
console.log(bemail);

// const usermail=await userD.find(
//     {
//         "$or":[
//             {email:{$regex:bemail}}

//         ]
//     }
// );
const bpassword=req.body.password;
console.log(bpassword);

const userpass=await userD.findOne(
    {
        "$or":[
            {password:{$regex:bpassword}},
            {email:{$regex:bemail}}
            

        ]
    }
);

// if(usermail){
//    const chckpass= bcrypt.compareSync(bpassword, userpass); 
//    console.log("matched");
// }
// else{
//     console.log("not found");
// }


resp.send(userpass);
console.log(userpass);

    }
catch(err){
    resp.status(400).send("invalid");
}


})







app.listen(7000);