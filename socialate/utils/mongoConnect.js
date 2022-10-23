import mongoose from 'mongoose';

const MongoConnect = async () => mongoose.connect(process.env.MONGODB_URI);

export default MongoConnect;
