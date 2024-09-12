
import React from 'react';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './src/stacks/Navigation';

const App = () => {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;