import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
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

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 54;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingBottom: 8,
    width: '100%',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 48,
    height: 40,
    borderRadius: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#004131',
  },
  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
