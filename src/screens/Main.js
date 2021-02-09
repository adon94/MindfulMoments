import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import meditations from '../constants/meditations';
import Options from '../components/Options';
import Layout from '../components/Layout';

const Main = () => {
  const [curMed, setCurMed] = useState('');
  const [curDate, setCurDate] = useState('');

  const setMeditation = (remoteMessage) => {
    const date = new Date(remoteMessage.sentTime);
    // const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const formattedDate = moment(date).format('dddd, MMMM Do YYYY, h:mm a');
    console.log(formattedDate);
    setCurMed(remoteMessage.notification.body);
    setCurDate(formattedDate);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      await storeData(remoteMessage);
      setMeditation(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('latestMeditation', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('latestMeditation');
      const remoteMessage = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(remoteMessage);
      if (remoteMessage && remoteMessage.notification) {
        setMeditation(remoteMessage);
      } else {
        setCurMed(meditations[meditations.length - 1]);
      }
    } catch (e) {
      // error reading value
    }
  };

  const randomMed = () => {
    const index = randomIntFromInterval(0, meditations.length - 1);
    setCurDate('');
    setCurMed(meditations[index]);
  };

  useEffect(() => {
    getData();
  }, []);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity onPress={randomMed} style={styles.button}>
          <Text style={styles.meditationText}>{curMed}</Text>
        </TouchableOpacity>
        {curDate !== '' && <Text style={styles.date}>{curDate}</Text>}
      </View>
      <Options />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  button: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  meditationText: {
    color: '#130f40',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Merienda',
  },
  date: {
    color: '#ffffff',
    textAlign: 'right',
  },
});

export default Main;
