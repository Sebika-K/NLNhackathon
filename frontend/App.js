import { View, Text, StyleSheet, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.logo}>DIDI</Text>

      <Image
        source={require('./assets/icon.png')} 
        style={styles.image}
      />

      <Text style={styles.heading}>Namaste, I'm here for you</Text>

      <Text style={styles.subtext}>
        Welcome to your safe space. How can I guide you today?
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },

  logo: {
    fontSize: 28,
    marginBottom: 10,
    color: '#2F4F3E',
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2D3A5A',
  },

  subtext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4A7C6F',
    marginBottom: 25,
  },
});