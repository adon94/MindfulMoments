import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const topColor = '#C6FFDD';
const middleColor = '#FBD786';
const bottomColor = '#f7797d';

const Layout = ({ children }) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={topColor}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.body}>
        <LinearGradient
          colors={[topColor, middleColor, bottomColor]}
          style={styles.linearGradient}>
          {children}
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
});

export default Layout;
