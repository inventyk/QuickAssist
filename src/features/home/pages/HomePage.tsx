import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Animated, Easing } from 'react-native';
import { ServiceHighlights } from '../components/ServiceHighlights';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { PricingPreviewSection } from '../components/PricingPreviewSection';
import { SubscriptionPlansSection } from '../components/SubscriptionPlansSection';
import { FAQSection } from '../components/FAQSection';
import { Reveal } from '../../../components/common/Reveal';
import type { PageKey } from '../../../types/navigation';

type Props = { onNavigate?: (page: PageKey) => void };

function FloatingVisual(): React.ReactElement {
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: -10, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      Animated.timing(float, { toValue: 0, duration: 1900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [float]);
  return (
    <View style={styles.visual}>
      <Animated.View style={[styles.visualCircle, { transform: [{ translateY: float }] }]}>
        <Text style={styles.visualEmoji}>🛍️</Text>
        <View style={styles.visualCheck}><Text style={styles.checkText}>✓</Text></View>
      </Animated.View>
      <Animated.View style={[styles.floatCard, { transform: [{ translateY: float }] }]}>
        <Text style={styles.floatLabel}>A LITTLE HELP, RIGHT ON TIME</Text>
        <Text style={styles.floatTitle}>Your day, made lighter.</Text>
        <Text style={styles.floatSub}>Everyday tasks, handled with care.</Text>
      </Animated.View>
      <View style={styles.decorOne}/><View style={styles.decorTwo}/>
    </View>
  );
}

export function HomePage({ onNavigate = () => undefined }: Props): React.ReactElement {
  const compact = useWindowDimensions().width < 780;
  return (
    <View style={styles.page}>
      <View style={[styles.hero, compact && styles.heroCompact]}>
        <Reveal style={[styles.heroInner, compact && styles.heroInnerCompact]}>
          <View style={styles.pill}><Text style={styles.pillText}>LOCAL HELP · ON YOUR SCHEDULE</Text></View>
          <Text style={[styles.heading, compact && styles.headingCompact]}>Your everyday tasks, <Text style={styles.highlight}>handled with ease.</Text></Text>
          <Text style={styles.subheading}>From grocery pickups and document drops to personal errands and elderly accompaniment, get practical help for the things that take time out of your day.</Text>
          <View style={[styles.actions, compact && styles.actionsCompact]}>
            <Pressable accessibilityRole="button" style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={() => onNavigate('services')}><Text style={styles.primaryText}>Explore services →</Text></Pressable>
            <Pressable accessibilityRole="button" style={styles.secondaryButton} onPress={() => onNavigate('pricing')}><Text style={styles.secondaryText}>See how pricing works</Text></Pressable>
          </View>
          <View style={styles.trustRow}><Text style={styles.trustText}>✓ Task-based pricing</Text><Text style={styles.trustText}>✓ Final quote before confirmation</Text><Text style={styles.trustText}>✓ Optional membership</Text></View>
        </Reveal>
        {!compact && <FloatingVisual/>}
      </View>
      <View style={styles.section}>
        <Reveal><View style={styles.sectionIntro}><Text style={styles.eyebrow}>EVERYDAY HELP, MADE SIMPLE</Text><Text style={styles.sectionTitle}>Small tasks. More breathing room.</Text><Text style={styles.sectionSub}>One place for the little errands that interrupt your day — whether it is picking up essentials, dropping off a parcel or helping a family member get somewhere.</Text></View></Reveal>
        <ServiceHighlights onExplore={() => onNavigate('services')} />
      </View>
      <HowItWorksSection />
      <WhyChooseUsSection />
      <PricingPreviewSection onSeePlans={() => onNavigate('pricing')} />
      <SubscriptionPlansSection />
      <FAQSection />
      <View style={styles.finalCta}>
        <Text style={styles.finalEyebrow}>MAKE ROOM FOR WHAT MATTERS</Text>
        <Text style={styles.finalTitle}>What can we help you get done today?</Text>
        <Text style={styles.finalSub}>Choose a service, share the details and review your quote before confirming.</Text>
        <Pressable style={({ pressed }) => [styles.finalButton, pressed && styles.pressed]} onPress={() => onNavigate('services')}><Text style={styles.finalButtonText}>Find your service →</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#F7FAFC' },
  hero: { backgroundColor: '#102A43', minHeight: 570, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 70, overflow: 'hidden' },
  heroCompact: { paddingHorizontal: 21, paddingVertical: 58, minHeight: 0 },
  heroInner: { width: '100%', maxWidth: 650, alignSelf: 'center' },
  heroInnerCompact: { maxWidth: 580 },
  pill: { alignSelf: 'flex-start', backgroundColor: 'rgba(167,216,207,0.15)', borderWidth: 1, borderColor: 'rgba(167,216,207,0.35)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 30, marginBottom: 22 },
  pillText: { color: '#BCEB67', fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  heading: { maxWidth: 680, color: '#FFFFFF', fontSize: 55, lineHeight: 63, fontWeight: '900', letterSpacing: -2 },
  headingCompact: { fontSize: 39, lineHeight: 46, letterSpacing: -1.2 },
  highlight: { color: '#BCEB67' },
  subheading: { color: '#D9E2EC', fontSize: 16, lineHeight: 26, maxWidth: 590, marginTop: 19 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 29 },
  actionsCompact: { flexDirection: 'column', alignItems: 'stretch' },
  primaryButton: { backgroundColor: '#BCEB67', paddingHorizontal: 21, paddingVertical: 15, borderRadius: 11 },
  primaryText: { color: '#17350B', fontSize: 14, fontWeight: '900', textAlign: 'center' },
  secondaryButton: { paddingHorizontal: 16, paddingVertical: 15 },
  secondaryText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', textAlign: 'center' },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 26 },
  trustText: { color: '#BCCCDC', fontSize: 11, fontWeight: '700' },
  visual: { width: 370, height: 340, alignItems: 'center', justifyContent: 'center', marginLeft: 28 },
  visualCircle: { width: 240, height: 240, borderRadius: 120, backgroundColor: '#1C4960', borderWidth: 1, borderColor: '#3D7180', alignItems: 'center', justifyContent: 'center' },
  visualEmoji: { fontSize: 100 },
  visualCheck: { position: 'absolute', right: 27, bottom: 20, width: 45, height: 45, borderRadius: 23, backgroundColor: '#BCEB67', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#102A43' },
  checkText: { color: '#17350B', fontSize: 21, fontWeight: '900' },
  floatCard: { position: 'absolute', right: 0, bottom: 11, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 17, width: 232, shadowColor: '#000000', shadowOpacity: 0.17, shadowRadius: 18, elevation: 6 },
  floatLabel: { color: '#0F766E', fontSize: 8, fontWeight: '900', letterSpacing: 0.8 },
  floatTitle: { color: '#102A43', fontSize: 16, fontWeight: '900', marginTop: 7 },
  floatSub: { color: '#627D98', fontSize: 10, marginTop: 4 },
  decorOne: { position: 'absolute', top: 19, right: 35, width: 35, height: 35, borderRadius: 18, backgroundColor: '#BCEB67' },
  decorTwo: { position: 'absolute', left: 5, bottom: 22, width: 18, height: 18, borderRadius: 9, backgroundColor: '#A7D8CF' },
  section: { paddingHorizontal: 24, paddingVertical: 68, backgroundColor: '#FFFFFF' },
  sectionIntro: { width: '100%', maxWidth: 1120, alignSelf: 'center', marginBottom: 27 },
  eyebrow: { color: '#0F766E', fontSize: 10, letterSpacing: 1.5, fontWeight: '900', marginBottom: 10 },
  sectionTitle: { color: '#102A43', fontSize: 32, lineHeight: 39, fontWeight: '900', letterSpacing: -0.8 },
  sectionSub: { color: '#627D98', fontSize: 14, marginTop: 10, lineHeight: 23, maxWidth: 780 },
  finalCta: { marginHorizontal: 24, marginTop: 48, marginBottom: 20, paddingHorizontal: 28, paddingVertical: 43, borderRadius: 22, backgroundColor: '#0F766E', alignItems: 'center' },
  finalEyebrow: { color: '#C6F6EA', fontSize: 9, fontWeight: '900', letterSpacing: 1.5, textAlign: 'center' },
  finalTitle: { color: '#FFFFFF', fontSize: 28, lineHeight: 35, fontWeight: '900', textAlign: 'center', maxWidth: 620, marginTop: 11 },
  finalSub: { color: '#DDF5EF', fontSize: 13, marginTop: 10, textAlign: 'center', lineHeight: 21, maxWidth: 570 },
  finalButton: { marginTop: 22, backgroundColor: '#BCEB67', paddingHorizontal: 22, paddingVertical: 13, borderRadius: 10 },
  finalButtonText: { color: '#17350B', fontWeight: '900', fontSize: 13 },
});
