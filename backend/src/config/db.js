import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log(`💚 MongoDB Connected: ${conn.connection.host}`);
        console.log(`📂 Using database: ${conn.connection.name}`);
        const admin = mongoose.connection.db.admin();
        const dbList = await admin.listDatabases();

        console.log('\n📚 Available Databases:');
        dbList.databases.forEach(db => {
        console.log(`- ${db.name}`);
        });
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); 
    }
}

export default connectDB;