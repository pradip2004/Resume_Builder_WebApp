import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  externalId: {
    type: String,
    required: true,
    unique: true
  },
  externalProvider: {
    type: String,
    default: 'clerk'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserResume' }]
});

const User = mongoose.model('User', userSchema);

export default User;