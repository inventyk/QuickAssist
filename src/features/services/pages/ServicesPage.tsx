import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ServiceGrid } from '../components/ServiceGrid';
import { services } from '../data/services';
import { Container } from '../../../components/layout/Container';

type Props = { onBook?: () => void };
export function ServicesPage({ onBook = () => undefined }: Props): React.ReactElement {
  return (
    <View style={styles.page}>
      <View style={styles.hero}><Text style={styles.eyebrow}>OUR SERVICES</Text><Text style={styles.title}>A little help goes a long way.</Text><Text style={styles.subtitle}>Choose the task you need help with. Final pricing is shown clearly before you confirm.</Text></View>
      <Container><ServiceGrid services={services} /><Text onPress={onBook} accessibilityRole="button" style={styles.book}>Ready to get started? Contact us to arrange a task →</Text></Container>
    </View>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F7FAFC' }, hero: { paddingHorizontal: 24, paddingVertical: 54, backgroundColor: '#F0F7F6', alignItems: 'center' },
  eyebrow: { color: '#0F766E', fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 12 },
  title: { color: '#102A43', fontSize: 34, fontWeight: '800', textAlign: 'center' }, subtitle: { color: '#627D98', fontSize: 15, textAlign: 'center', maxWidth: 600, lineHeight: 24, marginTop: 12 },
  book: { color: '#0F766E', fontSize: 14, fontWeight: '800', paddingVertical: 28 },
});
