import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const options = [
  '🎨 Kala',
  '🎵 Sangeet',
  '💃 Nach',
  '📖 Padhna',
  '✍️ Lekhna',
  '🌱 Bagaini',
  '🍳 Khana Pakaaune',
  '🧘 Shanti',
  '💅 Saundarya',
  '💼 Kaam',
  '🌍 Ghoom Phir',
  '🤝 Samaj Seva',
];

export default function SapanaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/didi_logo.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Sapana Space</Text>
      <Text style={styles.subtitle}>Yo ठाँउ तिम्रो मात्र हो।</Text>

      <Text style={styles.sectionTitle}>WHAT IS YOUR SAPANA?</Text>

      <View style={styles.pillWrap}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pill,
              item === '📖 Padhna' && styles.selectedPill,
            ]}
          >
            <Text style={styles.pillText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    backgroundColor: '#F5F5F3',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#12324A',
  },
  subtitle: {
    fontSize: 16,
    color: '#12324A',
    marginBottom: 20,
  },
  sectionTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: '700',
    color: '#2E6E5C',
    marginBottom: 12,
    marginTop: 12,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  pill: {
    borderWidth: 1,
    borderColor: '#2E6E5C',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  selectedPill: {
    backgroundColor: '#C7DAD4',
  },
  pillText: {
    fontSize: 14,
  },
});