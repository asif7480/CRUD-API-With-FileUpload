import mongoose from "mongoose";

export const connecDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`Connected to: ${connectionInstance.connection.host}`);
        
    }catch(err){
        console.log(`Connection Failed: ${err}`);
    }
}
