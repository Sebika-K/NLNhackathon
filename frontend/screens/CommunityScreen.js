import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TopNav from '../components/TopNav';
import { weeklyMoods, communityData } from '../data/mockData';
import GradientBackground from '../components/Gradient';

export default function CommunityScreen() {
  const { alertMessage, supportTips, culturalCards } = communityData;

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopNav />

        {/* TITLE */}
        <View style={styles.section}>
          <Text style={styles.pageTitle}>Pariwaar ko Saath</Text>
          <Text style={styles.pageSubtitle}>
            Family is her first home.{' '}
            <Text style={styles.subtitleBold}>
              Let it also be her safe one.
            </Text>
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

        {/* ALERT CARD */}
        <View style={styles.alertCard}>
          <Text style={styles.alertIcon}>ℹ</Text>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>

        {/* SUPPORT SECTION */}
        <View style={styles.section}>
          <Text style={styles.supportHeading}>
            She has been feeling heavy. Here is what she needs.
          </Text>
          {supportTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <View style={styles.tipIconCircle}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
              </View>
              <View style={styles.tipTextWrap}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipSubtitle}>{tip.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* WHY IT MATTERS */}
        <View style={styles.whyCard}>
          <Text style={styles.whyQuote}>
            "Maan ko dukha" is often silent. In our homes, we are taught to
            carry our burdens with a smile, but true strength lies in the
            family that recognizes the weight behind that smile.
          </Text>
          <Text style={styles.whyBody}>
            When you care for her, you aren't just helping an individual; you
            are healing the roots of our community. A supported woman builds
            a resilient family.
          </Text>
        </View>

        {/* WHAT OUR WOMEN CARRY */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionLabel}>What Our Women Carry</Text>
          </View>
          {culturalCards.map((card, index) => (
            <View key={index} style={styles.culturalCard}>
              <View style={styles.culturalCardTop}>
                <Text style={styles.culturalWord}>{card.word}</Text>
                <Text style={styles.culturalTranslation}>
                  {card.translation}
                </Text>
              </View>
              <Text style={styles.culturalDesc}>{card.desc}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 15,
    color: '#7896CD',
    lineHeight: 22,
  },
  subtitleBold: {
    fontWeight: '700',
    color: '#7896CD',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 24,
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
    fontSize: 11,
    color: '#004131',
    marginTop: 4,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F4F7FC',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#7896CD',
  },
  alertIcon: {
    fontSize: 16,
    color: '#7896CD',
    marginTop: 2,
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: '#7896CD',
    lineHeight: 20,
  },
  supportHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004131',
    marginBottom: 16,
    lineHeight: 24,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  tipIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#7896CD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipIcon: {
    fontSize: 20,
  },
  tipTextWrap: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#004131',
    marginBottom: 2,
  },
  tipSubtitle: {
    fontSize: 12,
    color: '#052138',
  },
  whyCard: {
    backgroundColor: '#F4F7FC',
    borderRadius: 16,
    padding: 22,
    marginHorizontal: 20,
    marginTop: 20,
  },
  whyQuote: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C2B3A',
    lineHeight: 24,
    marginBottom: 14,
  },
  whyBody: {
    fontSize: 13,
    color: '#052138',
    lineHeight: 20,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionLine: {
    width: 28,
    height: 2,
    backgroundColor: '#052138',
    borderRadius: 2,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#052138',
  },
  culturalCard: {
    backgroundColor: '#F4F7FC',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
  },
  culturalCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  culturalWord: {
    fontSize: 17,
    fontWeight: '700',
    color: '#052138',
  },
  culturalTranslation: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7896CD',
    letterSpacing: 0.8,
  },
  culturalDesc: {
    fontSize: 13,
    color: '#052138',
    lineHeight: 20,
  },
});