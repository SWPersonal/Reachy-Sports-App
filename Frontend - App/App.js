import React, { useState, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import AppLoading from 'expo-app-loading';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, FontAwesome5, EvilIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import SwitchNavigator from './navigation/SwitchNavigator';
import clientConfig from './apollo';
import { AuthProvider } from './AuthContext';
import assets from './asset';   

const App = () => { 
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    try {
      // await AsyncStorage.clear();

      // Preload Fonts
      await Font.loadAsync({
        ...Ionicons.font,
        ...EvilIcons.font,
        ...MaterialIcons.font,
        ...AntDesign.font,
        ...FontAwesome.font,
        ...Feather.font,
        ...FontAwesome5.font,
        ...MaterialCommunityIcons.font
      });

      // Preload Assets
      await Asset.loadAsync([
        ...assets
      ]);

      // Persist Cache
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      // initialize client
      const client = clientConfig(cache);

      // check if user is authenticated
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);

    } catch(e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ?  (
    <ApolloProvider client={client}>
      <AuthProvider isLoggedIn={isLoggedIn}>
        <SwitchNavigator />
      </AuthProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  )
}

export default App;
