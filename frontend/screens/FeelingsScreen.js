import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const emotionOptions = [
  '😔 Sad',
  '😰 Anxious',
  '😶 Numb',
  '😤 Frustrated',
  '😞 Hopeless',
  '😴 Exhausted',
  '🙂 Okay',
  '😌 Calm',
  '😄 Happy',
];

const bodyOptions = [
  'Head',
  'Shoulders',
  'Chest',
  'Stomach',
  'Back',
  'Limbs',
  'Joints',
];

export default function FeelingsScreen() {
  return (
    <LinearGradient
    colors={['#92ade7', '#EEF3FB', '#F5F5F5']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1 }}
  >
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/didi_logo.png')}
        style={styles.image}
      />

      <Text style={styles.heading}>
        Good morning. How are you feeling today?
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>How are you feeling inside?</Text>
        <View style={styles.pillWrap}>
          {emotionOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pill,
                item === '😌 Calm' && styles.selectedPill,
              ]}
            >
              <Text style={styles.pillText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Are you feeling any pain in your body?
        </Text>
        <View style={styles.pillWrap}>
          {bodyOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pill,
                item === 'Shoulders' && styles.selectedPill,
              ]}
            >
              <Text style={styles.pillText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>

  </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  image: {
    width: 210,
    height: 210,
    resizeMode: 'contain',
    marginBottom: 2,
  },

  heading: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#334A7D',
    lineHeight: 40,
    marginBottom: 28,
  },

  card: {
    width: '100%',
    backgroundColor: '#EFF1F8',
    borderRadius: 28,
    padding: 24,
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#334A7D',
    marginBottom: 18,
    textAlign: 'center',
    lineHeight: 32,
  },
  pillWrap: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  justifyContent: 'center',
},

pill: {
  borderWidth: 1,
  borderColor: '#2D7A63',
  borderRadius: 999,
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: '#FFFFFF',
},

selectedPill: {
  backgroundColor: '#BED3CC',
},

pillText: {
  fontSize: 14,
  color: '#334A7D',
},

doneButton: {
  marginTop: 4,
  width: '100%',
  backgroundColor: '#7C99D4',
  paddingVertical: 18,
  borderRadius: 999,
  alignItems: 'center',
},

doneButtonText: {
  fontSize: 22,
  fontWeight: '700',
  color: '#334A7D',
},
  
});