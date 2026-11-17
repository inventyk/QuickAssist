import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Service } from '../data/services';

const symbols: Record<string, string> = {
  grocery: '🛍️', pickup: '📦', documents: '📄', queue: '⏱️',
  shopping: '🛒', personal: '📍', elderly: '🤝', other: '✦',
};

type Props = { service: Service; onPress?: (service: Service) => void };

export function ServiceCard({ service, onPress }: Props): React.ReactElement {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${service.title}, starting at ₹${service.startingAt}`}
      onPress={() => onPress?.(service)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <View style={styles.icon}><Text style={styles.iconText}>{symbols[service.category] ?? '✓'}</Text></View>
        <Text style={styles.arrow}>↗</Text>
      </View>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <View style={styles.bottom}>
        <View>
          <Text style={styles.priceLabel}>Starting at</Text>
          <Text style={styles.price}>₹{service.startingAt}<Text style={styles.unit}> / {service.priceUnit}</Text></Text>
        </View>
        <Text style={styles.more}>Details →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 226, padding: 21, backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E4EBEF', shadowColor: '#102A43', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.045, shadowRadius: 16, elevation: 2 },
  pressed: { opacity: 0.92, transform: [{ scale: 0.985 }] },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  icon: { width: 48, height: 48, borderRadius: 15, backgroundColor: '#E8F5F1', alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 23 }, arrow: { color: '#9FB3C8', fontSize: 18, fontWeight: '700' },
  title: { color: '#102A43', fontSize: 17, fontWeight: '800', marginBottom: 8 },
  description: { color: '#627D98', fontSize: 13, lineHeight: 20, flex: 1 },
  bottom: { marginTop: 18, paddingTop: 13, borderTopWidth: 1, borderTopColor: '#EEF2F6', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 },
  priceLabel: { color: '#829AB1', fontSize: 10, fontWeight: '700', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.6 },
  price: { color: '#0F766E', fontWeight: '900', fontSize: 18 },
  unit: { color: '#829AB1', fontSize: 10, fontWeight: '500' },
  more: { color: '#0F766E', fontSize: 12, fontWeight: '800', paddingBottom: 2 },
});
