import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema({
      id: { type: Number, required: true },
      title: { type: String, required: true },
      companyName: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      startDate: { type: String, required: true },
      endDate: { type: String },
      currentlyWorking: { type: Boolean, default: false },
      workSummery: { type: String, required: true }
  });
  
  const educationSchema = new Schema({
      id: { type: Number, required: true },
      universityName: { type: String, required: true },
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      degree: { type: String, required: true },
      major: { type: String, required: true },
      description: { type: String }
  });
  
  const skillsSchema = new Schema({
      category: { type: String, required: true },
      items: [{ type: String, required: true }]
  });

  const achievementSchema = new Schema({
      id: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true }
  });

  const certificateSchema = new Schema({
      id: { type: Number, required: true },
      title: { type: String, required: true },
      issuer: { type: String, required: true },
      date: { type: String, required: true },
      link: { type: String, required: true }
  });
  
  const userResumeSchema = new Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      jobTitle: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      themeColor: { type: String, required: true },
      summery: { type: String, required: true },
      experience: [experienceSchema],
      education: [educationSchema],
      skills: [skillsSchema],
      achievements: [achievementSchema],
      certificates: [certificateSchema],
      title: { type: String, required: true }
  });
  
  const UserResume = mongoose.model('UserResume', userResumeSchema);
export default UserResume;