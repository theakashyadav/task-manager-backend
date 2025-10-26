import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, default: '' },
  status: { type: String, enum: ['pending','completed'], default: 'pending' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
