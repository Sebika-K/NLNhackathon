import React, { useEffect, useState } from 'react';
import TopNav from '../components/TopNav';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { weeklyMoods as mockMoods, weeklyActivities as mockActivities, helpfulStories } from '../data/mockData';
import GradientBackground from '../components/Gradient';
import { getDashboard } from '../services/api';

const SCORE_TO_EMOJI = { 1: '😞', 2: '😐', 3: '🙂', 4: '😊', 5: '😄' };
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildWeekMoods(checkins) {
  const today = new Date();
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const match = checkins.find(c => c.checked_in_at && c.checked_in_at.startsWith(dateStr));
    week.push({
      day: DAY_LABELS[d.getDay()],
      emoji: match ? SCORE_TO_EMOJI[match.mood_score] ?? null : null,
    });
  }
  return week;
}

function buildActivities(dreams) {
  if (!dreams || dreams.length === 0) return mockActivities;
  const counts = {};
  dreams.forEach(d => {
    if (d.hobby) counts[d.hobby] = (counts[d.hobby] || 0) + 1;
  });
  return Object.entries(counts).map(([k, v]) => `${k} — ${v} palta`);
}

function getDateRange() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 6);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[start.getMonth()]} ${start.getDate()} — ${months[today.getMonth()]} ${today.getDate()}`;
}

function getObservation(checkins) {
  if (!checkins || checkins.length === 0) return null;
  const scores = checkins.map(c => c.mood_score);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  if (avg >= 4) return 'You had a strong week. That energy matters.';
  if (avg >= 3) return 'You had a lighter second half of the week. That matters.';
  return 'It was a heavy week. You are still here — and that is enough.';
}

export default function ReviewScreen() {
  const [moods, setMoods] = useState(mockMoods);
  const [activities, setActivities] = useState(mockActivities);
  const [observation, setObservation] = useState('You had a lighter second half of the week. That matters.');

  useEffect(() => {
    getDashboard()
      .then(data => {
        if (data?.data) {
          const { checkins, dreams } = data.data;
          if (checkins && checkins.length > 0) {
            setMoods(buildWeekMoods(checkins));
            setObservation(getObservation(checkins));
          }
          setActivities(buildActivities(dreams));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TopNav />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Text style={styles.weekTitle}>Week Review </Text>
              <Text style={styles.dateRange}>{getDateRange()}</Text>
            </View>
            <Text style={styles.subtitle}>
              Yo hapta timi kasari rahyo —{' '}
              <Text style={styles.bold}>DIDI</Text> le hereko chha.
            </Text>
          </View>

          <View style={styles.moodRow}>
            {moods.map((item, index) => (
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

          <View style={styles.observationCard}>
            <Text style={styles.observationText}>
              ✦ {observation}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Timro kadam</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipsRow}>
                {activities.map((activity, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{activity}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

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

          <View style={{ height: 100 }} />
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
