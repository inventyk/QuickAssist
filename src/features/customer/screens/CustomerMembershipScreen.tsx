import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {membershipPlans} from '../../../config/pricing.config';
import {usePlatform} from '../../../core/state/PlatformProvider';
import {PageHeading,Panel,ActionButton,StatusPill} from '../../../components/ui/Blocks';
export function CustomerMembershipScreen():React.ReactElement{
 const {user,membershipByEmail,setMembership}=usePlatform();const current=user?membershipByEmail[user.email]:undefined;
 return <View><PageHeading eyebrow="MEMBERSHIP" title="More convenience, every month." description="Membership is optional. Every task is still charged separately according to its requirements."/>
 <View style={styles.grid}>{membershipPlans.map(plan=><Panel key={plan.id} style={[styles.card,plan.featured&&styles.featured]}><View style={styles.top}><Text style={[styles.name,plan.featured&&styles.white]}>{plan.name}</Text>{plan.featured?<StatusPill label="POPULAR" tone="green"/>:null}</View><Text style={[styles.price,plan.featured&&styles.white]}>₹{plan.price}<Text style={[styles.month,plan.featured&&styles.muted]}> / month</Text></Text><Text style={[styles.tag,plan.featured&&styles.muted]}>{plan.tagline}</Text>{plan.benefits.map(b=><Text key={b} style={[styles.benefit,plan.featured&&styles.muted]}>✓ {b}</Text>)}<Text style={[styles.note,plan.featured&&styles.muted]}>No free tasks included. Task charges are separate.</Text><ActionButton label={current===plan.id?'Current plan':`Select ${plan.name}`} disabled={current===plan.id} secondary={current===plan.id||plan.featured} onPress={()=>user&&setMembership(user.email,plan.id)}/></Panel>)}</View>
 {current?<Text style={styles.current}>Your current plan: {membershipPlans.find(p=>p.id===current)?.name??current}</Text>:<Text style={styles.current}>You are currently on the free/no-membership option.</Text>}
 </View>;
}
const styles=StyleSheet.create({grid:{flexDirection:'row',flexWrap:'wrap',gap:12},card:{flex:1,minWidth:210,marginBottom:0},featured:{backgroundColor:'#102A43',borderColor:'#102A43'},top:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},name:{color:'#102A43',fontSize:16,fontWeight:'900'},white:{color:'#FFFFFF'},price:{color:'#0F766E',fontSize:28,fontWeight:'900',marginTop:15},month:{fontSize:10,color:'#829AB1'},tag:{color:'#829AB1',fontSize:10,marginTop:4,marginBottom:15},muted:{color:'#D9E2EC'},benefit:{color:'#52606D',fontSize:10,lineHeight:17,marginBottom:8},note:{color:'#829AB1',fontSize:9,lineHeight:14,marginTop:7,marginBottom:15},current:{color:'#627D98',fontSize:11,marginTop:15,fontWeight:'700'}});
