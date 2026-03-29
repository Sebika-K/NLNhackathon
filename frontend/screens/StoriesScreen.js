import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import { getStories, submitStory } from '../services/api';

const FILTERS = ['All', 'Buhari', 'Cheli', 'Ama', 'Sasura Ghar', 'Heavy', 'Hopeful'];
const EMOTIONS = ['😔 Sad', '😰 Anxious', '😶 Numb', '😤 Frustrated', '😞 Hopeless', '😴 Exhausted', '🙂 Okay', '😌 Calm', '😄 Happy'];
const PERSPECTIVES = ['All', 'Buhari', 'Cheli', 'Ama', 'Sasura Ghar', 'Heavy', 'Hopeful'];

const MOCK_STORIES = [
  {
    id: 'm1',
    title: 'Sasural ma pehilo barsa',
    body: 'Moving into a new home was terrifying at first. Every step I took felt unfamiliar and heavy. The silence between me and my mother-in-law felt like a wall neither of us knew how to cross.',
    emotions: ['ANXIOUS'],
    perspectives: ['BUHARI'],
    paragraphs: [
      'Moving into a new home was terrifying at first. Every step I took felt unfamiliar and heavy. The silence between me and my mother-in-law felt like a wall neither of us knew how to cross.',
      "One afternoon, I decided to cook her favorite dal. I didn't say anything — I just placed it in front of her. She looked at me for a moment, then nodded slowly.",
      'That small act opened something between us. We started talking. Not much at first, just small things — the weather, a recipe, a neighbour\'s story.',
    ],
    ending: 'Now, our kitchen smells like understanding. I am still learning, but I no longer feel alone in this home.',
  },
  {
    id: 'm2',
    title: 'Maile aafnai naam feri paare',
    body: 'I was always just "Buhari" or "Mother". I had forgotten the sound of my own name. For years, it felt like I existed only in relation to others.',
    emotions: ['HOPELESS'],
    perspectives: ['CHELI'],
    paragraphs: [
      'I was always just "Buhari" or "Mother". I had forgotten the sound of my own name. For years, it felt like I existed only in relation to others — never as myself.',
      'My daughter asked me one day what my dream was when I was young. I didn\'t have an answer. That question stayed with me for weeks.',
      'I found an old notebook where I had written poems as a girl. Reading them felt like meeting a stranger — and recognizing her.',
    ],
    ending: 'I started writing again. My name is Kamala. And I am still here.',
  },
  {
    id: 'm3',
    title: 'Ama le bujhin',
    body: 'The dinner table was silent until mother reached out her hand. It was a small thing, but it changed everything.',
    emotions: ['TENSE'],
    perspectives: ['AMA'],
    paragraphs: [
      "The dinner table was always silent. We ate, we finished, we left. There was so much unsaid between my mother and me.",
      "One evening, I came home crying from work. I didn't tell her why. She didn't ask. She just made me tea and sat beside me.",
      "We didn't speak for a long time. But for the first time, the silence felt different. It felt like company.",
    ],
    ending: "Ama understood more than I ever gave her credit for. Love doesn't always need words.",
  },
];

function buildTagsFromStory(story) {
  const emotions = story.emotions || [];
  const perspectives = story.perspectives || [];
  return [...emotions, ...perspectives].map((t) => t.toUpperCase());
}

