import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '../../../components/layout/Container';
import { taskPricing, membershipPlans, pricingDisclosure } from '../../../config/pricing.config';
import { services } from '../../services/data/services';
import { Reveal } from '../../../components/common/Reveal';

export function PricingPage(): React.ReactElement {
  return (
    <View style={styles.page}>
      <View style={styles.hero}><Text style={styles.eyebrow}>SIMPLE, FLEXIBLE, TASK-BASED</Text><Text style={styles.title}>Pricing that reflects the work.</Text><Text style={styles.subtitle}>Every task is different. See an indicative starting price, share your requirements and get a final quote before confirmation.</Text></View>
      <Container>
        <Text style={styles.sectionTitle}>Individual task pricing</Text>
        <Text style={styles.sectionIntro}>Pay only for the service you request. Longer routes, extra waiting, larger item lists and additional time can change the quote.</Text>
        <View style={styles.table}>
          {taskPricing.map((item, index) => {
            const service = services.find((entry) => entry.category === item.serviceId);
            return <Reveal key={item.serviceId} delay={index * 45} style={styles.row}>
              <View style={styles.rowText}><Text style={styles.task}>{service?.title ?? item.serviceId}</Text><Text style={styles.note}>{item.note}</Text></View>
              <View style={styles.priceWrap}><Text style={styles.price}>₹{item.startingAt}</Text><Text style={styles.unit}>{item.unit}</Text></View>
            </Reveal>;
          })}
        </View>
        <Text style={styles.disclosure}>{pricingDisclosure}</Text>
        <Text style={[styles.sectionTitle, styles.membershipTitle]}>Optional monthly membership</Text>
        <Text style={styles.sectionIntro}>Membership adds convenience. It does not replace the cost of individual tasks.</Text>
        <View style={styles.planGrid}>
          {membershipPlans.map((plan) => <View key={plan.id} style={[styles.plan, plan.featured && styles.planFeatured]}>
            <Text style={[styles.planName, plan.featured && styles.white]}>{plan.name}</Text>
            <Text style={[styles.planTagline, plan.featured && styles.muted]}>{plan.tagline}</Text>
            <Text style={[styles.planPrice, plan.featured && styles.white]}>₹{plan.price}<Text style={[styles.planMonth, plan.featured && styles.muted]}> / month</Text></Text>
            {plan.benefits.map((benefit) => <Text key={benefit} style={[styles.planBenefit, plan.featured && styles.muted]}>✓  {benefit}</Text>)}
            <Text style={[styles.planFine, plan.featured && styles.muted]}>Every task is charged separately.</Text>
          </View>)}
        </View>
      </Container>
    </View>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F7FAFC' },
  hero: { paddingHorizontal: 24, paddingVertical: 60, alignItems: 'center', backgroundColor: '#102A43' },
  eyebrow: { color: '#A7D8CF', fontSize: 10, fontWeight: '900', letterSpacing: 1.6, textAlign: 'center' },
  title: { color: '#FFFFFF', fontSize: 38, lineHeight: 46, fontWeight: '900', textAlign: 'center', marginTop: 11 },
  subtitle: { color: '#D9E2EC', fontSize: 14, lineHeight: 23, maxWidth: 660, textAlign: 'center', marginTop: 12 },
  sectionTitle: { color: '#102A43', fontSize: 24, fontWeight: '900', marginBottom: 7 },
  sectionIntro: { color: '#627D98', fontSize: 13, lineHeight: 21, marginBottom: 19, maxWidth: 750 },
  table: { borderRadius: 17, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4EBEF', overflow: 'hidden' },
  row: { paddingHorizontal: 19, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#EEF2F6', gap: 14 },
  rowText: { flex: 1 },
  task: { color: '#102A43', fontSize: 14, fontWeight: '800' },
  note: { color: '#829AB1', fontSize: 11, lineHeight: 17, marginTop: 4 },
  priceWrap: { alignItems: 'flex-end', minWidth: 105 },
  price: { color: '#0F766E', fontSize: 21, fontWeight: '900' },
  unit: { color: '#829AB1', fontSize: 10, textAlign: 'right', marginTop: 3 },
  disclosure: { color: '#829AB1', fontSize: 10, lineHeight: 16, marginTop: 17 },
  membershipTitle: { marginTop: 52 },
  planGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  plan: { flex: 1, minWidth: 210, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E4EBEF', borderRadius: 17, padding: 20, minHeight: 250 },
  planFeatured: { backgroundColor: '#102A43', borderColor: '#102A43' },
  planName: { color: '#102A43', fontSize: 18, fontWeight: '900' },
  white: { color: '#FFFFFF' },
  planTagline: { color: '#829AB1', fontSize: 11, marginTop: 3 },
  muted: { color: '#D9E2EC' },
  planPrice: { color: '#0F766E', fontSize: 28, fontWeight: '900', marginTop: 17, marginBottom: 15 },
  planMonth: { color: '#829AB1', fontSize: 10, fontWeight: '600' },
  planBenefit: { color: '#52606D', fontSize: 11, lineHeight: 18, marginBottom: 8 },
  planFine: { color: '#829AB1', fontSize: 10, lineHeight: 15, marginTop: 'auto', paddingTop: 10 },
});
