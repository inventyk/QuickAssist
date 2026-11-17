import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import type { PageKey } from '../../types/navigation';

type Props = { title: string; currentPage: PageKey; onNavigate: (page: PageKey) => void };

export function Header({ title, currentPage, onNavigate }: Props): React.ReactElement {
  const compact = useWindowDimensions().width < 680;
  const items: { key: PageKey; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Services' },
    { key: 'pricing', label: 'Pricing' },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.inner, compact && styles.innerCompact]}>
        <Pressable accessibilityRole="button" onPress={() => onNavigate('home')}>
          <Text style={styles.brand}>{title}<Text style={styles.dot}>.</Text></Text>
          {!compact && <Text style={styles.tagline}>EVERYDAY HELP, MADE SIMPLE</Text>}
        </Pressable>
        <View style={styles.links}>
          {items.map((item) => (
            <Pressable key={item.key} onPress={() => onNavigate(item.key)} style={[styles.link, compact && styles.linkCompact, currentPage === item.key && styles.activeLink]}>
              <Text style={[styles.linkText, compact && styles.linkTextCompact, currentPage === item.key && styles.activeText]}>{item.label}</Text>
            </Pressable>
          ))}
          {!compact && <Pressable onPress={() => onNavigate('services')} style={styles.bookButton}>
            <Text style={styles.bookText}>Find a service ↗</Text>
          </Pressable>}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E8EDF2' },
  inner: { width: '100%', maxWidth: 1180, alignSelf: 'center', minHeight: 78, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  innerCompact: { minHeight: 68, paddingHorizontal: 14 },
  brand: { fontSize: 24, lineHeight: 28, fontWeight: '900', color: '#102A43', letterSpacing: -0.8 },
  dot: { color: '#0F766E' },
  tagline: { color: '#829AB1', fontSize: 8, fontWeight: '800', letterSpacing: 1.1, marginTop: 1 },
  links: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  link: { paddingVertical: 10, paddingHorizontal: 13, borderRadius: 9 },
  linkCompact: { paddingHorizontal: 7 },
  linkText: { color: '#52606D', fontSize: 13, fontWeight: '700' },
  linkTextCompact: { fontSize: 11 },
  activeLink: { backgroundColor: '#E8F5F1' },
  activeText: { color: '#0F766E' },
  bookButton: { backgroundColor: '#0F766E', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 },
  bookText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
});
