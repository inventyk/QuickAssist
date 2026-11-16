import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { services } from '../../services/data/services';
import { ServiceCard } from '../../services/components/ServiceCard';

export function ServiceHighlights({ onExplore }: { onExplore?: () => void }): React.ReactElement {
  const compact = useWindowDimensions().width < 760;
  return (
    <View style={styles.grid}>
      {services.slice(0, 6).map((service) => <View key={service.id} style={[styles.item, !compact && styles.itemDesktop]}><ServiceCard service={service} /></View>)}
      {onExplore ? <Text accessibilityRole="link" onPress={onExplore} style={styles.explore}>View all services →</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  grid: { width: '100%', maxWidth: 1120, alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  item: { width: '100%' },
  itemDesktop: { width: '32%' },
  explore: { color: '#0F766E', fontSize: 14, fontWeight: '800', paddingVertical: 12 },
});
