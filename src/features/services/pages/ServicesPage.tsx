import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { ServiceGrid } from '../components/ServiceGrid';
import { services, Service, ServiceCategory } from '../data/services';
import { Container } from '../../../components/layout/Container';
import { Reveal } from '../../../components/common/Reveal';
import { taskPricing, pricingDisclosure } from '../../../config/pricing.config';

type Props = { onBook?: () => void };
const filters: { label: string; value: ServiceCategory | 'all' }[] = [
  { label: 'All services', value: 'all' },
  { label: 'Shopping', value: 'grocery' },
  { label: 'Pickup & drop', value: 'pickup' },
  { label: 'Documents', value: 'documents' },
  { label: 'Personal help', value: 'personal' },
];

export function ServicesPage({ onBook = () => undefined }: Props): React.ReactElement {
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');
  const [selected, setSelected] = useState<Service | null>(null);
  const filtered = useMemo(() => filter === 'all' ? services : services.filter((item) =>
    filter === 'grocery' ? ['grocery', 'shopping'].includes(item.category) :
    filter === 'personal' ? ['personal', 'elderly', 'queue', 'other'].includes(item.category) :
    item.category === filter
  ), [filter]);
  const quote = selected ? taskPricing.find((item) => item.serviceId === selected.category) : undefined;

  return (
    <View style={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>EVERYDAY HELP, ONE REQUEST AWAY</Text>
        <Text style={styles.title}>What can we take off your list?</Text>
        <Text style={styles.subtitle}>From a quick pickup to a longer personal errand, choose the help you need. We confirm the scope and final price before accepting a task.</Text>
      </View>
      <Container>
        <View style={styles.filterRow}>
          {filters.map((item) => (
            <Pressable key={item.value} onPress={() => setFilter(item.value)} style={[styles.filter, filter === item.value && styles.filterActive]}>
              <Text style={[styles.filterText, filter === item.value && styles.filterTextActive]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        <Reveal><ServiceGrid services={filtered} onSelect={setSelected} /></Reveal>
        <Text style={styles.disclosure}>{pricingDisclosure}</Text>
      </Container>

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Pressable style={styles.close} onPress={() => setSelected(null)}><Text style={styles.closeText}>✕</Text></Pressable>
            {selected && <>
              <Text style={styles.modalEyebrow}>SERVICE DETAILS</Text>
              <Text style={styles.modalTitle}>{selected.title}</Text>
              <Text style={styles.modalDescription}>{selected.details}</Text>
              <View style={styles.quoteBox}>
                <Text style={styles.quoteLabel}>INDICATIVE STARTING PRICE</Text>
                <Text style={styles.quotePrice}>₹{selected.startingAt}<Text style={styles.quoteUnit}> / {selected.priceUnit}</Text></Text>
                <Text style={styles.quoteNote}>{quote?.note ?? 'Final quote depends on the task details.'}</Text>
              </View>
              <Text style={styles.modalFoot}>A final quote is shared before confirmation. No task is booked by opening this preview.</Text>
              <Pressable onPress={() => { setSelected(null); onBook(); }} style={styles.modalButton}><Text style={styles.modalButtonText}>Got it</Text></Pressable>
            </>}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F7FAFC' },
  hero: { paddingHorizontal: 24, paddingVertical: 62, backgroundColor: '#102A43', alignItems: 'center' },
  eyebrow: { color: '#A7D8CF', fontSize: 10, fontWeight: '900', letterSpacing: 1.7, marginBottom: 13, textAlign: 'center' },
  title: { color: '#FFFFFF', fontSize: 38, lineHeight: 46, fontWeight: '900', textAlign: 'center', maxWidth: 760 },
  subtitle: { color: '#D9E2EC', fontSize: 15, lineHeight: 24, textAlign: 'center', maxWidth: 680, marginTop: 14 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 22 },
  filter: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 24, borderWidth: 1, borderColor: '#D9E2EC', backgroundColor: '#FFFFFF' },
  filterActive: { backgroundColor: '#0F766E', borderColor: '#0F766E' },
  filterText: { color: '#52606D', fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: '#FFFFFF' },
  disclosure: { color: '#829AB1', fontSize: 11, lineHeight: 17, marginTop: 24 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(8, 27, 43, 0.62)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 520, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 25 },
  close: { alignSelf: 'flex-end', width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0F4F7', alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#52606D', fontWeight: '800' },
  modalEyebrow: { color: '#0F766E', fontSize: 10, fontWeight: '900', letterSpacing: 1.4, marginTop: 6 },
  modalTitle: { color: '#102A43', fontSize: 25, fontWeight: '900', marginTop: 8 },
  modalDescription: { color: '#52606D', fontSize: 14, lineHeight: 22, marginTop: 12 },
  quoteBox: { marginTop: 18, padding: 17, borderRadius: 14, backgroundColor: '#F0F7F6' },
  quoteLabel: { color: '#0F766E', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  quotePrice: { color: '#102A43', fontSize: 28, fontWeight: '900', marginTop: 5 },
  quoteUnit: { color: '#627D98', fontSize: 12, fontWeight: '500' },
  quoteNote: { color: '#627D98', fontSize: 12, lineHeight: 18, marginTop: 5 },
  modalFoot: { color: '#829AB1', fontSize: 11, lineHeight: 17, marginTop: 13 },
  modalButton: { backgroundColor: '#0F766E', paddingVertical: 13, borderRadius: 11, alignItems: 'center', marginTop: 18 },
  modalButtonText: { color: '#FFFFFF', fontWeight: '800' },
});
