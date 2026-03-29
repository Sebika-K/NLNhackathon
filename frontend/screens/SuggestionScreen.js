import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

// Hardcoded story library with emotion + perspective tags
const ALL_STORIES = [
  {
    id: 's1',
    tags: ['ANXIOUS', 'BUHARI'],
    emotions: ['ANXIOUS', 'NUMB'],
    hobbies: ['NACH', 'SANGEET', 'SHANTI'],
    title: 'Sasural ma pehilo barsa',
    description: 'Moving into a new home was terrifying at first. Every step I took felt unfamiliar and heavy...',
    paragraphs: [
      'Moving into a new home was terrifying at first. Every step I took felt unfamiliar and heavy. The silence between me and my mother-in-law felt like a wall neither of us knew how to cross.',
      "One afternoon, I decided to cook her favorite dal. I didn't say anything — I just placed it in front of her. She looked at me for a moment, then nodded slowly.",
      "That small act opened something between us. We started talking. Not much at first, just small things — the weather, a recipe, a neighbour's story.",
    ],
    ending: 'Now, our kitchen smells like understanding. I am still learning, but I no longer feel alone in this home.',
  },
  {
    id: 's2',
    tags: ['HOPELESS', 'CHELI'],
    emotions: ['HOPELESS', 'SAD', 'EXHAUSTED'],
    hobbies: ['LEKHNA', 'PADHNA', 'KALA'],
    title: 'Maile aafnai naam feri paare',
    description: 'I was always just "Buhari" or "Mother". I had forgotten the sound of my own name...',
    paragraphs: [
      "I was always just 'Buhari' or 'Mother'. I had forgotten the sound of my own name. For years, it felt like I existed only in relation to others — never as myself.",
      "My daughter asked me one day what my dream was when I was young. I didn't have an answer. That question stayed with me for weeks.",
      'I found an old notebook where I had written poems as a girl. Reading them felt like meeting a stranger — and recognizing her.',
    ],
    ending: 'I started writing again. My name is Kamala. And I am still here.',
  },
  {
    id: 's3',
    tags: ['TENSE', 'AMA'],
    emotions: ['FRUSTRATED', 'NUMB', 'EXHAUSTED'],
    hobbies: ['KHANA', 'SHANTI', 'BAGAINI'],
    title: 'Ama le bujhin',
    description: 'The dinner table was silent until mother reached out her hand. It was a small thing, but it changed everything...',
    paragraphs: [
      "The dinner table was always silent. We ate, we finished, we left. There was so much unsaid between my mother and me — years of expectation and disappointment sitting between the rice and the dal.",
      "One evening, I came home crying from work. I didn't tell her why. She didn't ask. She just made me tea and sat beside me.",
      "We didn't speak for a long time. But for the first time, the silence felt different. It felt like company.",
    ],
    ending: "Ama understood more than I ever gave her credit for. Love doesn't always need words.",
  },
  {
    id: 's4',
    tags: ['ANXIOUS', 'PEACE FOUND'],
    emotions: ['ANXIOUS', 'FRUSTRATED', 'OKAY'],
    hobbies: ['NACH', 'SANGEET', 'GHOOM'],
    title: "Maya's Morning Tea",
    description: 'In the quiet corners of her Kathmandu kitchen, Maya watched the steam rise from her brass tea set...',
    paragraphs: [
      "In the quiet corners of her Kathmandu kitchen, Maya watched the steam rise from her brass tea set. For years, the silence of the house had felt heavy, filled with words her husband Sita's family never let her speak.",
      "One Tuesday morning, instead of lowering her eyes when her mother-in-law entered, Maya chose to offer a cup of tea first. She spoke clearly about her wish to join the neighborhood weaving collective, her voice steady like the Trishuli river.",
      "The resistance she feared didn't shatter the room; it simply softened. Through small daily acts of quiet courage and honest conversation, the walls of the household began to breathe with a new understanding.",
    ],
    ending: "Now, the tea tastes of jasmine and freedom. Maya isn't just a daughter-in-law anymore; she is the architect of her own morning light. Hope is a flame that survives every winter.",
  },
  {
    id: 's5',
    tags: ['SAD', 'HOPEFUL'],
    emotions: ['SAD', 'HOPELESS', 'CALM'],
    hobbies: ['KALA', 'LEKHNA', 'SAUNDARYA'],
    title: 'Ramro din aaucha',
    description: 'For months, I cried alone in the bathroom so no one would worry. Then one day, I painted my feelings...',
    paragraphs: [
      "For months, I cried alone in the bathroom so no one would worry. I thought being strong meant hiding everything. But the weight kept growing.",
      "My neighbor gave me a set of watercolors for Dashain. On a quiet afternoon, I sat and painted what I couldn't say. Blues and greys, then slowly — orange.",
      "I showed it to my daughter. She said, 'Ama, this is beautiful. Are you okay?' It was the first time in years someone had truly asked.",
    ],
    ending: "I am learning that strength is not silence. It is showing up for yourself, one color at a time.",
  },
  {
    id: 's6',
    tags: ['EXHAUSTED', 'KAAM'],
    emotions: ['EXHAUSTED', 'FRUSTRATED', 'OKAY'],
    hobbies: ['KAAM', 'GHOOM', 'SHANTI'],
    title: 'Afno laagi ek din',
    description: 'I had not taken a day for myself in three years. My sister forced me to rest. That day changed everything...',
    paragraphs: [
      "I had not taken a day for myself in three years. Every day was for the family, the house, the work. I had forgotten what rest felt like.",
      "My sister came one Saturday and told me to go. Just go. She would handle everything. I walked to the river and sat there for two hours, doing nothing.",
      "The guilt came first. Then, slowly, something loosened in my chest. I hadn't realized how tightly I had been holding everything.",
    ],
    ending: "Rest is not laziness. It is how you stay. I take one afternoon now, every two weeks. Just for me.",
  },
];

