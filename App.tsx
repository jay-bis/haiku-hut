import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { Text } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as Font from 'expo-font';
import theme from './custom-theme.json';
import { default as mapping } from './mapping.json';

import AppNavigator from './components/Navigator';

const client = new ApolloClient({
  uri: 'http://10.0.0.169:4000/',
});

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
        <IconRegistry icons={EvaIconsPack}/>
          <AppNavigator />
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
