// GradientBackground.js
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientBackground({ children }) {
  return (
    <LinearGradient
        colors={['#92ade7', '#ffd8fa04','#F5F5F5', '#F5F5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
  >
      {children}
    </LinearGradient>
  );
}