import localforage from 'localforage';

const setupDB = () => {
    localforage.config({
        driver: localforage.INDEXEDDB,
        name: 'potatoWallet',
        version: 1.0
    });
};
  
export default setupDB;
  