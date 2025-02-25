import mongoose from "mongoose";




const connectToDB = async () : Promise<void> => {
    try {
       const connection = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB", connection.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectToDB;