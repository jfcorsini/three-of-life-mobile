import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
});

module.exports = storage;
