import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {store} from './store/redux/store';
import {Provider} from 'react-redux';
import DrawStack from './screens/DrawStack';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#03296a" />
      <Provider store={store}>
        <NavigationContainer>
          <DrawStack />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