// Activity suggestions mapped by hobby keyword
const HOBBY_SUGGESTIONS = {
  NACH:     [{ title: 'Lok dohori sunera nach', category: 'MOVEMENT' }, { title: 'Ghar ma dance class join garu', category: 'MOVEMENT' }],
  SANGEET:  [{ title: 'Maan pareko geet sunera walk garu', category: 'MOVEMENT' }, { title: 'Ek geet gaau aaja', category: 'EXPRESSION' }],
  KALA:     [{ title: 'Ek rang le kagaj rangau', category: 'EXPRESSION' }, { title: 'Hातले केही बनाउनु', category: 'EXPRESSION' }],
  PADHNA:   [{ title: 'Ek katha padhau aaja', category: 'MIND' }, { title: '10 minuta kitab sangai basu', category: 'MIND' }],
  LEKHNA:   [{ title: 'Diary ma teen kura lekhau', category: 'EXPRESSION' }, { title: 'Ek katha lekhna suru garu', category: 'EXPRESSION' }],
  BAGAINI:  [{ title: 'Ek birana ghar ko bahar lagau', category: 'NATURE' }, { title: 'Bagaincha hidnu jau', category: 'NATURE' }],
  KHANA:    [{ title: 'Maan pareko khana pakau aaja', category: 'NOURISHMENT' }, { title: 'Chiya banaau ra basu', category: 'NOURISHMENT' }],
  SHANTI:   [{ title: '5 minuta sas leu — dhirai', category: 'PEACE' }, { title: 'Aankhaa banda garera basu', category: 'PEACE' }],
  SAUNDARYA:[{ title: 'Aafailai kheryal garau', category: 'SELF-CARE' }, { title: 'Ramro luga lagau — koi karan bina', category: 'SELF-CARE' }],
  KAAM:     [{ title: 'Ek sano goal set garau aaja', category: 'PURPOSE' }, { title: 'Afno kaam ko list banau', category: 'PURPOSE' }],
  GHOOM:    [{ title: 'Najik ko ek thau hidna jau', category: 'MOVEMENT' }, { title: 'Ek naya galli explore garau', category: 'MOVEMENT' }],
  SAMAJ:    [{ title: 'Ek manchelai help garau aaja', category: 'CONNECTION' }, { title: 'Padosi sanga kura garau', category: 'CONNECTION' }],
};

const DEFAULT_SUGGESTIONS = [
  { title: 'Afno laagi 10 minuta nikala', category: 'SELF-CARE' },
  { title: 'Ek gahairo sas leu', category: 'PEACE' },
];

function getSuggestions(dream) {
  if (!dream) return DEFAULT_SUGGESTIONS;
  const upper = dream.toUpperCase();
  for (const key of Object.keys(HOBBY_SUGGESTIONS)) {
    if (upper.includes(key)) return HOBBY_SUGGESTIONS[key];
  }
  return DEFAULT_SUGGESTIONS;
}

