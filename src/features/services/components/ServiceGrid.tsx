import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import type { Service } from '../data/services';
import { ServiceCard } from './ServiceCard';

type Props = { services: Service[]; onSelect?: (service: Service) => void };

export function ServiceGrid({ services, onSelect }: Props): React.ReactElement {
  const width = useWindowDimensions().width;
  const columns = width >= 1000 ? 3 : width >= 650 ? 2 : 1;
  const itemWidth = columns === 3 ? '31.9%' : columns === 2 ? '48.5%' : '100%';
  return (
    <View style={styles.container}>
      {services.map((service) => (
        <View key={service.id} style={{ width: itemWidth }}>
          <ServiceCard service={service} onPress={onSelect} />
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
});
