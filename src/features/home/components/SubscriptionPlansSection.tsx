import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { membershipPlans } from '../../../config/pricing.config';
import { Reveal } from '../../../components/common/Reveal';

export function SubscriptionPlansSection(): React.ReactElement {
  const compact = useWindowDimensions().width < 760;
  return (
    <View style={styles.section}>
      <Reveal>
        <Text style={styles.eyebrow}>OPTIONAL MEMBERSHIP</Text>
        <Text style={styles.title}>A little more convenience, every month.</Text>
        <Text style={styles.subtitle}>Choose a plan for added convenience. Every task is still priced separately according to its work, distance and time.</Text>
      </Reveal>
      <View style={[styles.plans, compact && styles.plansMobile]}>
        {membershipPlans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 90} style={[styles.planCard, plan.featured && styles.featured]}>
            {plan.featured && <View style={styles.popular}><Text style={styles.popularText}>MOST POPULAR</Text></View>}
            <Text style={[styles.planName, plan.featured && styles.featuredText]}>{plan.name}</Text>
            <Text style={[styles.tagline, plan.featured && styles.featuredMuted]}>{plan.tagline}</Text>
            <Text style={[styles.price, plan.featured && styles.featuredText]}>₹{plan.price}<Text style={[styles.month, plan.featured && styles.featuredMuted]}> / month</Text></Text>
            <View style={styles.divider}/>
            {plan.benefits.map((benefit) => <View key={benefit} style={styles.benefitRow}><Text style={styles.check}>✓</Text><Text style={[styles.benefit, plan.featured && styles.featuredMuted]}>{benefit}</Text></View>)}
            <Text style={[styles.planFoot, plan.featured && styles.featuredMuted]}>Tasks and product purchases are charged separately.</Text>
          </Reveal>
        ))}
      </View>
      <Text style={styles.smallPrint}>Membership is optional. No free-task quota is bundled into these plans. Benefits and prices are pilot proposals and can be updated before launch.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, paddingVertical: 72, backgroundColor: '#FFFFFF', alignItems: 'center' },
  eyebrow: { color: '#0F766E', fontSize: 10, fontWeight: '900', letterSpacing: 1.6, textAlign: 'center' },
  title: { color: '#102A43', fontSize: 31, lineHeight: 38, fontWeight: '900', textAlign: 'center', maxWidth: 720, marginTop: 9 },
  subtitle: { color: '#627D98', fontSize: 14, lineHeight: 23, textAlign: 'center', maxWidth: 700, marginTop: 11, marginBottom: 30 },
  plans: { width: '100%', maxWidth: 1050, flexDirection: 'row', gap: 15, alignItems: 'stretch' },
  plansMobile: { flexDirection: 'column' },
  planCard: { flex: 1, minHeight: 340, backgroundColor: '#F7FAFC', padding: 23, borderRadius: 18, borderWidth: 1, borderColor: '#E4EBEF' },
  featured: { backgroundColor: '#102A43', borderColor: '#102A43' },
  popular: { alignSelf: 'flex-start', backgroundColor: '#BCEB67', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20, marginBottom: 14 },
  popularText: { color: '#17350B', fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  planName: { color: '#102A43', fontSize: 19, fontWeight: '900' },
  featuredText: { color: '#FFFFFF' },
  tagline: { color: '#829AB1', fontSize: 12, marginTop: 4 },
  featuredMuted: { color: '#D9E2EC' },
  price: { color: '#0F766E', fontSize: 30, fontWeight: '900', marginTop: 18 },
  month: { color: '#829AB1', fontSize: 11, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#D9E2EC', marginVertical: 17 },
  benefitRow: { flexDirection: 'row', gap: 9, marginBottom: 12, alignItems: 'flex-start' },
  check: { color: '#0F766E', fontSize: 14, fontWeight: '900' },
  benefit: { color: '#486581', fontSize: 12, lineHeight: 18, flex: 1 },
  planFoot: { color: '#829AB1', fontSize: 10, lineHeight: 16, marginTop: 'auto', paddingTop: 13 },
  smallPrint: { color: '#829AB1', fontSize: 10, lineHeight: 16, maxWidth: 900, textAlign: 'center', marginTop: 21 },
});