function getMatchingStories(emotions) {
  if (!emotions || emotions.length === 0) return ALL_STORIES.slice(0, 3);

  // Strip emoji from emotion strings like "😰 Anxious" → "ANXIOUS"
  const emotionKeys = emotions.map((e) =>
    e.replace(/[^ ]+ /, '').toUpperCase()
  );

  const matched = ALL_STORIES.filter((s) =>
    s.emotions.some((e) => emotionKeys.includes(e))
  );

  return matched.length > 0 ? matched : ALL_STORIES.slice(0, 3);
}

export default function SuggestionScreen({ route, navigation }) {
  const selectedDream = route?.params?.selectedDream || '';
  const recommendation = route?.params?.recommendation || null;
  const emotions = route?.params?.emotions || [];

  const suggestions = getSuggestions(selectedDream);
  const matchedStories = getMatchingStories(emotions);

  const openStory = (story) => {
    navigation.navigate('StoryDetail', {
      story: {
        id: story.id,
        category: 'HER KATHA',
        title: story.title,
        tags: story.tags,
        paragraphs: story.paragraphs,
        ending: story.ending,
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

          <Text style={styles.kicker}>PERSONALIZED FOR YOU</Text>
          <Text style={styles.heading}>DIDI's Suggestion</Text>

          {selectedDream ? (
            <Text style={styles.description}>
              I noticed your dream about{' '}
              <Text style={styles.highlight}>{selectedDream}</Text> felt vibrant.
              Here is how we can bring that energy into your day.
            </Text>
          ) : (
            <Text style={styles.description}>
              Here is what DIDI thinks will help you today.
            </Text>
          )}

          {/* AI RECOMMENDATION */}
          {recommendation && (
            <View style={styles.aiCard}>
              <View style={styles.heartCircle}>
                <Text style={styles.heart}>♥</Text>
              </View>
              <View style={styles.suggestionTextWrap}>
                <Text style={styles.suggestionTitle}>{recommendation}</Text>
              </View>
            </View>
          )}

          {/* ACTIVITY SUGGESTIONS */}
          {suggestions.map((item, i) => (
            <View key={i} style={styles.suggestionCard}>
              <View style={styles.heartCircle}>
                <Text style={styles.heart}>♥</Text>
              </View>
              <View style={styles.suggestionTextWrap}>
                <Text style={styles.suggestionTitle}>{item.title}</Text>
                <Text style={styles.suggestionCategory}>{item.category}</Text>
              </View>
            </View>
          ))}

          {/* SUCCESS STORIES */}
          <Text style={styles.storyHeading}>Success Katha</Text>
          <Text style={styles.storySubheading}>
            {emotions.length > 0
              ? 'Stories from women who felt what you feel.'
              : 'You are not alone in what you feel.'}
          </Text>

          {matchedStories.map((story, index) => (
            <View
              key={story.id}
              style={[styles.storyCard, index === 1 && styles.storyCardAccent]}
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

              <TouchableOpacity onPress={() => openStory(story)}>
                <Text style={styles.storyLink}>Read her story →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>

      <BottomNav active="Dream" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 1.2,
    color: '#7896CD',
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 12,
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
    color: '#2D4169',
    marginBottom: 20,
  },
  highlight: {
    color: '#8A97D1',
    fontWeight: '600',
  },
  aiCard: {
    borderWidth: 1,
    borderColor: '#7896CD',
    backgroundColor: '#EEF3FB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  suggestionCard: {
    borderWidth: 1,
    borderColor: '#052138',
    backgroundColor: '#F4F7FC',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  heartCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  heart: { color: '#132C4A', fontSize: 18 },
  suggestionTextWrap: { flex: 1 },
  suggestionTitle: { fontSize: 16, color: '#132C4A', lineHeight: 22 },
  suggestionCategory: { fontSize: 11, color: '#9EAFE9', letterSpacing: 0.8, marginTop: 2 },
  storyHeading: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#004131',
    textAlign: 'center',
  },
  storySubheading: {
    marginTop: 6,
    marginBottom: 18,
    textAlign: 'center',
    fontSize: 14,
    color: '#7896CD',
  },
  storyCard: {
    backgroundColor: '#F4F7FC',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  storyCardAccent: { borderLeftWidth: 5, borderLeftColor: '#183557' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  tag: {
    backgroundColor: '#D8DEE9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { fontSize: 10, fontWeight: '700', color: '#31496E', letterSpacing: 0.5 },
  storyTitle: { fontSize: 18, fontWeight: '700', color: '#132C4A', marginBottom: 8 },
  storyDescription: { fontSize: 14, lineHeight: 22, color: '#4B5663', marginBottom: 12 },
  storyLink: { fontSize: 15, fontWeight: '700', color: '#132C4A' },
});
