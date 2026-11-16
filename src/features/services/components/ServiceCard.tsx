import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Service } from '../data/services';

const symbols: Record<string, string> = { grocery: '🛍️', shopping: '🛒', document: '📄', queue: '🕒', parcel: '📦', errand: '📍', elderly: '🤝', other: '✨' };
export function ServiceCard({ service }: { service: Service }): React.ReactElement {
  return (
    <View style={styles.card}>
      <View style={styles.icon}><Text style={styles.iconText}>{symbols[service.category] ?? '✓'}</Text></View>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <View style={styles.bottom}><Text style={styles.price}>From ₹{service.startingCharge}</Text><Text style={styles.label}>Service fee</Text></View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 190, padding: 20, backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E6EDF2', shadowColor: '#102A43', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  icon: { width: 46, height: 46, borderRadius: 13, backgroundColor: '#E8F5F3', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  iconText: { fontSize: 23 }, title: { color: '#102A43', fontSize: 16, fontWeight: '800', marginBottom: 8 },
  description: { color: '#627D98', fontSize: 13, lineHeight: 20, flex: 1 },
  bottom: { marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#EEF2F6', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 },
  price: { color: '#0F766E', fontWeight: '800', fontSize: 13 }, label: { color: '#829AB1', fontSize: 11 },
});
