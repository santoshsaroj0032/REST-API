 const express= require ("express");
const users = require ("./MOCK_DATA.json");





 const app= express();
 const PORT = 7000;

 app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});


//  START REST API 

app.get("/api/users", (req,res)=>{
    return res.json(users);
})
app.route('/api/users/:id' ).get((req , res)=>{
    const id = Number(req.params.id);
    
    const user = users.find((user)=> user.id === id );
    return res.json(user);
})
.patch((req,res)=>{
   return res.json({status:"Pending"});
})
.delete((req,res)=>{
    return res.json({status:"Pending"});
});



app.post("/api/users",(req,res) =>{
    const body=req.body;
    console.log("Body", body);
    return res.json({status:"pending"});
});


// app.patch("/api/users/:id",(req,res) =>{
//     return res.json({status:"pending"});
// });

// app.delete("/api/users/:id",(req,res) =>{
//     return res.json({status:"pending"});
// });

 
 app.listen(PORT , ()=> console.log(`Server Started at port ${PORT}`));
