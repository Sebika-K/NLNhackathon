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

// ─── Story library ────────────────────────────────────────────────────────────
// emotions: what the USER felt when they checked in (matches FeelingsScreen options)
// tags: display labels shown on the card
const ALL_STORIES = [
  {
    id: 's1',
    tags: ['ANXIOUS', 'BUHARI'],
    emotions: ['ANXIOUS', 'NUMB'],
    title: 'Sasural ma pehilo barsa',
    description: 'Moving into a new home was terrifying. Every step felt unfamiliar and heavy...',
    paragraphs: [
      'Moving into a new home was terrifying at first. Every step I took felt unfamiliar and heavy. The silence between me and my mother-in-law felt like a wall neither of us knew how to cross.',
      "One afternoon, I decided to cook her favourite dal. I didn't say anything — I just placed it in front of her. She looked at me for a moment, then nodded slowly.",
      "That small act opened something between us. We started talking. Not much at first, just small things — the weather, a recipe, a neighbour's story.",
    ],
    ending: 'Now, our kitchen smells like understanding. I am still learning, but I no longer feel alone in this home.',
  },
  {
    id: 's2',
    tags: ['HOPELESS', 'CHELI'],
    emotions: ['HOPELESS', 'SAD'],
    title: 'Maile aafnai naam feri paare',
    description: 'I was always just "Buhari" or "Mother". I had forgotten the sound of my own name...',
    paragraphs: [
      "I was always just 'Buhari' or 'Mother'. I had forgotten the sound of my own name. For years it felt like I existed only in relation to others — never as myself.",
      "My daughter asked me one day what my dream was when I was young. I didn't have an answer. That question stayed with me for weeks.",
      'I found an old notebook where I had written poems as a girl. Reading them felt like meeting a stranger — and recognising her.',
    ],
    ending: 'I started writing again. My name is Kamala. And I am still here.',
  },
  {
    id: 's3',
    tags: ['EXHAUSTED', 'AMA'],
    emotions: ['EXHAUSTED', 'NUMB', 'FRUSTRATED'],
    title: 'Ama le bujhin',
    description: 'The dinner table was silent until mother reached out her hand. It changed everything...',
    paragraphs: [
      "The dinner table was always silent. There was so much unsaid between my mother and me — years of expectation and disappointment.",
      "One evening I came home crying from work. I didn't tell her why. She didn't ask. She just made me tea and sat beside me.",
      "We didn't speak for a long time. But for the first time, the silence felt different. It felt like company.",
    ],
    ending: "Ama understood more than I ever gave her credit for. Love doesn't always need words.",
  },
  {
    id: 's4',
    tags: ['ANXIOUS', 'PEACE FOUND'],
    emotions: ['ANXIOUS', 'FRUSTRATED', 'OKAY'],
    title: "Maya's Morning Tea",
    description: 'In the quiet corners of her Kathmandu kitchen, Maya watched the steam rise...',
    paragraphs: [
      "In the quiet corners of her Kathmandu kitchen, Maya watched the steam rise from her brass tea set. For years the silence of the house had felt heavy.",
      "One Tuesday morning, instead of lowering her eyes, Maya chose to offer a cup of tea first. She spoke clearly about her wish to join the neighbourhood weaving collective.",
      "The resistance she feared didn't shatter the room; it simply softened. Through small daily acts of quiet courage the walls of the household began to breathe.",
    ],
    ending: "Now the tea tastes of jasmine and freedom. Hope is a flame that survives every winter.",
  },
  {
    id: 's5',
    tags: ['SAD', 'HOPEFUL'],
    emotions: ['SAD', 'HOPELESS', 'CALM'],
    title: 'Ramro din aaucha',
    description: 'For months I cried alone in the bathroom so no one would worry. Then one day, I painted my feelings...',
    paragraphs: [
      "For months I cried alone in the bathroom so no one would worry. I thought being strong meant hiding everything. But the weight kept growing.",
      "My neighbour gave me a set of watercolours for Dashain. On a quiet afternoon I sat and painted what I couldn't say. Blues and greys, then slowly — orange.",
      "I showed it to my daughter. She said, 'Ama, this is beautiful. Are you okay?' It was the first time in years someone had truly asked.",
    ],
    ending: "I am learning that strength is not silence. It is showing up for yourself, one colour at a time.",
  },
  {
    id: 's6',
    tags: ['EXHAUSTED', 'SELF-CARE'],
    emotions: ['EXHAUSTED', 'FRUSTRATED', 'OKAY'],
    title: 'Afno laagi ek din',
    description: 'I had not taken a day for myself in three years. My sister forced me to rest...',
    paragraphs: [
      "I had not taken a day for myself in three years. Every day was for the family, the house, the work. I had forgotten what rest felt like.",
      "My sister came one Saturday and told me to go. Just go. She would handle everything. I walked to the river and sat there for two hours, doing nothing.",
      "The guilt came first. Then, slowly, something loosened in my chest. I hadn't realised how tightly I had been holding everything.",
    ],
    ending: "Rest is not laziness. It is how you stay. I take one afternoon now, every two weeks. Just for me.",
  },
  {
    id: 's7',
    tags: ['FRUSTRATED', 'STRENGTH'],
    emotions: ['FRUSTRATED', 'ANXIOUS', 'NUMB'],
    title: 'Boli utha, didi',
    description: 'Every time I tried to speak at the dinner table, someone talked over me. I stopped trying...',
    paragraphs: [
      "Every time I tried to speak at the dinner table, someone talked over me. I stopped trying. My words felt worthless inside those walls.",
      "My daughter noticed. One evening she said, 'Ama, I want to hear what you think.' She asked me a question and waited — truly waited — for my answer.",
      "Something shifted. If my daughter could wait for my words, maybe my words were worth waiting for.",
    ],
    ending: "I speak now. Not loudly. But I speak. And some days, I am heard.",
  },
  {
    id: 's8',
    tags: ['NUMB', 'CONNECTION'],
    emotions: ['NUMB', 'SAD', 'HOPELESS'],
    title: 'Pani bhitra dhunga',
    description: 'I felt nothing for so long I forgot what feeling even was. A neighbour changed that...',
    paragraphs: [
      "I felt nothing for so long I forgot what feeling even was. I moved through the days like a stone through water — present but weightless.",
      "A neighbour knocked one afternoon with too many tomatoes from her garden. She stayed for an hour. She didn't ask how I was. She just talked.",
      "Somewhere in the middle of her laughter I noticed I was laughing too. It surprised me, like sun after weeks of cloud.",
    ],
    ending: "Connection is medicine. It doesn't need a reason. It just needs to show up.",
  },
  {
    id: 's9',
    tags: ['SAD', 'GRIEF'],
    emotions: ['SAD', 'EXHAUSTED', 'HOPELESS'],
    title: 'Aansu ko bhaasha',
    description: 'After my father passed, I did not cry for months. I thought I was strong. I was only buried...',
    paragraphs: [
      "After my father passed, I did not cry for months. I cooked, I cleaned, I attended to everyone. I thought I was being strong.",
      "One evening I found his old glasses in a drawer. I sat on the floor and wept until I couldn't anymore. My husband sat beside me and said nothing.",
      "Grief is not weakness. It is the price of love. That evening I understood both.",
    ],
    ending: "I still miss him every day. But the missing feels like love now, not loss. That is the difference.",
  },
  {
    id: 's10',
    tags: ['ANXIOUS', 'SASURA GHAR'],
    emotions: ['ANXIOUS', 'HOPELESS', 'NUMB'],
    title: 'Naya gharda afno thau',
    description: 'My in-laws\' house had rules I was never told. I kept breaking them without knowing...',
    paragraphs: [
      "My in-laws' house had rules I was never told. I kept breaking them without knowing — the wrong way to fold a sari, the wrong time to speak.",
      "I started writing down the rules, not to follow them blindly, but to understand them. To see which were about respect and which were just about control.",
      "That small act of noticing gave me back something. I stopped feeling like I was failing and started feeling like I was learning.",
    ],
    ending: "I am not a perfect buhari. But I am an honest one. And slowly, that has become enough.",
  },
  {
    id: 's11',
    tags: ['HOPELESS', 'RESILIENCE'],
    emotions: ['HOPELESS', 'NUMB', 'FRUSTRATED'],
    title: 'Rato dhago',
    description: 'There were days I wanted to disappear. Not die — just vanish for a while, be invisible...',
    paragraphs: [
      "There were days I wanted to disappear. Not die — just vanish for a while, be invisible. Stop being needed by everyone and needed by no one at once.",
      "My aunt came to visit and brought a red thread from the temple. She tied it on my wrist without explanation. She just said, 'Timilai yaad garchu.' I remember you.",
      "That thread. That sentence. I wore it for three months. On the hardest days I would touch it and remember someone knew I existed.",
    ],
    ending: "You do not need to be remembered by many. One person is enough to hold you to the earth.",
  },
  {
    id: 's12',
    tags: ['CALM', 'HEALING'],
    emotions: ['CALM', 'OKAY', 'SAD'],
    title: 'Ek sano kadam',
    description: 'I did not wake up healed one day. Healing came in the smallest moments — a warm cup, a quiet morning...',
    paragraphs: [
      "I did not wake up healed one day. Healing came in the smallest moments — a warm cup, a quiet morning before the house woke up, a song that found me.",
      "My sister asked how I was getting better. I told her: slowly, and not in a straight line. She said that was the only honest answer.",
      "I stopped waiting for the day I would feel completely fine. I started noticing the hours I felt okay. Then the hours became days.",
    ],
    ending: "Healing is not a destination. It is what you are doing every time you choose to stay.",
  },
  {
    id: 's13',
    tags: ['FRUSTRATED', 'BOUNDARIES'],
    emotions: ['FRUSTRATED', 'EXHAUSTED', 'SAD'],
    title: 'Napauney kura',
    description: 'My mother-in-law criticised everything — my cooking, my children, my silences. I said nothing for years...',
    paragraphs: [
      "My mother-in-law criticised everything — my cooking, my children, my silences. I said nothing for years. I thought respect meant acceptance.",
      "One day she said something in front of my daughter. And I heard my daughter go quiet the same way I always had. That was the moment.",
      "I spoke. Calmly. Two sentences. 'Please don't say that in front of her. I would like us to find a better way.' The room was silent. But I was not.",
    ],
    ending: "Speaking is not disrespect. Silence is not always peace. I found that out two sentences at a time.",
  },
  {
    id: 's14',
    tags: ['OKAY', 'GROWTH'],
    emotions: ['OKAY', 'CALM', 'HAPPY'],
    title: 'Thikai thiyo',
    description: 'I used to think "okay" was not enough. Now I know okay is where courage lives...',
    paragraphs: [
      "I used to think 'okay' was not enough. I wanted to be happy. I pushed against the days that were just fine, just manageable, just steady.",
      "My therapist asked me once what okay felt like in my body. I had never thought about it. I sat with it. It felt like breathing without effort.",
      "I stopped treating okay as something to escape. Okay is stable. Okay is safe. Okay is the ground you stand on when you are ready to grow.",
    ],
    ending: "Not every day needs to be beautiful. Some days just need to be survived. And okay does that perfectly.",
  },
  {
    id: 's15',
    tags: ['HAPPY', 'JOY'],
    emotions: ['HAPPY', 'CALM', 'OKAY'],
    title: 'Khushi ko anubhav',
    description: 'I used to feel guilty when I was happy — like I did not deserve it. This is how I let myself feel it...',
    paragraphs: [
      "I used to feel guilty when I was happy — like I did not deserve it, or like it would be taken away if I held it too tightly.",
      "My daughter was dancing in the kitchen one afternoon — just dancing to nothing. I started dancing too. No reason. No occasion.",
      "We danced for three minutes. I cried after. Not from sadness — from the surprise of joy. I had forgotten it was still mine to have.",
    ],
    ending: "Joy is not a reward. It is a right. Let yourself feel it — fully, without apology.",
  },
];

