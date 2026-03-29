import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import TopNav from '../components/TopNav';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getRecommendation } from '../services/api';

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

export default function SuggestionScreen({ route, navigation }) {
  const selectedDream = route?.params?.selectedDream || 'your dream';
  const mood_score = route?.params?.mood_score ?? 3;

  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendation({ mood_score, dream_space: selectedDream })
      .then(data => {
        if (data?.recommendation) {
          setRecommendation(data.recommendation);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <LinearGradient
      colors={['#92ade7', '#EEF3FB', '#F5F5F5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <TopNav />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.kicker}>PERSONALIZED FOR YOU</Text>

        <Text style={styles.heading}>DIDI's Suggestion</Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color="#7896CD" size="large" />
            <Text style={styles.loadingText}>DIDI is thinking...</Text>
          </View>
        ) : recommendation ? (
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationText}>{recommendation}</Text>
          </View>
        ) : (
          <Text style={styles.description}>
            I noticed your dream about{' '}
            <Text style={styles.highlight}>{selectedDream}</Text> felt vibrant.
            Here is how we can bring that energy into your day.
          </Text>
        )}

        <Text style={styles.storyHeading}>Success Katha</Text>
        <Text style={styles.storySubheading}>
          You are not alone in what you feel.
        </Text>

        {mockStories.map((story, index) => (
          <View
            key={story.id}
            style={[
              styles.storyCard,
              index === 1 && styles.storyCardAccent,
            ]}
          >
            <View style={styles.tagRow}>
              {story.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyDescription}>{story.description}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Stories')}>
              <Text style={styles.storyLink}>Read her story →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 24,
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
  loadingBox: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7896CD',
  },
  recommendationCard: {
    backgroundColor: '#EFF1F8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#7896CD',
  },
  recommendationText: {
    fontSize: 17,
    lineHeight: 28,
    color: '#2D4169',
  },
  storyHeading: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: '700',
    color: '#004131',
    textAlign: 'center',
  },
  storySubheading: {
    marginTop: 8,
    marginBottom: 22,
    textAlign: 'center',
    fontSize: 16,
    color: '#7896CD',
  },
  storyCard: {
    backgroundColor: '#F4F7FC',
    borderRadius: 30,
    padding: 22,
    marginBottom: 22,
  },
  storyCardAccent: {
    borderLeftWidth: 6,
    borderLeftColor: '#183557',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  tag: {
    backgroundColor: '#D8DEE9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#31496E',
    letterSpacing: 0.5,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#132C4A',
    marginBottom: 10,
  },
  storyDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5663',
    marginBottom: 18,
  },
  storyLink: {
    fontSize: 18,
    fontWeight: '700',
    color: '#132C4A',
  },
});
