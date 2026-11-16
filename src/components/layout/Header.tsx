import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

type PageKey = 'home' | 'services';
type Props = { title: string; currentPage: PageKey; onNavigate: (page: PageKey) => void };

export function Header({ title, currentPage, onNavigate }: Props): React.ReactElement {
  const compact = useWindowDimensions().width < 760;
  const items: { key: PageKey; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Services' },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.inner, compact && styles.innerCompact]}>
        <TouchableOpacity accessibilityRole="button" onPress={() => onNavigate('home')}>
          <Text style={styles.brand}>{title}<Text style={styles.dot}>.</Text></Text>
        </TouchableOpacity>
        <View style={styles.links}>
          {items.map((item) => (
            <TouchableOpacity key={item.key} onPress={() => onNavigate(item.key)} style={[styles.link, compact && styles.linkCompact, currentPage === item.key && styles.activeLink]}>
              <Text style={[styles.linkText, compact && styles.linkTextCompact, currentPage === item.key && styles.activeText]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
          {!compact && <TouchableOpacity onPress={() => onNavigate('services')} style={styles.bookButton}>
            <Text style={styles.bookText}>Explore services</Text>
          </TouchableOpacity>}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E8EDF2' },
  inner: { width: '100%', maxWidth: 1160, alignSelf: 'center', minHeight: 76, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  innerCompact: { minHeight: 68, paddingHorizontal: 16 },
  brand: { fontSize: 25, fontWeight: '800', color: '#102A43', letterSpacing: -0.8 },
  dot: { color: '#0D9488' },
  links: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  link: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 9 },
  linkCompact: { paddingHorizontal: 7 },
  linkText: { color: '#52606D', fontSize: 14, fontWeight: '600' },
  linkTextCompact: { fontSize: 12 },
  activeLink: { backgroundColor: '#E8F5F3' },
  activeText: { color: '#0F766E' },
  bookButton: { backgroundColor: '#0F766E', paddingHorizontal: 17, paddingVertical: 12, borderRadius: 10 },
  bookText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
});
