import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

  return (
    <LinearGradient
      colors={['#92ADE7', '#EEF3FB', '#F5F5F5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{story.category}</Text>
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
        </ScrollView>

        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>♡</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryAction}>
            <Text style={styles.primaryActionText}>☕ This gives me hope</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>↗</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 140,
  },
  backButton: {
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 30,
    color: '#163B5C',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#F3DDD9',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 18,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F3148',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#F7F7F4',
    borderRadius: 40,
    padding: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 16,
    lineHeight: 36,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 34,
    color: '#4A4A4A',
    marginBottom: 18,
  },
  ending: {
    fontSize: 17,
    lineHeight: 34,
    color: '#004131',
    fontWeight: '600',
    marginTop: 8,
  },
  bottomActions: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#8A97D1',
    backgroundColor: '#F7F7F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#8A97D1',
  },
  primaryAction: {
    flex: 1,
    marginHorizontal: 14,
    backgroundColor: '#7E99D5',
    borderRadius: 18,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});