import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExist.js';
import { TEMP_UPLOAD_DIR, UPLOADS_DIR } from './constants/index.js';

const boostrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOADS_DIR);
    setupServer();
  } catch (error) {
    console.error(error);
  }
};
boostrap();

// XrEPUsb8yaXoRmLb
