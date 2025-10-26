/**
 * Seed script: creates admin user if not exists.
 * Run: npm run seed
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import bcrypt from 'bcryptjs';
dotenv.config();
const M = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';

async function seed(){
  await mongoose.connect(M);
  const adminEmail = 'admin@task.com';
  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log('Admin already exists:', adminEmail);
    process.exit(0);
  }
  const hashed = await bcrypt.hash('Admin@123', 10);
  await User.create({ name: 'Admin', email: adminEmail, password: hashed, role: 'admin' });
  console.log('Admin created:', adminEmail, 'password: Admin@123');
  process.exit(0);
}

seed().catch(err=>{ console.error(err); process.exit(1); });
