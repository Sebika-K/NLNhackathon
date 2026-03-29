import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { helpfulStories } from '../data/mockData';
import GradientBackground from '../components/Gradient';
import { getDashboard } from '../services/api';

const moodToEmoji = { 1: '😞', 2: '😰', 3: '🙂', 4: '😌', 5: '😄' };
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildWeekTrail(checkins) {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dayLabel = DAY_LABELS[d.getDay()];
    const dateStr = d.toISOString().slice(0, 10);
    const match = checkins.find((c) => {
      const cDate = new Date(c.checked_in_at || c.created_at);
      return cDate.toISOString().slice(0, 10) === dateStr;
    });
    return { day: dayLabel, emoji: match ? moodToEmoji[match.mood_score] || null : null };
  });
}

function buildObservation(checkins) {
  if (!checkins || checkins.length === 0) return null;
  const avg =
    checkins.reduce((sum, c) => sum + (c.mood_score || 3), 0) / checkins.length;
  if (avg >= 4) return '✦ You had a really good week. That matters.';
  if (avg >= 3) return '✦ You had a balanced week. Keep going.';
  return '✦ This week felt heavy. You showed up anyway — that matters.';
}

export default function ReviewScreen() {
  const [checkins, setCheckins] = useState([]);
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => {
        if (res.success) {
          setCheckins(res.data.checkins || []);
          setDreams(res.data.dreams || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const weeklyMoods = buildWeekTrail(checkins);
  const observation = buildObservation(checkins);
  const weeklyActivities = dreams.map((d) => d.hobby || d.goal).filter(Boolean);

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);
  const dateRange = `${weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} — ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TopNav />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Text style={styles.weekTitle}>Week Review </Text>
              <Text style={styles.dateRange}>{dateRange}</Text>
            </View>
            <Text style={styles.subtitle}>
              Yo hapta timi kasari rahyo —{' '}
              <Text style={styles.bold}>DIDI</Text> le hereko chha.
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator style={{ marginTop: 40 }} color="#7896CD" />
          ) : (
            <>
              <View style={styles.moodRow}>
                {weeklyMoods.map((item, index) => (
                  <View key={index} style={styles.moodItem}>
                    {item.emoji ? (
                      <View style={styles.moodCircleFilled}>
                        <Text style={styles.moodEmoji}>{item.emoji}</Text>
                      </View>
                    ) : (
                      <View style={styles.moodCircleEmpty} />
                    )}
                    <Text style={styles.dayLabel}>{item.day}</Text>
                  </View>
                ))}
              </View>

              {observation && (
                <View style={styles.observationCard}>
                  <Text style={styles.observationText}>{observation}</Text>
                </View>
              )}

              {weeklyActivities.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionHeading}>Timro kadam</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.chipsRow}>
                      {weeklyActivities.map((activity, index) => (
                        <View key={index} style={styles.chip}>
                          <Text style={styles.chipText}>{activity}</Text>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Timilai helpful lageko katha</Text>
                {helpfulStories.map((story, index) => (
                  <View key={index} style={styles.storyCard}>
                    <View style={styles.tagsRow}>
                      {story.tags.map((tag, tagIndex) => (
                        <View key={tagIndex} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyPreview}>{story.preview}</Text>
                    <TouchableOpacity>
                      <Text style={styles.readButton}>Read her story →</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  weekTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7896CD',
  },
  dateRange: {
    fontSize: 13,
    color: '#2D4169',
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#2D4169',
    marginTop: 4,
  },
  bold: {
    fontWeight: '700',
    color: '#2D4169',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  moodItem: {
    alignItems: 'center',
    gap: 4,
  },
  moodCircleFilled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D7EBE9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodCircleEmpty: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#D7EBE9',
    borderStyle: 'dashed',
  },
  moodEmoji: {
    fontSize: 22,
  },
  dayLabel: {
    fontSize: 13,
    color: '#145A46',
    marginTop: 4,
  },
  observationCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#F4F7FC',
    borderRadius: 12,
    padding: 14,
  },
  observationText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    backgroundColor: '#D7EBE9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    color: '#004131',
    fontWeight: '500',
  },
  storyCard: {
    backgroundColor: '#F4F7FC',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#D7EBE9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#052138',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 8,
  },
  storyPreview: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  readButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#052138',
  },
});
