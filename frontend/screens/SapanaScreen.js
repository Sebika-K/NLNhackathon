import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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

export default function SapanaScreen({ navigation }) {
  return (
     <LinearGradient
        colors={['#92ade7', '#EEF3FB', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
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
                    item === '💃 Nach' && styles.selectedPill,
                    ]}
                    onPress={() =>
                        navigation.navigate('Suggestion', { selectedDream: item })
                    }
                >
                    <Text style={styles.pillText}>{item}</Text>
                </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Besides those above</Text>

            <TextInput
                placeholder="Write your heart out..."
                style={styles.textBox}
                multiline
            />

            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Suggestion')}>
                <Text style={styles.primaryText}>Tell your DIDI</Text>
            </TouchableOpacity>

            <Text style={styles.skip}>Maybe another time</Text>
        </ScrollView>


      </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
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
  textBox: {
    width: '100%',
    height: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E6E5C',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#7896CD',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  skip: {
    color: '#888',
    fontSize: 14,
  },
});