import React from 'react';
import TopNav from '../components/TopNav';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'; 

import { weeklyMoods, weeklyActivities, helpfulStories } from '../data/mockData'; //these are mock up data
import GradientBackground from '../components/Gradient';

export default function ReviewScreen() {
  return (
    <GradientBackground>

      <View style={styles.container}>
        {/* HEADER */}
        <TopNav />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* WEEK REVIEW TITLE */}
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Text style={styles.weekTitle}>Week Review </Text>
              <Text style={styles.dateRange}>March 24 — March 30</Text>
            </View>
            <Text style={styles.subtitle}>
              Yo hapta timi kasari rahyo —{' '}
              <Text style={styles.bold}>DIDI</Text> le hereko chha.
            </Text>
          </View>

          {/* MOOD TRAIL */}
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

          {/* DIDI OBSERVATION */}
          <View style={styles.observationCard}>
            <Text style={styles.observationText}>
              ✦ You had a lighter second half of the week.{' '}
              <Text style={styles.bold}>That matters.</Text>
            </Text>
          </View>

          {/* TIMRO KADAM */}
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

          {/* HELPFUL STORIES */}
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
    //backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004131',
  },
  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
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
    bold: 30,
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
  

  navItem: {
    alignItems: 'center',
  },
  navActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  navInactive: {
    color: '#888',
    fontSize: 13,
  },
});