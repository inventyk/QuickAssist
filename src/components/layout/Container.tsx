import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
type Props = ViewProps & { children: React.ReactNode; fluid?: boolean };
export function Container({ children, fluid = false, style, ...rest }: Props): React.ReactElement {
  return <View style={[styles.container, fluid && styles.fluid, style]} {...rest}>{children}</View>;
}
const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 1160, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 36 },
  fluid: { maxWidth: '100%' },
});
