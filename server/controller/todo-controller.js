import Todo from '../model/Todo.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../model/user.js";
import formidable from 'formidable';
// const formidable = require("formidable")
const secret = "test";
import NewUser from '../model/form.js';
import fs from "fs";
// const NewUser = require("../model/form")

export const createForm =  (req, res) => {
  const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, file) =>
    {
        if (err) {
          return res.status(400).json({ error: err })
      }
      if (!fields.name || !fields.email || !file.photo) {
          return res.status(400).json({ error: "Fill all the fields" })
      }

      const user = new NewUser(fields)
      if (file.photo) {
          if (file.photo.size > 400000) {
              return res.status(400).json({ error: "file size is too big" })
          }
          user.photo.data = fs.readFileSync(file.photo.filepath)
          user.photo.contentType = file.photo.mimetype

          await user.save((err, result) =>
          {
              if (err) {
                  return res.status(400).json({ error: err });
              }
              return res.json({ user })
          })
      }
  })

}
export const updateForm = (req, res) =>
{
  let id = req.params.userId;
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, file) =>
  {
      if (err) {
          return res.status(400).json({ error: err })
      }
     NewUser.findByIdAndUpdate(
      id,
      {$set:{...fields}},
      {new:true},
         (err, user) =>
         {
          if (err) {
              return res.status(400).json({ error: "user not found" })
          }
             if (file.photo) {
              if (file.photo.size > 400000) {
                  return res.status(400).json({ error: "file size is too big" })
              }
              user.photo.data = fs.readFileSync(file.photo.filepath)
              user.photo.contentType = file.photo.mimetype
              user.save((err, result) => {
                  if (err) {
                      return res.status(400).json({ error: err })
                  }
              })
              res.json({ user })
          }

      }
     )
  })
}


export const userPhoto = (req, res) => {
  let id = req.params.userId;
  NewUser.findById(id).exec((err, user) => {
      if (err || !user) {
          res.status(400).json({ error: "user not found" })
      }
      else {
          if (user.photo.data) {
              res.set("Content-Type", user.photo.contentType)
              return res.send(user.photo.data)
          }
      }
  })
}

//getForm
export const getForm = async (req, res) =>
{
  console.log('HAPPYYYYYYYYYYYYYYYYYYYYYYYY', req.params);
  /*NewUser.find((err, data) => {
      if (err) {
          return res.json({ error: err })
      }
      res.json(data)
  })
  */
  const { id } = req.params;
  try {
      const todos = await NewUser.find({ownerId: id}).sort({ 'createdAt': -1 })

      return res.status(200).json(todos);
  } catch (error) {
      return res.status(500).json(error.message);
  }
}

export const deleteForm=async(req,res)=>{
  const id = req.params.userId;
  const del = await NewUser.findByIdAndDelete(id)
  res.json(del)
}

export const addTodo = async (request, response) => {
    try {
        const newTodo = await Todo.create({
          data: request.body.data,
          ownerId: request.body.ownerID,
          createdAt: Date.now()
        })

        await newTodo.save();

        return response.status(200).json(newTodo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getAllTodos = async (request, response) =>
{
    const { id } = request.params;
    try {
        const todos = await Todo.find({ownerId: id}).sort({ 'createdAt': -1 })

        return response.status(200).json(todos);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const toggleTodoDone = async (request, response) => {
    try {
        const todoRef = await Todo.findById(request.params.id);

        const todo = await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { done: !todoRef.done }
        )

        await todo.save();

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const updateTodo = async (request, response) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { data: request.body.data }
        )

        const todo = await Todo.findById(request.params.id);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const deleteTodo = async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id)

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const signin = async (req, res) =>
{
    
    const { email, password } = req.body;
    try {
      const oldUser = await UserModal.findOne({ email });
      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "24h",
      });
  
      res.status(200).json({ result: oldUser, token });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const oldUser = await UserModal.findOne({ email });
      if (oldUser)
        return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserModal.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "24h",
      });
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  