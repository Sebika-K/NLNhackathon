import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
} from 'react-native';

const filters = ['All', 'Buhari', 'Cheli', 'Ama', 'Sasura Ghar', 'Heavy', 'Hopeful'];
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

export default function StoriesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('read');
  const [anonymous, setAnonymous] = useState(false);
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
                <TouchableOpacity
                    style={[
                    styles.toggleButton,
                    activeTab === 'read' && styles.activeToggle,
                    ]}
                    onPress={() => setActiveTab('read')}
                >
                    <Text
                    style={[
                        styles.toggleText,
                        activeTab === 'read' && styles.activeToggleText,
                    ]}
                    >
                    Read Stories
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                    styles.toggleButton,
                    activeTab === 'share' && styles.activeToggle,
                    ]}
                    onPress={() => setActiveTab('share')}
                >
                    <Text
                    style={[
                        styles.toggleText,
                        activeTab === 'share' && styles.activeToggleText,
                    ]}
                    >
                    Share Yours
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'read' ? (
                <>
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

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('StoryDetail', {
                              story: {
                                category: 'HER KATHA',
                                title: story.title,
                                tags: story.tags,
                                paragraphs: [
                                  story.description,
                                  'One Tuesday morning, instead of lowering her eyes, she chose to speak clearly about her wishes.',
                                  'Through small acts of courage, the household slowly softened.',
                                ],
                                ending:
                                  'Now, hope lives quietly in her everyday life. She is no longer silent.',
                              },
                            })
                           }
                        >

                        <Text style={styles.storyLink}>Read her story →</Text>
                        </TouchableOpacity>
                    </View>
                    ))}
                </>
                ) : (
                <>
                    <Text style={styles.formLabel}>Give your Katha a title</Text>
                    <TextInput
                    placeholder="Something meaningful..."
                    placeholderTextColor="#6E7C8F"
                    style={styles.input}
                    />

                    <Text style={styles.formLabel}>
                    Write your Katha and how you overcame...
                    </Text>
                    <TextInput
                    placeholder="Start typing here..."
                    placeholderTextColor="#6E7C8F"
                    style={styles.textArea}
                    multiline
                    textAlignVertical="top"
                    />

                    <Text style={styles.formLabel}>How do you feel about this story?</Text>
                    <View style={styles.filterWrap}>
                    {emotionOptions.map((item, index) => (
                        <TouchableOpacity
                        key={index}
                        style={[
                            styles.filterPill,
                            item === '😌 Calm' && styles.selectedFilterPill,
                        ]}
                        >
                        <Text style={styles.filterText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                    </View>

                    <Text style={styles.formLabel}>Perspective selector</Text>
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

                    <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Share anonymously</Text>
                    <Switch
                        value={anonymous}
                        onValueChange={setAnonymous}
                        trackColor={{ false: '#D6DCEB', true: '#9DB3E6' }}
                        thumbColor={anonymous ? '#07294D' : '#FFFFFF'}
                    />
                    </View>

                    <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Share my story</Text>
                    </TouchableOpacity>
                </>
)}
    
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
  formLabel: {
  width: '100%',
  fontSize: 16,
  fontWeight: '700',
  color: '#004131',
  marginBottom: 10,
  marginTop: 8,
},
input: {
  width: '100%',
  backgroundColor: '#F4F7FC',
  borderRadius: 20,
  paddingHorizontal: 18,
  paddingVertical: 16,
  fontSize: 16,
  color: '#132C4A',
  marginBottom: 20,
},
textArea: {
  width: '100%',
  minHeight: 140,
  backgroundColor: '#F4F7FC',
  borderRadius: 28,
  paddingHorizontal: 18,
  paddingVertical: 18,
  fontSize: 16,
  color: '#132C4A',
  marginBottom: 22,
},
switchRow: {
  width: '100%',
  backgroundColor: '#DDE2F0',
  borderRadius: 22,
  paddingHorizontal: 18,
  paddingVertical: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
  marginBottom: 24,
},
switchLabel: {
  fontSize: 18,
  fontWeight: '600',
  color: '#132C4A',
},
shareButton: {
  width: '100%',
  backgroundColor: '#7D99D5',
  paddingVertical: 18,
  borderRadius: 999,
  alignItems: 'center',
  marginBottom: 24,
},
shareButtonText: {
  color: '#FFFFFF',
  fontSize: 20,
  fontWeight: '700',
},
});