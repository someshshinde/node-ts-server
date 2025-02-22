import app from './app';
import {connectToDatabase} from './db/index'

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOSTNAME || 'localhost'

connectToDatabase()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
})
.catch((err)=>{
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if the connection fails
})
