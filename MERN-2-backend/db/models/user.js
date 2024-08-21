import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      resumes: [{ type: Schema.Types.ObjectId, ref: 'UserResume' }]
})

const User = mongoose.model('User', userSchema);

export default User;