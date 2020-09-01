import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import AppNavigator from './components/Navigator';

const client = new ApolloClient({
  uri: 'http://192.168.0.170:4000/',
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack}/>
        <AppNavigator />
      </ApplicationProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
