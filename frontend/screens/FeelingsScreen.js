import React from 'react';
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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: '#F6F5F3',
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
  
});