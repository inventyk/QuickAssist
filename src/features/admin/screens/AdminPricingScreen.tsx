import React,{useEffect,useState} from 'react';
import {View,Text,TextInput,StyleSheet,Pressable,Alert} from 'react-native';
import {taskPricing} from '../../../config/pricing.config';
import {services} from '../../../features/services/data/services';
import {usePlatform} from '../../../core/state/PlatformProvider';
import type {ServiceCategory} from '../../../features/services/data/services';
import {PageHeading,Panel,ActionButton} from '../../../components/ui/Blocks';
export function AdminPricingScreen():React.ReactElement{
 const {priceOverrides,updatePrice}=usePlatform();const [draft,setDraft]=useState<Record<string,string>>({});
 useEffect(()=>{const next:Record<string,string>={};taskPricing.forEach(item=>{next[item.serviceId]=String(priceOverrides[item.serviceId as ServiceCategory]??item.startingAt);});setDraft(next);},[priceOverrides]);
 const save=(category:ServiceCategory)=>{const value=Number(draft[category]);if(!Number.isFinite(value)||value<0){Alert.alert('Invalid price','Enter a valid non-negative number.');return;}updatePrice(category,value);Alert.alert('Price updated','New base price is reflected in future demo quotes.');};
 return <View><PageHeading eyebrow="COMMERCIAL CONTROLS" title="Pricing configuration" description="Manage indicative base tariffs. Quote adjustments for distance, time, item count and priority are calculated separately."/>
 {taskPricing.map(item=>{const service=services.find(s=>s.category===item.serviceId);const current=priceOverrides[item.serviceId as ServiceCategory]??item.startingAt;return <Panel key={item.serviceId}><View style={styles.row}><View style={{flex:1}}><Text style={styles.name}>{service?.title??item.serviceId}</Text><Text style={styles.meta}>{item.unit} · default ₹{item.startingAt}</Text></View><Text style={styles.current}>Current ₹{current}</Text></View><View style={styles.row}><TextInput value={draft[item.serviceId]??String(current)} onChangeText={v=>setDraft(p=>({...p,[item.serviceId]:v}))} keyboardType="number-pad" style={styles.input}/><View style={{width:105}}><ActionButton label="Save price" onPress={()=>save(item.serviceId as ServiceCategory)}/></View></View></Panel>;})}
 <Panel><Text style={styles.name}>Quote adjustment rules</Text>{['Extra distance: ₹15 per additional km after 3 km','Additional time: ₹35 per extra 30-minute block for time-led tasks','Additional shopping items: ₹10 each after first 5 items','Priority request: ₹40, subject to capacity'].map(rule=><Text key={rule} style={styles.rule}>•  {rule}</Text>)}<Text style={styles.meta}>These are demo assumptions stored in code. Production pricing needs versioned tariff rules, city/zone overrides, tax treatment and quote snapshots.</Text></Panel>
 </View>;
}
const styles=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10},name:{color:'#102A43',fontSize:12,fontWeight:'900'},meta:{color:'#829AB1',fontSize:9,lineHeight:15,marginTop:4},current:{color:'#0F766E',fontWeight:'900',fontSize:10},input:{flex:1,height:39,borderWidth:1,borderColor:'#DDE6EA',borderRadius:8,paddingHorizontal:10,color:'#102A43',fontSize:12},rule:{color:'#52606D',fontSize:10,marginTop:9},});
