const { addToDo, listTodo, deleteTodo, editTodo } = require("../Controller/TodoControllers")

const router = require("express").Router()
router.get("/",listTodo)
router.post("/add",addToDo)
router.delete("/deleteTodo/:id",deleteTodo)
router.post("/edittodo",editTodo)

module.exports = router;