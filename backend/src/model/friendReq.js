import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId  = mongoose.Schema.Types.ObjectId;
const model = mongoose.model

const FriendRequestSchema = new Schema({
    sender: {
        type: ObjectId,
        ref: "User",
        required:true,
    },
    recipient: {
        type:ObjectId,
        ref: "User",
        required:true,
    },
    status:{
        type:String,
        enum: ["pending", "accepted"],
        default: "pending"
    }
} , {timestamps:true})

const FriendRequest = model("FriendRequest" , FriendRequestSchema)

export default FriendRequest;