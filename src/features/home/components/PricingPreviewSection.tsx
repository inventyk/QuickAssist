import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { taskPricing, pricingDisclosure } from '../../../config/pricing.config';
import { services } from '../../services/data/services';
import { Reveal } from '../../../components/common/Reveal';

type Props = { onSeePlans?: () => void };

export function PricingPreviewSection({ onSeePlans }: Props): React.ReactElement {
  const compact = useWindowDimensions().width < 700;
  return (
    <View style={styles.section}>
      <Reveal>
        <Text style={styles.eyebrow}>FAIR PRICES. NO GUESSWORK.</Text>
        <Text style={styles.title}>Pay for the task you actually need.</Text>
        <Text style={styles.subtitle}>A quick document drop and a one-hour accompaniment are different jobs. Your price should reflect the work, not force every task into one flat rate.</Text>
      </Reveal>
      <View style={[styles.priceGrid, compact && styles.mobileGrid]}>
        {taskPricing.slice(0, 6).map((item, index) => {
          const service = services.find((entry) => entry.category === item.serviceId);
          return (
            <Reveal key={item.serviceId} delay={index * 55} style={[styles.priceCard, compact && styles.priceCardMobile]}>
              <Text style={styles.priceName}>{service?.shortTitle ?? item.serviceId}</Text>
              <Text style={styles.amount}>₹{item.startingAt}<Text style={styles.unit}> / {item.unit}</Text></Text>
              <Text style={styles.note}>{item.note}</Text>
            </Reveal>
          );
        })}
      </View>
      <Text style={styles.disclosure}>{pricingDisclosure}</Text>
      <Pressable accessibilityRole="button" onPress={onSeePlans} style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}>
        <Text style={styles.linkText}>Explore membership plans →</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 70, alignItems: 'center', backgroundColor: '#F0F7F6' },
  eyebrow: { color: '#0F766E', fontSize: 10, fontWeight: '900', letterSpacing: 1.6, textAlign: 'center' },
  title: { color: '#102A43', fontSize: 32, lineHeight: 39, fontWeight: '900', marginTop: 9, textAlign: 'center', maxWidth: 760 },
  subtitle: { color: '#627D98', fontSize: 14, lineHeight: 23, textAlign: 'center', maxWidth: 690, marginTop: 12, marginBottom: 27 },
  priceGrid: { width: '100%', maxWidth: 1120, flexDirection: 'row', flexWrap: 'wrap', gap: 13 },
  mobileGrid: { flexDirection: 'column' },
  priceCard: { width: '31.9%', minHeight: 147, padding: 19, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCEBE7' },
  priceCardMobile: { width: '100%' },
  priceName: { color: '#102A43', fontWeight: '800', fontSize: 14, marginBottom: 10 },
  amount: { color: '#0F766E', fontSize: 24, fontWeight: '900' },
  unit: { color: '#829AB1', fontSize: 10, fontWeight: '600' },
  note: { color: '#627D98', fontSize: 11, lineHeight: 17, marginTop: 7 },
  disclosure: { color: '#829AB1', fontSize: 10, lineHeight: 16, maxWidth: 1050, marginTop: 20, textAlign: 'center' },
  linkButton: { marginTop: 21, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, backgroundColor: '#102A43' },
  linkText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.82 },
});
