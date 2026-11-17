import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import type {Booking} from '../../../core/models/platform';
import {usePlatform} from '../../../core/state/PlatformProvider';
import {PageHeading,Panel,StatCard,StatusPill,ActionButton} from '../../../components/ui/Blocks';
type Props={name:string;bookings:Booking[];onNavigate:(key:string)=>void};
export function HelperHomeScreen({name,bookings,onNavigate}:Props):React.ReactElement{
 const {helpers,user,setHelperOnline}=usePlatform();const profile=helpers.find(h=>h.email===user?.email)||helpers[0];const open=bookings.filter(b=>!['completed','cancelled'].includes(b.status));
 return <View><PageHeading eyebrow="PARTNER WORKSPACE" title={`Welcome back, ${name.split(' ')[0]}`} description="Your task requests, availability and earnings at a glance."/>
  <Panel><View style={styles.row}><View style={{flex:1}}><Text style={styles.availability}>You are {profile?.online?'online':'offline'}</Text><Text style={styles.caption}>{profile?.online?'You can receive matching task requests.':'Switch online when you are ready to work.'}</Text></View><ActionButton label={profile?.online?'Go offline':'Go online'} onPress={()=>profile&&setHelperOnline(profile.id,!profile.online)} secondary={!profile?.online}/></View></Panel>
  <View style={styles.stats}><StatCard label="Available requests" value={String(bookings.filter(b=>['finding_helper','requested'].includes(b.status)).length)} note="Waiting for a helper"/><StatCard label="Completed tasks" value={String(profile?.completedTasks??0)} note="Demo profile"/><StatCard label="Partner rating" value={profile?.rating?profile.rating.toFixed(1):'New'} note="Customer feedback"/></View>
  <View style={styles.rowTitle}><Text style={styles.section}>Task board</Text><Text style={styles.link}>Live shared data</Text></View>
  {open.slice(0,3).map(b=><Panel key={b.id}><View style={styles.row}><Text style={styles.task}>{b.serviceTitle}</Text><StatusPill label={b.status.replaceAll('_',' ')} tone="amber"/></View><Text style={styles.copy}>{b.pickupAddress} → {b.dropoffAddress}</Text><Text style={styles.money}>₹{Math.round(b.quote*0.5)} estimated partner payout</Text></Panel>)}
  <ActionButton label="Open all tasks →" onPress={()=>onNavigate('tasks')}/>
 </View>;
}
const styles=StyleSheet.create({row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:10},availability:{color:'#102A43',fontSize:14,fontWeight:'900'},caption:{color:'#829AB1',fontSize:9,marginTop:4},stats:{flexDirection:'row',flexWrap:'wrap',gap:10,marginBottom:22},rowTitle:{flexDirection:'row',justifyContent:'space-between',marginBottom:10},section:{color:'#102A43',fontSize:15,fontWeight:'900'},link:{color:'#0F766E',fontSize:9,fontWeight:'900'},task:{color:'#102A43',fontSize:12,fontWeight:'900'},copy:{color:'#627D98',fontSize:10,marginTop:8},money:{color:'#0F766E',fontSize:10,fontWeight:'900',marginTop:6}});
