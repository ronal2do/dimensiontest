/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useSafeArea, SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const useScreenDimensions = () => {
  const [screenData, setScreenData] = React.useState(Dimensions.get('screen'));
  const [windowData, setWindowData] = React.useState(Dimensions.get('window'));
  const insets = useSafeArea();

  React.useEffect(() => {
    const onChange = result => {
      setScreenData(result.screen);
      setWindowData(result.window);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  return {
    screenData,
    windowData,
    isLandscape: screenData.width > screenData.height,
    insets,
  };
};

const Component: () => React$Node = () => {
  const {screenData, windowData, insets} = useScreenDimensions();
  const [refresh, setRefresh] = React.useState(0);

  React.useEffect(() => {
    setRefresh(refresh + 1)

  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>window sizes</Text>
              <Text style={styles.sectionDescription}>
                Width: {windowData.width}
              </Text>
              <Text style={styles.sectionDescription}>
                Height: {windowData.height}
              </Text>
              <Text style={styles.sectionTitle}>screen sizes</Text>
              <Text style={styles.sectionDescription}>
                Width: {screenData.width}
              </Text>
              <Text style={styles.sectionDescription}>
                Height: {screenData.height}
              </Text>
              <Text style={styles.sectionTitle}>status bar</Text>
              <Text style={styles.sectionDescription}>
                Height: {StatusBar.currentHeight}
              </Text>
              <Text style={styles.sectionDescription}>
                status + Height: {StatusBar.currentHeight + windowData.height}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'gray',
              height: windowData.height,
              width: windowData.width,
              marginBottom: 50,
              borderWidth: 1,
              borderColor: 'tomato',
            }}>
            <Text style={styles.sectionDescription}>
              This square should fit on entiry screen
            </Text>
            <Text style={styles.sectionDescription}>
             number of refreshs {refresh}
            </Text>
            <Text style={styles.sectionDescription}>
              insets top: {insets.top}
            </Text>
            <Text style={styles.sectionDescription}>
              insets right: {insets.right}
            </Text>
            <Text style={styles.sectionDescription}>
              insets left: {insets.left}
            </Text>
            <Text style={styles.sectionDescription}>
              insets bottom: {insets.bottom}
            </Text>
          </View>
          <Text style={styles.sectionDescription}>marginBottom: 50</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App: () => React$Node = () => {
  return (
    <SafeAreaProvider>
      <Component />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
