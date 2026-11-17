import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { services } from '../../services/data/services';
import { ServiceCard } from '../../services/components/ServiceCard';
import { Reveal } from '../../../components/common/Reveal';

export function ServiceHighlights({ onExplore }: { onExplore?: () => void }): React.ReactElement {
  const compact = useWindowDimensions().width < 760;
  const cardWidth = compact ? '100%' : '31.9%';
  return (
    <View style={styles.grid}>
      {services.slice(0, 6).map((service, index) => (
        <Reveal key={service.id} delay={index * 55} style={{ width: cardWidth }}>
          <ServiceCard service={service} onPress={onExplore ? () => onExplore() : undefined} />
        </Reveal>
      ))}
      {onExplore ? <Pressable accessibilityRole="button" onPress={onExplore} style={styles.explore}><Text style={styles.exploreText}>View all services →</Text></Pressable> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  grid: { width: '100%', maxWidth: 1120, alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  explore: { paddingVertical: 13, paddingHorizontal: 17, borderRadius: 10, backgroundColor: '#E8F5F1', alignSelf: 'flex-start' },
  exploreText: { color: '#0F766E', fontSize: 13, fontWeight: '900' },
});
