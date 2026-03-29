import React, { useState } from 'react';
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

const moodScoreMap = {
  '😔 Sad': 1,
  '😰 Anxious': 2,
  '😶 Numb': 2,
  '😤 Frustrated': 2,
  '😞 Hopeless': 1,
  '😴 Exhausted': 2,
  '🙂 Okay': 3,
  '😌 Calm': 4,
  '😄 Happy': 5,
};

const bodyOptions = [
  'Head',
  'Shoulders',
  'Chest',
  'Stomach',
  'Back',
  'Limbs',
  'Joints',
];

export default function FeelingsScreen({ navigation }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);

  const toggleEmotion = (item) => {
    setSelectedEmotions((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const toggleBodyPart = (item) => {
    setSelectedBodyParts((prev) =>
      prev.includes(item) ? prev.filter((b) => b !== item) : [...prev, item]
    );
  };

  const handleDone = () => {
    const scores = selectedEmotions.map((e) => moodScoreMap[e] || 3);
    const mood_score =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 3;

    navigation.navigate('Sapana', {
      feelingsData: {
        mood_score,
        emotions: selectedEmotions,
        pain_points: selectedBodyParts,
      },
    });
  };

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
                  selectedEmotions.includes(item) && styles.selectedPill,
                ]}
                onPress={() => toggleEmotion(item)}
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
                  selectedBodyParts.includes(item) && styles.selectedPill,
                ]}
                onPress={() => toggleBodyPart(item)}
              >
                <Text style={styles.pillText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
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
    backgroundColor: '#7896CD',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
});
