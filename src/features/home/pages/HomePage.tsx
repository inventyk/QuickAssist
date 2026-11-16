import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { ServiceHighlights } from '../components/ServiceHighlights';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { PricingPreviewSection } from '../components/PricingPreviewSection';

type Props = { onNavigate?: (page: 'home' | 'services') => void };
export function HomePage({ onNavigate = () => undefined }: Props): React.ReactElement {
  const compact = useWindowDimensions().width < 760;
  return (
    <View style={styles.page}>
      <View style={[styles.hero, compact && styles.heroCompact]}>
        <View style={[styles.heroInner, compact && styles.heroInnerCompact]}>
          <View style={styles.pill}><Text style={styles.pillText}>LOCAL HELP · ON YOUR SCHEDULE</Text></View>
          <Text style={[styles.heading, compact && styles.headingCompact]}>Your everyday tasks, <Text style={styles.highlight}>handled with ease.</Text></Text>
          <Text style={styles.subheading}>From grocery pickups to important errands, book reliable local assistance and get more time back for what matters.</Text>
          <View style={[styles.actions, compact && styles.actionsCompact]}>
            <TouchableOpacity accessibilityRole="button" style={styles.primaryButton} onPress={() => onNavigate('services')}><Text style={styles.primaryText}>Explore services →</Text></TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.secondaryButton} onPress={() => onNavigate('services')}><Text style={styles.secondaryText}>See available tasks</Text></TouchableOpacity>
          </View>
          <View style={styles.trustRow}><Text style={styles.trustText}>✓ Clear pricing</Text><Text style={styles.trustText}>✓ Task-based help</Text><Text style={styles.trustText}>✓ Local convenience</Text></View>
        </View>
        {!compact && <View style={styles.visual}><View style={styles.visualCircle}><Text style={styles.visualEmoji}>🛍️</Text></View><View style={styles.floatCard}><Text style={styles.floatLabel}>YOUR DAY, SIMPLIFIED</Text><Text style={styles.floatTitle}>One less thing to do.</Text><Text style={styles.floatSub}>Book help for everyday tasks.</Text></View><View style={styles.decorOne}/><View style={styles.decorTwo}/></View>}
      </View>
      <View style={styles.section}>
        <View style={styles.sectionIntro}><Text style={styles.eyebrow}>WHAT WE CAN HELP WITH</Text><Text style={styles.sectionTitle}>Small tasks. More breathing room.</Text><Text style={styles.sectionSub}>Practical assistance for the things that take time out of your day.</Text></View>
        <ServiceHighlights onExplore={() => onNavigate('services')} />
      </View>
      <HowItWorksSection />
      <WhyChooseUsSection />
      <PricingPreviewSection />
      <View style={styles.finalCta}><Text style={styles.finalTitle}>Ready to get a task off your list?</Text><Text style={styles.finalSub}>Explore services and see how simple everyday help can be.</Text><TouchableOpacity style={styles.finalButton} onPress={() => onNavigate('services')}><Text style={styles.finalButtonText}>Browse services →</Text></TouchableOpacity></View>
    </View>
  );
}
const styles = StyleSheet.create({
  page: { backgroundColor: '#F7FAFC' },
  hero: { backgroundColor: '#F0F7F6', minHeight: 520, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 72, overflow: 'hidden' },
  heroCompact: { paddingHorizontal: 22, paddingVertical: 58, minHeight: 0 },
  heroInner: { width: '100%', maxWidth: 680, alignSelf: 'center' },
  heroInnerCompact: { maxWidth: 560 },
  pill: { alignSelf: 'flex-start', backgroundColor: '#D7EFEB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 30, marginBottom: 22 },
  pillText: { color: '#0F766E', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  heading: { maxWidth: 700, color: '#102A43', fontSize: 56, lineHeight: 64, fontWeight: '800', letterSpacing: -2.2 },
  headingCompact: { fontSize: 39, lineHeight: 46, letterSpacing: -1.2 },
  highlight: { color: '#0F766E' },
  subheading: { color: '#52606D', fontSize: 17, lineHeight: 27, maxWidth: 580, marginTop: 20 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 30 },
  actionsCompact: { flexDirection: 'column', alignItems: 'stretch' },
  primaryButton: { backgroundColor: '#0F766E', paddingHorizontal: 22, paddingVertical: 15, borderRadius: 11 },
  primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', textAlign: 'center' },
  secondaryButton: { paddingHorizontal: 18, paddingVertical: 15 },
  secondaryText: { color: '#285E61', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginTop: 28 },
  trustText: { color: '#486581', fontSize: 12, fontWeight: '600' },
  visual: { width: 390, height: 340, alignItems: 'center', justifyContent: 'center', marginLeft: 30 },
  visualCircle: { width: 250, height: 250, borderRadius: 125, backgroundColor: '#D5ECE7', alignItems: 'center', justifyContent: 'center' },
  visualEmoji: { fontSize: 105 },
  floatCard: { position: 'absolute', right: 0, bottom: 10, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, width: 230, shadowColor: '#102A43', shadowOpacity: 0.12, shadowRadius: 20, elevation: 5 },
  floatLabel: { color: '#0F766E', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  floatTitle: { color: '#102A43', fontSize: 17, fontWeight: '800', marginTop: 7 },
  floatSub: { color: '#627D98', fontSize: 11, marginTop: 4 },
  decorOne: { position: 'absolute', top: 10, right: 25, width: 42, height: 42, borderRadius: 21, backgroundColor: '#F5D98E' },
  decorTwo: { position: 'absolute', left: 18, bottom: 32, width: 22, height: 22, borderRadius: 11, backgroundColor: '#A7D8CF' },
  section: { paddingHorizontal: 24, paddingVertical: 70, backgroundColor: '#FFFFFF' },
  sectionIntro: { width: '100%', maxWidth: 1120, alignSelf: 'center', marginBottom: 26 },
  eyebrow: { color: '#0F766E', fontSize: 11, letterSpacing: 1.5, fontWeight: '800', marginBottom: 10 },
  sectionTitle: { color: '#102A43', fontSize: 32, lineHeight: 39, fontWeight: '800', letterSpacing: -0.8 },
  sectionSub: { color: '#627D98', fontSize: 15, marginTop: 10, lineHeight: 24 },
  finalCta: { marginHorizontal: 24, marginTop: 56, marginBottom: 20, padding: 34, borderRadius: 20, backgroundColor: '#102A43', alignItems: 'center' },
  finalTitle: { color: '#FFFFFF', fontSize: 27, fontWeight: '800', textAlign: 'center' },
  finalSub: { color: '#D9E2EC', fontSize: 14, marginTop: 10, textAlign: 'center', lineHeight: 22 },
  finalButton: { marginTop: 22, backgroundColor: '#F5D98E', paddingHorizontal: 22, paddingVertical: 13, borderRadius: 10 },
  finalButtonText: { color: '#102A43', fontWeight: '800', fontSize: 14 },
});
