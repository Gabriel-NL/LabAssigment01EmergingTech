const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    courseCode: { type: String, required: true, trim: true },
    courseName: { type: String, required: true, trim: true },
    section: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
