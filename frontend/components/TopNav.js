import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>DIDI</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Review')}>
        <Image
          source={require('../assets/profile.png')}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    width: '100%',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 54,
    borderRadius: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004131',
  },
  profileIcon: {
    width: 26,
    height: 26,
    borderRadius: 18,
  },
});