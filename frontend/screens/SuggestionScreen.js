import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const mockSuggestions = [
  {
    id: 1,
    title: 'Lok dohori sunera nach',
    category: 'MOVEMENT',
  },
  {
    id: 2,
    title: 'Maan pareko geet ma walk',
    category: 'MOVEMENT',
  },
];

const mockStories = [
  {
    id: 1,
    tags: ['ANXIOUS', 'BUHARI'],
    title: 'Sasural ma pehilo barsa',
    description:
      'Moving into a new home was terrifying at first. Every step I took felt unfamiliar and heavy...',
  },
  {
    id: 2,
    tags: ['HOPELESS', 'CHELI'],
    title: 'Maile aafnai naam feri paare',
    description:
      'I was always just "Buhari" or "Mother". I had forgotten the sound of my own name...',
  },
  {
    id: 3,
    tags: ['TENSE', 'AMA'],
    title: 'Ama le bujhin',
    description:
      'The dinner table was silent until mother reached out her hand. It was a small thing, but it changed everything...',
  },
];

export default function SuggestionScreen({ route }) {
  const selectedDream = route?.params?.selectedDream || 'dancing';

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.topRow}>
      <View style={styles.brandRow}>
        <Image
          source={require('../assets/didi_logo.png')}
          style={styles.brandImage}
        />
        <Text style={styles.brandText}>DIDI</Text>
      </View>

      <View style={styles.profileCircle}>
        <Text style={styles.profileIcon}>◉</Text>
      </View>
    </View>

    <Text style={styles.kicker}>PERSONALIZED FOR YOU</Text>

    <Text style={styles.heading}>DIDI’s Suggestion</Text>

    <Text style={styles.description}>
      I noticed your dream about <Text style={styles.highlight}>{selectedDream}</Text> felt
      vibrant. Here is how we can bring that energy into your day.
    </Text>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: '#F7F7F4',
  },
  topRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 18,
},
brandRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
brandImage: {
  width: 42,
  height: 42,
  borderRadius: 21,
  marginRight: 10,
},
brandText: {
  fontSize: 28,
  color: '#004131',
},
profileCircle: {
  width: 30,
  height: 30,
  borderRadius: 15,
  borderWidth: 1.5,
  borderColor: '#234F46',
  alignItems: 'center',
  justifyContent: 'center',
},
profileIcon: {
  fontSize: 12,
  color: '#234F46',
},
kicker: {
  fontSize: 12,
  letterSpacing: 1.2,
  color: '#7896CD',
  fontWeight: '600',
  marginBottom: 8,
},
heading: {
  fontSize: 28,
  fontWeight: '700',
  color: '#004131',
  marginBottom: 14,
},
description: {
  fontSize: 18,
  lineHeight: 28,
  color: '#2D4169',
  marginBottom: 24,
},
highlight: {
  color: '#8A97D1',
},
});