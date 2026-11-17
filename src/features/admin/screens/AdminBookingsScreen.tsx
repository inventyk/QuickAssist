import React from 'react';
import {View,Text,StyleSheet,Pressable} from 'react-native';
import {usePlatform} from '../../../core/state/PlatformProvider';
import {PageHeading,Panel,StatusPill,ActionButton,EmptyState} from '../../../components/ui/Blocks';
import type {Booking} from '../../../core/models/platform';
export function AdminBookingsScreen():React.ReactElement{
 const {bookings,helpers,updateBookingStatus}=usePlatform();
 const assignable=helpers.find(h=>h.verified&&h.online)?.name??'Rahul Patil';
 const assign=(b:Booking)=>updateBookingStatus(b.id,'assigned',assignable);
 return <View><PageHeading eyebrow="TASK OPERATIONS" title="Booking management" description="Review incoming requests, allocate available helpers and monitor task progress. Updates appear in the connected demo workspaces."/>
 {bookings.length===0?<EmptyState title="No bookings yet" detail="Customer requests will appear here."/>:bookings.map(b=><Panel key={b.id}><View style={styles.row}><Text style={styles.title}>{b.serviceTitle}</Text><StatusPill label={b.status.replaceAll('_',' ')} tone={b.status==='completed'?'green':b.status==='cancelled'?'red':'amber'}/></View><Text style={styles.meta}>{b.id} · {b.customerName} · {b.scheduledFor}</Text><Text style={styles.desc}>{b.description}</Text><Text style={styles.meta}>Pickup: {b.pickupAddress}</Text><Text style={styles.meta}>Drop: {b.dropoffAddress}</Text><View style={styles.bottom}><Text style={styles.total}>₹{b.quote}</Text><Text style={styles.helper}>Helper: {b.helperName??'Unassigned'}</Text></View>
 <View style={styles.actions}>{['finding_helper','requested'].includes(b.status)?<ActionButton label="Assign helper" onPress={()=>assign(b)}/>:null}{b.status==='assigned'||b.status==='accepted'?<ActionButton label="Start journey" secondary onPress={()=>updateBookingStatus(b.id,'on_the_way',b.helperName)}/>:null}{b.status==='on_the_way'?<ActionButton label="Start task" onPress={()=>updateBookingStatus(b.id,'in_progress',b.helperName)}/>:null}{b.status==='in_progress'?<ActionButton label="Complete" onPress={()=>updateBookingStatus(b.id,'completed',b.helperName)}/>:null}{!['completed','cancelled'].includes(b.status)?<ActionButton label="Cancel" secondary onPress={()=>updateBookingStatus(b.id,'cancelled')}/>:null}</View></Panel>)}
 <Text style={styles.note}>Assignment is a manual demo action. Production dispatch needs server-side matching, helper availability, timeout/retry and audit logging.</Text>
 </View>;
}
const styles=StyleSheet.create({row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:6},title:{color:'#102A43',fontSize:12,fontWeight:'900',flex:1},meta:{color:'#829AB1',fontSize:9,marginTop:6},desc:{color:'#52606D',fontSize:10,lineHeight:16,marginTop:7},bottom:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:12,paddingTop:10,borderTopWidth:1,borderTopColor:'#EDF1F3'},total:{color:'#0F766E',fontSize:18,fontWeight:'900'},helper:{color:'#627D98',fontSize:9,fontWeight:'700'},actions:{flexDirection:'row',flexWrap:'wrap',gap:7,marginTop:11},note:{color:'#9FB3C8',fontSize:9,lineHeight:14,marginTop:12}});
