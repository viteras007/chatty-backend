import mongoose from 'mongoose';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Connected to MongoDB');
      })
      .catch((error) => {
        log.error('Failed to connect to MongoDB', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnect', connect);
};
