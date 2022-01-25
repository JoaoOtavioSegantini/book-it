/* eslint-disable @typescript-eslint/no-var-requires */
const Room = require('../models/room')
const mongoose = require('mongoose')

const rooms = require('../data/rooms')

mongoose
  .connect('mongodb://localhost:27017/bookit')
  .then(() => console.log('CONNECTION IS READY!'))

const seedRooms = async () => {
  try {
    await Room.deleteMany()
    console.log('Rooms are deleted')

    await Room.insertMany(rooms)
    console.log('All Rooms are added.')

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedRooms()
