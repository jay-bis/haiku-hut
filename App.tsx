import {ApolloProvider} from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { Text, AsyncStorage } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as Font from 'expo-font';
import theme from './custom-theme.json';
import { default as mapping } from './mapping.json';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import LoginReducer from './reducers/LoginReducer';
import PostReducer from './reducers/PostReducer';
import AppNavigator from './components/Navigator';

const authLink = setContext( async (_, { headers } ) => {
  const token = await AsyncStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://192.168.0.145:4000/'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const store = createStore(
  combineReducers({
      login: LoginReducer,
      post: PostReducer
  }),
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(client))),
);

export default function App() {

  const [assetsLoaded, setAssetsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function importFonts() {
        await Font.loadAsync({
        'Acre-Medium': require('./assets/Acre-Medium.otf'),
      });
    }
    importFonts().catch((error) => {
      console.error(error);
    });
    setAssetsLoaded(true);
  }, []);

  if (assetsLoaded) {
    return (
      <ApolloProvider client={client}>
        <ApplicationProvider
        {...eva}
        theme={{...eva.light, ...theme}}
        customMapping={{...eva.mapping, mapping}} 
        >
          <Provider store={store}>
            <IconRegistry icons={EvaIconsPack}/>
            <AppNavigator />
          </Provider>
        </ApplicationProvider>
      </ApolloProvider>
    )
  }
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider
        {...eva}
        theme={{...eva.light, ...theme}}
        customMapping={{...eva.mapping, mapping}} 
        >
          <Text>Loading...</Text>
      </ApplicationProvider>
    </ApolloProvider>
  )
}
