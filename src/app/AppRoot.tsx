import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HomePage } from '../features/home/pages/HomePage';
import { ServicesPage } from '../features/services/pages/ServicesPage';
import { PricingPage } from '../features/pricing/pages/PricingPage';
import { appConfig } from '../config/app.config';
import { Reveal } from '../components/common/Reveal';
import type { PageKey } from '../types/navigation';

export function AppRoot(): React.ReactElement {
  const [page, setPage] = useState<PageKey>('home');
  const links = useMemo(() => [
    { href: '/', label: 'Home', onPress: () => setPage('home') },
    { href: '/services', label: 'Services', onPress: () => setPage('services') },
    { href: '/pricing', label: 'Pricing', onPress: () => setPage('pricing') },
  ], []);

  return (
    <View style={styles.app}>
      <Header title={appConfig.name} currentPage={page} onNavigate={setPage} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Reveal key={page}>
          {page === 'home'
            ? <HomePage onNavigate={setPage} />
            : page === 'services'
              ? <ServicesPage onBook={() => setPage('home')} />
              : <PricingPage />}
        </Reveal>
        <Footer links={links} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  app: { flex: 1, minHeight: '100%', backgroundColor: '#F7FAFC' },
  scroll: { flex: 1 },
  content: { flexGrow: 1 },
});
