import mongoose, { Schema } from "mongoose";

const userResumeSchema = new Schema({
      title: {
            type: String,
            required: true
      },
})

const UserResume = mongoose.model('UserResume', userResumeSchema);

export default UserResume;