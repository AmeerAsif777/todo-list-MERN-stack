import mongoose from "mongoose";
import validator from "validator";

const formSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minlength:[3,"min 3 letter"]
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid")
            }
        }
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    ownerId: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("NewUser", formSchema);