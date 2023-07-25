const toDoDB= require("../Models/toDo");





module.exports.addToDo =async (req,res,next)=>{
    const newtodo = req.body.todo
   
    const newTodo = new toDoDB({
        toDo:newtodo
    })
 const latestOne = await newTodo.save()

 if(latestOne){
    res.json({status:true,latestOne})
 }
}

module.exports.listTodo = async(req,res,next)=>{
    const todos =  await toDoDB.find({})
    if(todos){
        res.json({status:true,todos})
    }else{
        res.json({status:false,message:"No Todos"})
    }
}

module.exports.deleteTodo =async (req,res,next)=>{
    const remove =await toDoDB.deleteOne({_id:req.params.id})
    if(remove){
        res.json({status:true})
    }else{
        res.json({status:false})
    }
}

module.exports.editTodo =async(req,res,next)=>{
    const id = req.body.toDoid
    const updatedTodo = await  toDoDB.findOne({_id:id})
    updatedTodo.toDo = req.body.todo
    const newOne =await updatedTodo.save()
    if(newOne) res.json({status:true,newOne})
    else res.json({status:false})
    
}