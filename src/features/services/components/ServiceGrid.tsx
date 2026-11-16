import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import type { Service } from '../data/services';
import { ServiceCard } from './ServiceCard';
export function ServiceGrid({ services }: { services: Service[] }): React.ReactElement {
  const width = useWindowDimensions().width;
  const columns = width >= 1000 ? 3 : width >= 650 ? 2 : 1;
  return <View style={styles.container}>{services.map((service) => <View key={service.id} style={{ width: columns === 3 ? '32%' : columns === 2 ? '48.5%' : '100%' }}><ServiceCard service={service} /></View>)}</View>;
}
const styles = StyleSheet.create({ container: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 14 } });
