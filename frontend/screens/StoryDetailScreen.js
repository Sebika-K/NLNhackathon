import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from '../components/BottomNav';
import { addHelpfulStory } from '../services/storage';

export default function StoryDetailScreen({ navigation, route }) {
  const story = route?.params?.story || {
    category: 'HER KATHA',
    title: "Maya's Morning Tea",
    tags: ['ANXIOUS', 'PEACE FOUND'],
    paragraphs: [
      "In the quiet corners of her Kathmandu kitchen, Maya watched the steam rise from her brass tea set. For years, the silence of the house had felt heavy, filled with words her husband Sita's family never let her speak.",
      "One Tuesday morning, instead of lowering her eyes when her mother-in-law entered, Maya chose to offer a cup of tea first. She spoke clearly about her wish to join the neighborhood weaving collective, her voice steady like the Trishuli river.",
      "The resistance she feared didn't shatter the room; it simply softened. Through small daily acts of quiet courage and honest conversation, the walls of the household began to breathe with a new understanding.",
    ],
    ending:
      "Now, the tea tastes of jasmine and freedom. Maya isn't just a daughter-in-law anymore; she is the architect of her own morning light. Hope is a flame that survives every winter.",
  };

  const [liked, setLiked] = useState(false);
  const [hoped, setHoped] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#92ADE7', '#EEF3FB', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.screen}>
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.topRow}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{story.category}</Text>
              </View>
              <View style={{ width: 40 }} />
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>{story.title}</Text>

              <View style={styles.tagRow}>
                {story.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.divider} />

              {story.paragraphs.map((paragraph, index) => (
                <Text key={index} style={styles.paragraph}>
                  {paragraph}
                </Text>
              ))}

              <Text style={styles.ending}>{story.ending}</Text>
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>

          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={[styles.iconButton, liked && styles.iconButtonActive]}
              onPress={() => setLiked(!liked)}
            >
              <Text style={styles.iconText}>{liked ? '♥' : '♡'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.primaryAction, hoped && styles.primaryActionDone]}
              onPress={() => {
                if (!hoped) {
                  setHoped(true);
                  addHelpfulStory({
                    id: story.id || story.title,
                    title: story.title,
                    tags: story.tags || [],
                    preview: story.paragraphs?.[0]?.slice(0, 80) + '...' || '',
                  });
                  Alert.alert('Shukriya!', 'This story has been saved to your dashboard.');
                }
              }}
            >
              <Text style={styles.primaryActionText}>
                {hoped ? '✓ This helped me' : '☕ This gives me hope'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => Alert.alert('Share', 'Sharing this story with someone who needs it.')}
            >
              <Text style={styles.iconText}>↗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <BottomNav active="Stories" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
  },
  backArrow: {
    fontSize: 26,
    color: '#163B5C',
  },
  badge: {
    backgroundColor: '#F3DDD9',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F3148',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#F7F7F4',
    borderRadius: 32,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 14,
    lineHeight: 34,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#2E6E5C',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#E7F0EB',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#476760',
    letterSpacing: 0.4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 18,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 30,
    color: '#4A4A4A',
    marginBottom: 16,
  },
  ending: {
    fontSize: 16,
    lineHeight: 28,
    color: '#004131',
    fontWeight: '600',
    marginTop: 8,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'transparent',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#8A97D1',
    backgroundColor: '#F7F7F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#F3DDD9',
    borderColor: '#E8A09A',
  },
  iconText: {
    fontSize: 22,
    color: '#8A97D1',
  },
  primaryAction: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: '#7E99D5',
    borderRadius: 16,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionDone: {
    backgroundColor: '#2E6E5C',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