// ─── Hobby → activity suggestions ─────────────────────────────────────────────
const HOBBY_SUGGESTIONS = {
  NACH:     [{ title: 'Lok dohori sunera nach', category: 'MOVEMENT' }, { title: 'Ghar ma free dance garau', category: 'MOVEMENT' }],
  SANGEET:  [{ title: 'Maan pareko geet sunera walk garu', category: 'MOVEMENT' }, { title: 'Ek geet gaau aaja', category: 'EXPRESSION' }],
  KALA:     [{ title: 'Ek rang le kagaj rangau', category: 'EXPRESSION' }, { title: 'Haatale kei banau', category: 'EXPRESSION' }],
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

// Strip emoji prefix: "😰 Anxious" → "ANXIOUS"
function parseEmotionKey(raw) {
  return raw.replace(/^.+?\s/, '').toUpperCase().trim();
}

function getMatchingStories(emotions) {
  if (!emotions || emotions.length === 0) {
    return ALL_STORIES.slice(0, 3);
  }

  const keys = emotions.map(parseEmotionKey);

  // Score each story by how many of the user's emotions it matches
  const scored = ALL_STORIES.map((story) => {
    const score = story.emotions.filter((e) => keys.includes(e)).length;
    return { story, score };
  });

  // Sort by score descending, keep only stories with at least 1 match, cap at 3
  const matched = scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.story);

  // If nothing matched at all, fall back to first 3
  return matched.length > 0 ? matched : ALL_STORIES.slice(0, 3);
}

