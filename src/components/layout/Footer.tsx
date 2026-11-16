import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
export type FooterLink = { href: string; label: string; onPress?: () => void };
export function Footer({ links = [] }: { links?: FooterLink[] }): React.ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.copy}>
          <Text style={styles.brand}>QuickAssist.</Text>
          <Text style={styles.note}>Everyday help, made simpler.</Text>
        </View>
        <View style={styles.links}>
          {links.map((link) => <TouchableOpacity key={link.href} onPress={link.onPress}><Text style={styles.link}>{link.label}</Text></TouchableOpacity>)}
        </View>
        <Text style={styles.copyright}>© {new Date().getFullYear()} QuickAssist. Demo experience.</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { marginTop: 48, backgroundColor: '#102A43', paddingVertical: 32, paddingHorizontal: 24 },
  inner: { width: '100%', maxWidth: 1160, alignSelf: 'center', gap: 16 },
  copy: { gap: 4 },
  brand: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  note: { color: '#BCCCDC', fontSize: 13 },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  link: { color: '#D9E2EC', fontSize: 13, fontWeight: '600' },
  copyright: { color: '#9FB3C8', fontSize: 12, marginTop: 8 },
});
