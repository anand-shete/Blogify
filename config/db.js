const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB connected"))
        .catch((e) => ("DB connection err: ", e))
}

module.exports = connectDB;