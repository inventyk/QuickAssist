import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Reveal } from '../../../components/common/Reveal';
const steps = [
  { number: '01', title: 'Choose your task', body: 'Browse the service that best matches what you need done.' },
  { number: '02', title: 'Share the details', body: 'Tell us the locations, timing, item count and any special instructions.' },
  { number: '03', title: 'Review your quote', body: 'We confirm the scope, availability and final price before accepting.' },
  { number: '04', title: 'Task gets done', body: 'A suitable helper completes the agreed task and shares an update.' },
];
export function HowItWorksSection(): React.ReactElement {
  const compact = useWindowDimensions().width < 760;
  return (
    <View style={styles.section}>
      <Reveal><Text style={styles.eyebrow}>A CLEAR, SIMPLE PROCESS</Text><Text style={styles.title}>How QuickAssist works</Text><Text style={styles.subtitle}>You stay informed at every step — from the first request to task completion.</Text></Reveal>
      <View style={[styles.grid, compact && styles.gridMobile]}>
        {steps.map((step, index) => <Reveal key={step.number} delay={index * 75} style={styles.card}>
          <Text style={styles.number}>{step.number}</Text><Text style={styles.cardTitle}>{step.title}</Text><Text style={styles.body}>{step.body}</Text>
        </Reveal>)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 68, alignItems: 'center', backgroundColor: '#F7FAFC' },
  eyebrow: { color: '#0F766E', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, textAlign: 'center' },
  title: { color: '#102A43', fontSize: 31, fontWeight: '900', marginTop: 9, textAlign: 'center' },
  subtitle: { color: '#627D98', fontSize: 13, lineHeight: 21, textAlign: 'center', maxWidth: 670, marginTop: 9, marginBottom: 29 },
  grid: { width: '100%', maxWidth: 1120, flexDirection: 'row', gap: 14 },
  gridMobile: { flexDirection: 'column' },
  card: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E6EDF2', padding: 22, borderRadius: 16 },
  number: { color: '#0F766E', fontSize: 25, fontWeight: '900', marginBottom: 17 },
  cardTitle: { color: '#102A43', fontSize: 15, fontWeight: '900', marginBottom: 8 },
  body: { color: '#627D98', fontSize: 12, lineHeight: 19 },
});
