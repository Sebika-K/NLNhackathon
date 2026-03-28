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
      <Text>Suggestion Screen</Text>
      <Text>{selectedDream}</Text>
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
});