// ─── Component ────────────────────────────────────────────────────────────────
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

          <Text style={styles.description}>
            {selectedDream
              ? <>I noticed your dream about <Text style={styles.highlight}>{selectedDream}</Text> felt vibrant. Here is how we can bring that energy into your day.</>
              : 'Here is what DIDI thinks will help you today.'}
          </Text>

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
  container: { paddingBottom: 40, paddingHorizontal: 20 },
  kicker: { fontSize: 12, letterSpacing: 1.2, color: '#7896CD', fontWeight: '600', marginBottom: 8, marginTop: 8 },
  heading: { fontSize: 28, fontWeight: '700', color: '#004131', marginBottom: 12 },
  description: { fontSize: 17, lineHeight: 26, color: '#2D4169', marginBottom: 20 },
  highlight: { color: '#8A97D1', fontWeight: '600' },
  aiCard: {
    borderWidth: 1, borderColor: '#7896CD', backgroundColor: '#EEF3FB',
    borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'flex-start',
    marginBottom: 16, gap: 12,
  },
  suggestionCard: {
    borderWidth: 1, borderColor: '#052138', backgroundColor: '#F4F7FC',
    borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12,
  },
  heartCircle: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3E8E8',
    alignItems: 'center', justifyContent: 'center', marginRight: 14, flexShrink: 0,
  },
  heart: { color: '#132C4A', fontSize: 18 },
  suggestionTextWrap: { flex: 1 },
  suggestionTitle: { fontSize: 16, color: '#132C4A', lineHeight: 22 },
  suggestionCategory: { fontSize: 11, color: '#9EAFE9', letterSpacing: 0.8, marginTop: 2 },
  storyHeading: { marginTop: 16, fontSize: 24, fontWeight: '700', color: '#004131', textAlign: 'center' },
  storySubheading: { marginTop: 6, marginBottom: 18, textAlign: 'center', fontSize: 14, color: '#7896CD' },
  storyCard: { backgroundColor: '#F4F7FC', borderRadius: 20, padding: 20, marginBottom: 16 },
  storyCardAccent: { borderLeftWidth: 5, borderLeftColor: '#183557' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  tag: { backgroundColor: '#D8DEE9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 10, fontWeight: '700', color: '#31496E', letterSpacing: 0.5 },
  storyTitle: { fontSize: 18, fontWeight: '700', color: '#132C4A', marginBottom: 8 },
  storyDescription: { fontSize: 14, lineHeight: 22, color: '#4B5663', marginBottom: 12 },
  storyLink: { fontSize: 15, fontWeight: '700', color: '#132C4A' },
});
