import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './data/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import BookmarkManager from './component/BookmarkManager';


function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{flex: 1}}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor='#fff'
          />
            <BookmarkManager />
          </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}


export default App;
