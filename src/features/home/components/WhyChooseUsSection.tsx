import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Reveal } from '../../../components/common/Reveal';
const features = [
  { icon: '₹', title: 'Task-based pricing', body: 'A quick drop, long wait or shopping request is priced according to the work involved.' },
  { icon: '✓', title: 'Quote before confirmation', body: 'Review the task scope and final amount before deciding to proceed.' },
  { icon: '⌂', title: 'Local convenience', body: 'Everyday errands and practical assistance, planned around your neighbourhood.' },
  { icon: '♡', title: 'Support for families', body: 'Optional family profiles make it easier to coordinate help for loved ones.' },
];
export function WhyChooseUsSection(): React.ReactElement {
  const compact = useWindowDimensions().width < 760;
  return (
    <View style={styles.section}>
      <Reveal><Text style={styles.title}>Built around your time, not the other way around.</Text></Reveal>
      <View style={[styles.grid, compact && styles.mobile]}>
        {features.map((item, index) => <Reveal key={item.title} delay={index * 65} style={styles.card}>
          <Text style={styles.icon}>{item.icon}</Text><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.body}>{item.body}</Text>
        </Reveal>)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 68, backgroundColor: '#FFFFFF', alignItems: 'center' },
  title: { color: '#102A43', fontSize: 29, lineHeight: 37, fontWeight: '900', textAlign: 'center', maxWidth: 720, marginBottom: 29 },
  grid: { width: '100%', maxWidth: 1120, flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  mobile: { flexDirection: 'column' },
  card: { flex: 1, minWidth: 220, padding: 22, borderRadius: 16, backgroundColor: '#F7FAFC' },
  icon: { color: '#0F766E', fontSize: 27, fontWeight: '900', marginBottom: 12 },
  cardTitle: { color: '#102A43', fontSize: 15, fontWeight: '900', marginBottom: 8 },
  body: { color: '#627D98', fontSize: 12, lineHeight: 20 },
});
