import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#92ade7', '#EEF3FB', '#F5F5F5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >

      {/* Image */}
      <Image
        source={require('./assets/didi_logo.png')} 
        style={styles.image}
      />
      {/* Heading */}
      <Text style={styles.heading}>Namaste, I'm here for you</Text>
      {/* Subtext */}
      <Text style={styles.subtext}>
        Welcome to your safe space. How can I guide you today?
      </Text>
      {/* Buttons */}
      <TouchableOpacity style={styles.lightButton}>
        <Text style={styles.lightButtonText}>I am here for myself</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.darkButton}>
        <Text style={styles.darkButtonText}>
          I want to understand someone I love
        </Text>
      </TouchableOpacity>
      {/* Quote */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          "It's okay to take it slow. I'm with you every step of the way."
        </Text>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
    justifyContent: 'center',
  },

  image: {
    width: 232,
    height: 260,
    marginTop: -20,
    marginBottom: 10,
  },

  heading: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2D3A5A',
  },

  subtext: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4A7C6F',
    marginBottom: 25,
  },
  lightButton: {
    backgroundColor: '#DADFE8',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '90%',
    height: 56,   
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  lightButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },

  darkButton: {
    backgroundColor: '#0D2B45',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '90%',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  darkButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  quoteBox: {
    marginTop: 30,
    width: 338,
    minHeight: 90,
    backgroundColor: '#E9E9E9',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#DADADA',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    aelevation: 2,
  },

  quoteText: {
    fontSize: 14,
    color: '#5A7F6F',
    textAlign: 'center',
    textAlign: 'center',
    lineHeight: 22,
  },
});