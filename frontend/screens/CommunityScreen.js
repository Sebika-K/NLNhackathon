import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import GradientBackground from '../components/Gradient';
import { getDashboard } from '../services/api';
import { communityData } from '../data/mockData';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const moodToEmoji = { 1: '😞', 2: '😰', 3: '🙂', 4: '😌', 5: '😄' };

// Mood-score-based support suggestions
const MOOD_SUGGESTIONS = {
  low: [
    { icon: '🤍', title: 'Just sit with her', subtitle: 'Be there without an agenda' },
    { icon: '🍵', title: 'Make her tea', subtitle: 'A small act of care without questions' },
    { icon: '🌿', title: 'Give her space', subtitle: 'Let her know you are there, then step back' },
    { icon: '🗣', title: 'Ask, don\'t assume', subtitle: 'Let her tell you what she needs' },
  ],
  mid: [
    { icon: '🚶', title: 'Take a walk together', subtitle: 'Movement helps shift heavy feelings' },
    { icon: '🎵', title: 'Play music she loves', subtitle: 'Let sound do what words cannot' },
    { icon: '🤍', title: 'Acknowledge her effort', subtitle: 'Tell her you see how hard she tries' },
  ],
  good: [
    { icon: '🌸', title: 'Celebrate this moment', subtitle: 'Let her know her lightness is noticed' },
    { icon: '🤝', title: 'Plan something together', subtitle: 'She has energy — use it joyfully' },
  ],
};

function buildWeekTrail(checkins) {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const match = checkins.find((c) => {
      const cDate = new Date(c.checked_in_at || c.created_at);
      return cDate.toISOString().slice(0, 10) === dateStr;
    });
    return { day: DAY_LABELS[d.getDay()], emoji: match ? moodToEmoji[match.mood_score] || null : null };
  });
}

export default function CommunityScreen() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { culturalCards } = communityData;

  useEffect(() => {
    getDashboard()
      .then((res) => {
        if (res.success) setCheckins(res.data.checkins || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const weeklyMoods = buildWeekTrail(checkins);
  const avgMood = checkins.length
    ? checkins.reduce((sum, c) => sum + (c.mood_score || 3), 0) / checkins.length
    : null;

  // Threshold: only show heavy community content if avg mood <= 2.5
  const isHeavy = avgMood !== null && avgMood <= 2.5;
  const isMid = avgMood !== null && avgMood > 2.5 && avgMood <= 3.5;

  const suggestions = isHeavy
    ? MOOD_SUGGESTIONS.low
    : isMid
    ? MOOD_SUGGESTIONS.mid
    : MOOD_SUGGESTIONS.good;

  const alertMessage = isHeavy
    ? 'DIDI le notice garyo — yo hapta us ko mann thikai chhaina. Aaja ghar pharkada ek cup chiya banaaidinus.'
    : isMid
    ? 'DIDI le notice garyo — us le balanced hapta bitaayo. Keep supporting her.'
    : 'Yo hapta us ko mann ramro thiyo. Together, you made that possible.';

  const supportHeading = isHeavy
    ? 'She has been feeling heavy. Here is what she needs.'
    : isMid
    ? 'She is finding her footing. Here is how to help.'
    : 'She is doing well. Here is how to keep her there.';

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopNav />

          <View style={styles.section}>
            <Text style={styles.pageTitle}>Pariwaar ko Saath</Text>
            <Text style={styles.pageSubtitle}>
              Family is her first home.{' '}
              <Text style={styles.subtitleBold}>Let it also be her safe one.</Text>
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator color="#7896CD" style={{ marginTop: 40 }} />
          ) : (
            <>
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

              {/* SUPPORT TIPS */}
              <View style={styles.section}>
                <Text style={styles.supportHeading}>{supportHeading}</Text>
                {suggestions.map((tip, index) => (
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
                      <Text style={styles.culturalTranslation}>{card.translation}</Text>
                    </View>
                    <Text style={styles.culturalDesc}>{card.desc}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
      </GradientBackground>

      <BottomNav active="Community" />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, marginTop: 16 },
  pageTitle: { fontSize: 32, fontWeight: '700', color: '#004131', marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: '#7896CD', lineHeight: 22 },
  subtitleBold: { fontWeight: '700', color: '#7896CD' },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 },
  moodItem: { alignItems: 'center', gap: 4 },
  moodCircleFilled: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#D7EBE9', alignItems: 'center', justifyContent: 'center',
  },
  moodCircleEmpty: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1.5, borderColor: '#D7EBE9', borderStyle: 'dashed',
  },
  moodEmoji: { fontSize: 22 },
  dayLabel: { fontSize: 11, color: '#004131', marginTop: 4 },
  alertCard: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#EEF3FB',
    borderRadius: 16, padding: 16, marginHorizontal: 20, marginTop: 16,
    gap: 10, borderWidth: 1, borderColor: '#7896CD',
  },
  alertIcon: { fontSize: 16, color: '#7896CD', marginTop: 2 },
  alertText: { flex: 1, fontSize: 13, color: '#7896CD', lineHeight: 20 },
  supportHeading: { fontSize: 18, fontWeight: '700', color: '#004131', marginBottom: 14, lineHeight: 26 },
  tipCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F7FC',
    borderRadius: 14, padding: 16, marginBottom: 10, gap: 14,
  },
  tipIconCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#7896CD', alignItems: 'center', justifyContent: 'center',
  },
  tipIcon: { fontSize: 20 },
  tipTextWrap: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: '600', color: '#004131', marginBottom: 2 },
  tipSubtitle: { fontSize: 12, color: '#052138' },
  whyCard: {
    backgroundColor: '#F4F7FC', borderRadius: 16, padding: 20,
    marginHorizontal: 20, marginTop: 18,
  },
  whyQuote: { fontSize: 15, fontWeight: '600', color: '#1C2B3A', lineHeight: 24, marginBottom: 12 },
  whyBody: { fontSize: 13, color: '#052138', lineHeight: 20 },
  sectionLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  sectionLine: { width: 28, height: 2, backgroundColor: '#052138', borderRadius: 2 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#052138' },
  culturalCard: { backgroundColor: '#F4F7FC', borderRadius: 14, padding: 16, marginBottom: 10 },
  culturalCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  culturalWord: { fontSize: 17, fontWeight: '700', color: '#052138' },
  culturalTranslation: { fontSize: 11, fontWeight: '600', color: '#7896CD', letterSpacing: 0.8 },
  culturalDesc: { fontSize: 13, color: '#052138', lineHeight: 20 },
});
