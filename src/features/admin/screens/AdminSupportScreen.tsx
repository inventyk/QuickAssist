import React from 'react';
import {View,Text,StyleSheet,Pressable} from 'react-native';
import {usePlatform} from '../../../core/state/PlatformProvider';
import {PageHeading,Panel,StatusPill,EmptyState} from '../../../components/ui/Blocks';
export function AdminSupportScreen():React.ReactElement{
 const {tickets,updateTicketStatus}=usePlatform();
 return <View><PageHeading eyebrow="CUSTOMER EXPERIENCE" title="Support centre" description="Review customer and helper queries and update their resolution state."/>
 {tickets.length===0?<EmptyState title="No support tickets" detail="New customer support requests will appear here."/>:tickets.map(ticket=><Panel key={ticket.id}><View style={styles.top}><Text style={styles.name}>{ticket.subject}</Text><StatusPill label={ticket.status.replace('_',' ')} tone={ticket.status==='resolved'?'green':ticket.status==='in_progress'?'teal':'amber'}/></View><Text style={styles.meta}>{ticket.id} · {ticket.customerName}</Text><Text style={styles.message}>{ticket.message}</Text><View style={styles.actions}><Pressable onPress={()=>updateTicketStatus(ticket.id,'in_progress')} style={styles.action}><Text style={styles.actionText}>Mark in progress</Text></Pressable><Pressable onPress={()=>updateTicketStatus(ticket.id,'resolved')} style={styles.action}><Text style={styles.actionText}>Resolve ticket ✓</Text></Pressable></View></Panel>)}
 </View>;
}
const styles=StyleSheet.create({top:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:8},name:{color:'#102A43',fontSize:12,fontWeight:'900',flex:1},meta:{color:'#829AB1',fontSize:9,marginTop:5},message:{color:'#52606D',fontSize:10,lineHeight:17,marginTop:10},actions:{flexDirection:'row',gap:8,marginTop:13},action:{backgroundColor:'#E8F5F1',borderRadius:8,paddingHorizontal:11,paddingVertical:9},actionText:{color:'#0F766E',fontSize:9,fontWeight:'900'}});
