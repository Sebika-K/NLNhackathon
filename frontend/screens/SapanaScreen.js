import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default function SapanaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/didi_logo.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Sapana Space</Text>
      <Text style={styles.subtitle}>Yo ठाँउ तिम्रो मात्र हो।</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: '#F5F5F3',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#12324A',
  },
  subtitle: {
    fontSize: 16,
    color: '#12324A',
    marginBottom: 20,
  },
});