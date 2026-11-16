import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
const features = [
  { icon: '₹', title: 'Clear pricing', body: 'See the service fee separately from any shopping or product costs.' },
  { icon: '✓', title: 'A thoughtful process', body: 'Task details are collected up front so expectations are clear.' },
  { icon: '⌂', title: 'Local convenience', body: 'Everyday assistance designed around your neighbourhood and schedule.' },
];
export function WhyChooseUsSection(): React.ReactElement {
  const compact = useWindowDimensions().width < 700;
  return <View style={styles.section}><Text style={styles.title}>A simpler way to get things done.</Text><View style={[styles.grid, compact && styles.mobile]}>{features.map((item) => <View key={item.title} style={styles.card}><Text style={styles.icon}>{item.icon}</Text><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.body}>{item.body}</Text></View>)}</View></View>;
}
const styles = StyleSheet.create({ section: { paddingHorizontal: 24, paddingVertical: 64, backgroundColor: '#FFFFFF', alignItems: 'center' }, title: { color: '#102A43', fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 28 }, grid: { width: '100%', maxWidth: 1120, flexDirection: 'row', gap: 16 }, mobile: { flexDirection: 'column' }, card: { flex: 1, padding: 24, borderRadius: 16, backgroundColor: '#F7FAFC' }, icon: { color: '#0F766E', fontSize: 28, fontWeight: '800', marginBottom: 14 }, cardTitle: { color: '#102A43', fontSize: 16, fontWeight: '800', marginBottom: 8 }, body: { color: '#627D98', fontSize: 13, lineHeight: 21 } });
