import mongoose from 'mongoose'

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  mongoose
    .connect(process.env.DB_LOCAL_URI!)
    .then(() => console.log('CONNECTION IS READY!'))
}

export default dbConnect
