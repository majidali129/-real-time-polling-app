import mongoose from 'mongoose'


export const connectDB = async () => {
try {
        const db = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
        const connInstance = await mongoose.connect(db);
        console.log(`\n mongodb connected at host ${connInstance.connection.host}🚀🚀`)

} catch (error) {
    console.log('mongodb connection error');
    process.exit(1)
}}