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
    <LinearGradient
        colors={['#92ade7', '#EEF3FB', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
        >
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

            {mockSuggestions.map((item) => (
                <TouchableOpacity key={item.id} style={styles.suggestionCard}>
                <View style={styles.heartCircle}>
                    <Text style={styles.heart}>♥</Text>
                </View>

                <View style={styles.suggestionTextWrap}>
                    <Text style={styles.suggestionTitle}>{item.title}</Text>
                    <Text style={styles.suggestionCategory}>{item.category}</Text>
                </View>

                <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            ))}

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
                    {story.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                    ))}
                </View>

                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyDescription}>{story.description}</Text>

                <TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
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
  suggestionCard: {
    borderWidth: 1,
    borderColor: '#052138',
    backgroundColor: '#F4F7FC',
    borderRadius: 0,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heartCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  heart: {
    color: '#132C4A',
    fontSize: 20,
  },
  suggestionTextWrap: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 18,
    color: '#132C4A',
    marginBottom: 2,
  },
  suggestionCategory: {
    fontSize: 12,
    color: '#9EAFE9',
    letterSpacing: 0.8,
  },
  arrow: {
    fontSize: 26,
    color: '#6E7080',
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