export default function StoriesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('read');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [stories, setStories] = useState(MOCK_STORIES);
  const [loadingStories, setLoadingStories] = useState(true);

  // Share form state
  const [storyTitle, setStoryTitle] = useState('');
  const [storyBody, setStoryBody] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedPerspectives, setSelectedPerspectives] = useState(['All']);
  const [anonymous, setAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getStories()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setStories([...res.data, ...MOCK_STORIES]);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingStories(false));
  }, []);

  const toggleEmotion = (e) =>
    setSelectedEmotions((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );

  const togglePerspective = (p) => {
    if (p === 'All') {
      setSelectedPerspectives(['All']);
      return;
    }
    setSelectedPerspectives((prev) => {
      const withoutAll = prev.filter((x) => x !== 'All');
      return withoutAll.includes(p)
        ? withoutAll.filter((x) => x !== p) || ['All']
        : [...withoutAll, p];
    });
  };

  const filteredStories =
    selectedFilter === 'All'
      ? stories
      : stories.filter((s) => {
          const tags = buildTagsFromStory(s);
          return tags.some((t) => t.toLowerCase() === selectedFilter.toLowerCase());
        });

  const handleShare = async () => {
    if (!storyTitle.trim() || !storyBody.trim()) {
      Alert.alert('Please fill in the title and your story before sharing.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitStory({
        title: storyTitle,
        body: storyBody,
        emotions: selectedEmotions.map((e) => e.replace(/[^ ]+ /, '')),
        perspectives: selectedPerspectives,
        anonymous,
      });
      if (res.success) {
        const newStory = { ...res.data, paragraphs: [storyBody], ending: '' };
        setStories((prev) => [newStory, ...prev]);
      }
    } catch (_) {}

    Alert.alert('Shukriya!', 'Your story has been shared with the community.');
    setStoryTitle('');
    setStoryBody('');
    setSelectedEmotions([]);
    setSelectedPerspectives(['All']);
    setActiveTab('read');
    setSubmitting(false);
  };

  const openStory = (story) => {
    navigation.navigate('StoryDetail', {
      story: {
        id: story.id,
        category: 'HER KATHA',
        title: story.title,
        tags: buildTagsFromStory(story),
        paragraphs: story.paragraphs || [story.body],
        ending: story.ending || '',
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#92ade7', '#EEF3FB', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <TopNav />

          <Text style={styles.heading}>Stories</Text>
          <Text style={styles.subheading}>
            {activeTab === 'read' ? 'Hamro Katha. Hamro Shakti' : 'Share your Katha'}
          </Text>

          {/* TABS */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'read' && styles.activeToggle]}
              onPress={() => setActiveTab('read')}
            >
              <Text style={[styles.toggleText, activeTab === 'read' && styles.activeToggleText]}>
                Read Stories
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'share' && styles.activeToggle]}
              onPress={() => setActiveTab('share')}
            >
              <Text style={[styles.toggleText, activeTab === 'share' && styles.activeToggleText]}>
                Share Yours
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'read' ? (
            <>
              {/* FILTER PILLS */}
              <View style={styles.filterWrap}>
                {FILTERS.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[styles.filterPill, selectedFilter === filter && styles.selectedFilterPill]}
                    onPress={() => setSelectedFilter(filter)}
                  >
                    <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {loadingStories ? (
                <ActivityIndicator color="#7896CD" style={{ marginTop: 20 }} />
              ) : (
                filteredStories.map((story, index) => (
                  <View key={story.id || index} style={[styles.storyCard, index === 1 && styles.storyCardAccent]}>
                    <View style={styles.tagRow}>
                      {buildTagsFromStory(story).map((tag) => (
                        <View key={tag} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyPreview} numberOfLines={3}>
                      {story.body || (story.paragraphs && story.paragraphs[0]) || ''}
                    </Text>
                    <TouchableOpacity onPress={() => openStory(story)}>
                      <Text style={styles.storyLink}>Read her story →</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </>
          ) : (
            <>
              <Text style={styles.formLabel}>Give your Katha a title</Text>
              <TextInput
                placeholder="Something meaningful..."
                placeholderTextColor="#6E7C8F"
                style={styles.input}
                value={storyTitle}
                onChangeText={setStoryTitle}
              />

              <Text style={styles.formLabel}>Write your Katha and how you overcame...</Text>
              <TextInput
                placeholder="Start typing here..."
                placeholderTextColor="#6E7C8F"
                style={styles.textArea}
                multiline
                textAlignVertical="top"
                value={storyBody}
                onChangeText={setStoryBody}
              />

              <Text style={styles.formLabel}>How do you feel about this story?</Text>
              <View style={styles.filterWrap}>
                {EMOTIONS.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.filterPill, selectedEmotions.includes(item) && styles.selectedFilterPill]}
                    onPress={() => toggleEmotion(item)}
                  >
                    <Text style={[styles.filterText, selectedEmotions.includes(item) && styles.selectedFilterText]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.formLabel}>Perspective selector</Text>
              <View style={styles.filterWrap}>
                {PERSPECTIVES.map((p) => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.filterPill, selectedPerspectives.includes(p) && styles.selectedFilterPill]}
                    onPress={() => togglePerspective(p)}
                  >
                    <Text style={[styles.filterText, selectedPerspectives.includes(p) && styles.selectedFilterText]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>👁  Share anonymously</Text>
                <Switch
                  value={anonymous}
                  onValueChange={setAnonymous}
                  trackColor={{ false: '#D6DCEB', true: '#7896CD' }}
                  thumbColor={anonymous ? '#07294D' : '#FFFFFF'}
                />
              </View>

              <TouchableOpacity
                style={[styles.shareButton, submitting && { opacity: 0.7 }]}
                onPress={handleShare}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.shareButtonText}>Share my story</Text>
                )}
              </TouchableOpacity>
            </>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
      </LinearGradient>

      <BottomNav active="Stories" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 40, paddingHorizontal: 20 },
  heading: { fontSize: 32, fontWeight: '700', color: '#004131', marginBottom: 4, marginTop: 8 },
  subheading: { fontSize: 15, color: '#7896CD', marginBottom: 20 },
  toggleRow: { flexDirection: 'row', marginBottom: 20, gap: 12 },
  toggleButton: {
    flex: 1, borderWidth: 1.5, borderColor: '#8A97D1', borderRadius: 999,
    paddingVertical: 14, alignItems: 'center', backgroundColor: 'transparent',
  },
  activeToggle: { backgroundColor: '#07294D', borderColor: '#07294D' },
  toggleText: { fontSize: 15, fontWeight: '600', color: '#8A97D1' },
  activeToggleText: { color: '#FFFFFF' },
  filterWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  filterPill: {
    borderWidth: 1, borderColor: '#2E6E5C', borderRadius: 999,
    paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#FFFFFF',
  },
  selectedFilterPill: { backgroundColor: '#DCE9E3', borderColor: '#2E6E5C' },
  filterText: { color: '#2E6E5C', fontSize: 14 },
  selectedFilterText: { fontWeight: '700' },
  storyCard: { backgroundColor: '#F4F7FC', borderRadius: 20, padding: 20, marginBottom: 16 },
  storyCardAccent: { borderLeftWidth: 5, borderLeftColor: '#183557' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  tag: { backgroundColor: '#D8DEE9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 10, fontWeight: '700', color: '#31496E', letterSpacing: 0.5 },
  storyTitle: { fontSize: 20, fontWeight: '700', color: '#132C4A', marginBottom: 8 },
  storyPreview: { fontSize: 14, lineHeight: 22, color: '#4B5663', marginBottom: 14 },
  storyLink: { fontSize: 15, fontWeight: '700', color: '#132C4A' },
  formLabel: { fontSize: 15, fontWeight: '700', color: '#004131', marginBottom: 10, marginTop: 6 },
  input: {
    width: '100%', backgroundColor: '#F4F7FC', borderRadius: 16,
    paddingHorizontal: 18, paddingVertical: 14, fontSize: 15, color: '#132C4A', marginBottom: 16,
  },
  textArea: {
    width: '100%', minHeight: 140, backgroundColor: '#F4F7FC', borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 16, fontSize: 15, color: '#132C4A', marginBottom: 20,
  },
  switchRow: {
    width: '100%', backgroundColor: '#DDE2F0', borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 4, marginBottom: 20,
  },
  switchLabel: { fontSize: 16, fontWeight: '600', color: '#132C4A' },
  shareButton: {
    width: '100%', backgroundColor: '#7D99D5', paddingVertical: 18,
    borderRadius: 999, alignItems: 'center', marginBottom: 10,
  },
  shareButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});
