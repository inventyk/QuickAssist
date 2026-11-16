import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
const steps = [
  { number: '01', title: 'Choose your task', body: 'Pick the kind of local assistance you need.' },
  { number: '02', title: 'Share the details', body: 'Tell us where, when, and what needs doing.' },
  { number: '03', title: 'Get it done', body: 'A suitable helper can take care of the task.' },
];
export function HowItWorksSection(): React.ReactElement {
  const compact = useWindowDimensions().width < 700;
  return <View style={styles.section}><Text style={styles.eyebrow}>SIMPLE BY DESIGN</Text><Text style={styles.title}>How it works</Text><View style={[styles.grid, compact && styles.gridMobile]}>{steps.map((step) => <View key={step.number} style={styles.card}><Text style={styles.number}>{step.number}</Text><Text style={styles.cardTitle}>{step.title}</Text><Text style={styles.body}>{step.body}</Text></View>)}</View></View>;
}
const styles = StyleSheet.create({ section: { paddingHorizontal: 24, paddingVertical: 64, alignItems: 'center', backgroundColor: '#F7FAFC' }, eyebrow: { color: '#0F766E', fontSize: 11, fontWeight: '800', letterSpacing: 1.4 }, title: { color: '#102A43', fontSize: 30, fontWeight: '800', marginTop: 8, marginBottom: 28 }, grid: { width: '100%', maxWidth: 1120, flexDirection: 'row', gap: 16 }, gridMobile: { flexDirection: 'column' }, card: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6EDF2', padding: 24, borderRadius: 16 }, number: { color: '#0F766E', fontSize: 25, fontWeight: '800', marginBottom: 20 }, cardTitle: { color: '#102A43', fontSize: 17, fontWeight: '800', marginBottom: 8 }, body: { color: '#627D98', fontSize: 13, lineHeight: 21 } });
