import express, { Router } from 'express';


import { addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo, signin, signup,createForm, updateForm, userPhoto, getForm, deleteForm } from '../controller/todo-controller.js';

const route = express.Router();


route.post('/todos', addTodo)
route.get('/todos/owner/:id', getAllTodos);
route.get('/todos/:id', toggleTodoDone);
route.put('/todos/:id', updateTodo);
route.delete('/todos/:id', deleteTodo);
route.post('/user/signin', signin);
route.post('/user/signup', signup);
// Assignment 3
route.post("/create", createForm);
route.get("/get/:id", getForm);
//for photo
route.get("/photo/:userId", userPhoto)
route.put("/edit/:userId", updateForm)
route.delete("/delete/:userId",deleteForm)


export default route;