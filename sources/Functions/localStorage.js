import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error, "set");
  }
};

export const getData = async (key) => {
  try {
    const item = await AsyncStorage.getItem(key);

    return JSON.parse(item);
  } catch (error) {
    console.log(error, "get");
  }
};
