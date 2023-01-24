const bcrypt=require('bcrypt');

const pass=async(password)=>{
    const passhash=await bcrypt.hash(password,10);
    const comphash = bcrypt.compareSync(password, passhash); 
    console.log(comphash);
}

pass("kartik@132");