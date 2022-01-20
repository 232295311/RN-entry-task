import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorage_ {
  async getItem(key: string) {
    return await AsyncStorage.getItem(key);
  }

  async setItem(key: string, value: string) {
    return await AsyncStorage.setItem(key, value);
  }

  async clearItem() {
    return await AsyncStorage.clear();
  }
}
export default new AsyncStorage_();
