import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, ActionSheet } from 'native-base';

var BUTTONS = [
  { text: 'Add to Favorites', icon: 'american-football', iconColor: '#2c8ef4' },
  { text: 'Give Feedback', icon: 'analytics', iconColor: '#f42ced' },
  { text: 'Go to Favorites', icon: 'analytics', iconColor: '#f42ced' },
  { text: 'Settings', icon: 'cog', iconColor: '#f42ced' },
  { text: 'Cancel', icon: 'close', iconColor: '#25de5b' },
];

var CANCEL_INDEX = 4;

const Options = () => {
  return (
    <View style={styles.container}>
      <Button
        icon
        transparent
        onPress={() =>
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              title: 'Options',
            },
            (buttonIndex) => {
              console.log('om mani padme hum im');
              ActionSheet.hide();
              // this.setState({ clicked: BUTTONS[buttonIndex] });
            },
          )
        }>
        <Icon
          type="AntDesign"
          // name="ellipsis-v"
          ios="ellipsis1"
          android="md-ellipsis-vertical"
          style={styles.icon}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 20,
  },
  icon: {
    fontSize: 30,
    color: '#ffffff',
  },
});

export default Options;
