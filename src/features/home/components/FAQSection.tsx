import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Reveal } from '../../../components/common/Reveal';

const faqs = [
  { q: 'Is every task charged at the same rate?', a: 'No. Pricing depends on the type of task, distance, time, item count, waiting and complexity. The final quote is shared before confirmation.' },
  { q: 'Are grocery or shopping items included in the service price?', a: 'No. The helper’s assistance charge and the store/product bill are separate. You should receive the purchase details for the items bought.' },
  { q: 'Do I need a membership to request help?', a: 'No. Membership is optional. You can request individual tasks without subscribing.' },
  { q: 'Do membership plans include free tasks?', a: 'No. Memberships provide convenience benefits such as priority support, family profiles or selected offers. Each task is charged separately.' },
  { q: 'Can I request urgent or longer-distance tasks?', a: 'You can submit the details for review. Any extra distance, waiting or urgency charge must be shared in the quote before confirmation.' },
  { q: 'Does QuickAssist provide medical or emergency care?', a: 'No. Elderly accompaniment is non-medical assistance only. For medical, emergency or specialist care, use an appropriate licensed provider.' },
];

export function FAQSection(): React.ReactElement {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <View style={styles.section}>
      <Reveal><Text style={styles.eyebrow}>GOOD TO KNOW</Text><Text style={styles.title}>Questions, answered.</Text></Reveal>
      <View style={styles.list}>
        {faqs.map((item, index) => {
          const expanded = open === index;
          return (
            <View key={item.q} style={styles.item}>
              <Pressable accessibilityRole="button" accessibilityState={{ expanded }} onPress={() => setOpen(expanded ? null : index)} style={styles.question}>
                <Text style={styles.questionText}>{item.q}</Text><Text style={styles.symbol}>{expanded ? '−' : '+'}</Text>
              </Pressable>
              {expanded && <Text style={styles.answer}>{item.a}</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: '#F7FAFC', paddingHorizontal: 24, paddingVertical: 66, alignItems: 'center' },
  eyebrow: { color: '#0F766E', fontSize: 10, fontWeight: '900', letterSpacing: 1.5, textAlign: 'center' },
  title: { color: '#102A43', fontSize: 31, fontWeight: '900', marginTop: 9, marginBottom: 26, textAlign: 'center' },
  list: { width: '100%', maxWidth: 850 },
  item: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5EDF1', borderRadius: 13, marginBottom: 9, paddingHorizontal: 18, paddingVertical: 3 },
  question: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  questionText: { color: '#102A43', fontSize: 14, fontWeight: '800', flex: 1 },
  symbol: { color: '#0F766E', fontSize: 24, fontWeight: '500' },
  answer: { color: '#627D98', fontSize: 13, lineHeight: 21, paddingBottom: 17, paddingRight: 28 },
});
