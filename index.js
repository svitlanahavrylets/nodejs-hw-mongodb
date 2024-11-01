import { setupServer } from './src/server.js';
import { initMongoConnection } from './src/db/initMongoConnection.js';

const boostrap = async () => {
  await initMongoConnection();
  setupServer();
};
boostrap();

// XrEPUsb8yaXoRmLb
