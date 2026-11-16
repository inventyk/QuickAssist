import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HomePage } from '../features/home/pages/HomePage';
import { ServicesPage } from '../features/services/pages/ServicesPage';
import { appConfig } from '../config/app.config';

type PageKey = 'home' | 'services';

export function AppRoot(): React.ReactElement {
  const [page, setPage] = useState<PageKey>('home');
  const links = useMemo(() => [
    { href: '/', label: 'Home', onPress: () => setPage('home') },
    { href: '/services', label: 'Services', onPress: () => setPage('services') },
  ], []);

  return (
    <View style={styles.app}>
      <Header title={appConfig.name} currentPage={page} onNavigate={setPage} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {page === 'home' ? <HomePage onNavigate={setPage} /> : <ServicesPage onBook={() => setPage('home')} />}
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
