import express from 'express';
import sequelize from './config/database/database.js';
import taskRoutes from './routes/taskRoutes.js';
import config from './config/env/env-config.js'
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = config.port || 3000;

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.use('/api/task', taskRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
