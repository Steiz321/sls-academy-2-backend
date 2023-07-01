import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(String(process.env.MONGO_URL));
        console.log('DB connected...');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

}

export default connectDB;
