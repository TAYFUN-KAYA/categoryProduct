/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View, Text} from 'react-native';
import HomePage from './src/pages/HomePage';
import STORE from './src/store';
import {Provider as ReduxProvider} from 'react-redux';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView>
          <ReduxProvider store={STORE}>
            <HomePage />
          </ReduxProvider>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
