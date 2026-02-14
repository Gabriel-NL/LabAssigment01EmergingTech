const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentNumber: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    address: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    email: { type: String, required: true, trim: true },
    program: { type: String, default: "", trim: true },

    favoriteTopic: { type: String, default: "", trim: true },
    strongestSkill: { type: String, default: "", trim: true },

    role: { type: String, enum: ["student", "admin"], default: "student" }
  },
  { timestamps: true }
);

studentSchema.methods.safe = function () {
  return {
    _id: this._id,
    studentNumber: this.studentNumber,
    firstName: this.firstName,
    lastName: this.lastName,
    address: this.address,
    city: this.city,
    phone: this.phone,
    email: this.email,
    program: this.program,
    favoriteTopic: this.favoriteTopic,
    strongestSkill: this.strongestSkill,
    role: this.role
  };
};

module.exports = mongoose.model("Student", studentSchema);
