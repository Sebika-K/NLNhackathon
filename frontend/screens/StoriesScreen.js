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

const filters = ['All', 'Buhari', 'Cheli', 'Ama', 'Sasura Ghar', 'Heavy', 'Hopeful'];

const stories = [
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

export default function StoriesScreen() {
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

            <Text style={styles.heading}>Stories</Text>
            <Text style={styles.subheading}>Hamro Katha. Hamro Shakti</Text>

            <View style={styles.toggleRow}>
                <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
                <Text style={[styles.toggleText, styles.activeToggleText]}>
                    Read Stories
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.toggleButton}>
                <Text style={styles.toggleText}>Share Yours</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.filterWrap}>
                {filters.map((filter, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                    styles.filterPill,
                    filter === 'All' && styles.selectedFilterPill,
                    ]}
                >
                    <Text
                    style={[
                        styles.filterText,
                        filter === 'All' && styles.selectedFilterText,
                    ]}
                    >
                    {filter}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>

            {stories.map((story, index) => (
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
    width: 60,
    height: 60,
    borderRadius: 21,
    marginRight: 10,
  },
  brandText: {
    fontSize: 28,
    color: '#51624F',
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
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 16,
    color: '#7896CD',
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#8A97D1',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#F7F7F4',
  },
  activeToggle: {
    backgroundColor: '#07294D',
    borderColor: '#07294D',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8A97D1',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  filterWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 26,
  },
  filterPill: {
    borderWidth: 1,
    borderColor: '#2E6E5C',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  selectedFilterPill: {
    backgroundColor: '#DCE9E3',
  },
  filterText: {
    color: '#2E6E5C',
    fontSize: 14,
  },
  selectedFilterText: {
    fontWeight: '600',
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