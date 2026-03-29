import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const tabs = [
  { name: 'Home',      icon: 'home',   route: 'Home'      },
  { name: 'Dream',     icon: 'happy',  route: 'Feelings'  },
  { name: 'Stories',   icon: 'book',   route: 'Stories'   },
  { name: 'Community', icon: 'people', route: 'Community' },
];

export default function BottomNav({ active }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = active === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, isActive && styles.activeIconWrap]}>
              <Ionicons
                name={isActive ? tab.icon : `${tab.icon}-outline`}
                size={22}
                color={isActive ? '#FFFFFF' : '#7A8FA0'}
              />
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {tab.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#07294D',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    gap: 3,
  },
  activeIconWrap: {
    backgroundColor: '#1E4A7A',
  },
  label: {
    fontSize: 11,
    color: '#7A8FA0',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
