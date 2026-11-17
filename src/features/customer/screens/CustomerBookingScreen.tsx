import React,{useMemo,useRef,useState} from 'react';
import {
 View,Text,TextInput,StyleSheet,Pressable,Switch,Alert,
 Animated,Easing,findNodeHandle
} from 'react-native';
import {services} from '../../../features/services/data/services';
import type {ServiceCategory} from '../../../features/services/data/services';
import {calculateQuote} from '../../../core/pricing/calculateQuote';
import {usePlatform} from '../../../core/state/PlatformProvider';
import {Panel,PageHeading,ActionButton} from '../../../components/ui/Blocks';

type Props={initialCategory:ServiceCategory;onDone:()=>void;onCancel:()=>void};
const SERVICE_GLYPHS:Record<ServiceCategory,string>={
 grocery:'🛒',pickup:'📦',documents:'📄',queue:'⏱️',
 shopping:'🧺',personal:'🧭',elderly:'🤝',other:'✨'
};

export function CustomerBookingScreen({initialCategory,onDone,onCancel}:Props):React.ReactElement{
 const {user,createBooking,priceOverrides,bookings}=usePlatform();
 const [category,setCategory]=useState<ServiceCategory>(initialCategory);
 const [description,setDescription]=useState('');
 const [pickup,setPickup]=useState('');
 const [dropoff,setDropoff]=useState('');
 const [distance,setDistance]=useState('3');
 const [minutes,setMinutes]=useState('30');
 const [items,setItems]=useState('5');
 const [schedule,setSchedule]=useState<'now'|'later'>('now');
 const [scheduleText,setScheduleText]=useState('Today, as soon as possible');
 const [priority,setPriority]=useState(false);
 const [confirmed,setConfirmed]=useState(false);
 const [isAnimating,setIsAnimating]=useState(false);

 // These refs measure the service marker and the basket target in this screen.
 const rootRef=useRef<View>(null);
 const sourceRef=useRef<View>(null);
 const basketRef=useRef<View>(null);
 const flyX=useRef(new Animated.Value(0)).current;
 const flyY=useRef(new Animated.Value(0)).current;
 const flyScale=useRef(new Animated.Value(1)).current;
 const flyOpacity=useRef(new Animated.Value(0)).current;
 const flyRotate=useRef(new Animated.Value(0)).current;
 const basketScale=useRef(new Animated.Value(1)).current;
 const ringScale=useRef(new Animated.Value(1)).current;
 const ringOpacity=useRef(new Animated.Value(0)).current;

 const service=services.find(item=>item.category===category)??services[0];
 const breakdown=useMemo(
  ()=>calculateQuote(category,Number(distance)||0,Number(minutes)||0,Number(items)||1,priority,priceOverrides),
  [category,distance,minutes,items,priority,priceOverrides]
 );
 const bookingCount=bookings.filter(b=>b.customerEmail===user?.email).length;

 const animateServiceIntoBasket=()=>new Promise<void>(resolve=>{
  const root=rootRef.current;
  const source=sourceRef.current;
  const basket=basketRef.current;
  const rootNode=root?findNodeHandle(root):null;
  if(!rootNode||!source||!basket){resolve();return;}

  source.measureLayout(rootNode,(sx,sy,sw,sh)=>{
   basket.measureLayout(rootNode,(bx,by,bw,bh)=>{
    const startX=sx+sw/2-27;
    const startY=sy+sh/2-27;
    const endX=bx+bw/2-27;
    const endY=by+bh/2-27;
    const middleX=(startX+endX)/2;
    const middleY=(startY+endY)/2-58;

    flyX.setValue(startX);
    flyY.setValue(startY);
    flyScale.setValue(1);
    flyRotate.setValue(0);
    flyOpacity.setValue(1);
    basketScale.setValue(1);
    ringScale.setValue(1);
    ringOpacity.setValue(0);

    // Two short legs create a soft upward arc, then the icon lands in the basket.
    Animated.sequence([
     Animated.parallel([
      Animated.timing(flyX,{toValue:middleX,duration:270,easing:Easing.out(Easing.quad),useNativeDriver:true}),
      Animated.timing(flyY,{toValue:middleY,duration:270,easing:Easing.out(Easing.quad),useNativeDriver:true}),
      Animated.timing(flyScale,{toValue:0.72,duration:270,easing:Easing.out(Easing.quad),useNativeDriver:true}),
      Animated.timing(flyRotate,{toValue:155,duration:270,easing:Easing.out(Easing.quad),useNativeDriver:true})
     ]),
     Animated.parallel([
      Animated.timing(flyX,{toValue:endX,duration:290,easing:Easing.in(Easing.cubic),useNativeDriver:true}),
      Animated.timing(flyY,{toValue:endY,duration:290,easing:Easing.in(Easing.cubic),useNativeDriver:true}),
      Animated.timing(flyScale,{toValue:0.24,duration:290,easing:Easing.in(Easing.cubic),useNativeDriver:true}),
      Animated.timing(flyRotate,{toValue:360,duration:290,easing:Easing.in(Easing.cubic),useNativeDriver:true}),
      Animated.timing(flyOpacity,{toValue:0,duration:250,delay:40,useNativeDriver:true})
     ])
    ]).start(()=>{
     Animated.parallel([
      Animated.sequence([
       Animated.spring(basketScale,{toValue:1.2,speed:28,bounciness:13,useNativeDriver:true}),
       Animated.spring(basketScale,{toValue:1,speed:24,bounciness:9,useNativeDriver:true})
      ]),
      Animated.sequence([
       Animated.timing(ringOpacity,{toValue:0.75,duration:1,useNativeDriver:true}),
       Animated.parallel([
        Animated.timing(ringScale,{toValue:2.15,duration:440,easing:Easing.out(Easing.quad),useNativeDriver:true}),
        Animated.timing(ringOpacity,{toValue:0,duration:440,easing:Easing.out(Easing.quad),useNativeDriver:true})
       ])
      ])
     ]).start(()=>resolve());
    });
   },()=>resolve());
  },()=>resolve());
 });

 const submit=async()=>{
  if(isAnimating)return;
  if(!description.trim()||!pickup.trim()){
   Alert.alert('Add task details','Please add a short description and pickup/address location before continuing.');
   return;
  }
  if(schedule==='later'&&!scheduleText.trim()){
   Alert.alert('Choose a schedule','Please add your preferred date and time.');
   return;
  }
  setIsAnimating(true);
  await animateServiceIntoBasket();
  createBooking({
   customerName:user?.name??'Demo Customer',
   customerEmail:user?.email??'customer@quickassist.demo',
   category,serviceTitle:service.title,description,
   pickupAddress:pickup,dropoffAddress:dropoff||pickup,
   scheduledFor:schedule==='now'?'As soon as possible':scheduleText,
   distanceKm:Number(distance)||0,estimatedMinutes:Number(minutes)||30,
   quote:breakdown.total,urgency:priority?'priority':'standard'
  });
  setIsAnimating(false);
  setConfirmed(true);
 };

 if(confirmed)return <Panel style={styles.success}>
  <Text style={styles.successIcon}>✓</Text>
  <Text style={styles.successTitle}>Request created!</Text>
  <Text style={styles.successCopy}>Your demo booking has been added to the shared task board. Switch to Helper to accept it, or Admin to manage it.</Text>
  <ActionButton label="View my bookings" onPress={onDone}/>
 </Panel>;

 return <View ref={rootRef} style={styles.screen}>
  <PageHeading eyebrow="NEW TASK REQUEST" title="Tell us what needs doing" description="Complete these details to receive an indicative quote. The task is only created when you confirm below."/>
  <Panel>
   <Text style={styles.section}>1. Select a service</Text>
   <View style={styles.categories}>
    {services.map(item=><Pressable key={item.category} onPress={()=>setCategory(item.category)} style={[styles.category,category===item.category&&styles.categoryActive]}>
     <Text style={[styles.categoryText,category===item.category&&styles.categoryTextActive]}>{item.shortTitle}</Text>
    </Pressable>)}
   </View>
   <Text style={styles.fieldLabel}>Describe the task *</Text>
   <TextInput multiline value={description} onChangeText={setDescription} placeholder="Example: Pick up 5 grocery items from my preferred store..." placeholderTextColor="#9FB3C8" style={[styles.input,styles.multiline]}/>
   <Text style={styles.fieldLabel}>Pickup / task location *</Text>
   <TextInput value={pickup} onChangeText={setPickup} placeholder="Area, street or full address" placeholderTextColor="#9FB3C8" style={styles.input}/>
   <Text style={styles.fieldLabel}>Drop location (if applicable)</Text>
   <TextInput value={dropoff} onChangeText={setDropoff} placeholder="Destination address" placeholderTextColor="#9FB3C8" style={styles.input}/>
   <View style={styles.two}>
    <View style={styles.half}><Text style={styles.fieldLabel}>Distance (km)</Text><TextInput value={distance} onChangeText={setDistance} keyboardType="decimal-pad" style={styles.input}/></View>
    <View style={styles.half}><Text style={styles.fieldLabel}>Estimated time (min)</Text><TextInput value={minutes} onChangeText={setMinutes} keyboardType="number-pad" style={styles.input}/></View>
   </View>
   {category==='grocery'||category==='shopping'?<><Text style={styles.fieldLabel}>Number of items</Text><TextInput value={items} onChangeText={setItems} keyboardType="number-pad" style={styles.input}/></>:null}
   <Text style={styles.section}>2. Choose timing</Text>
   <View style={styles.two}>
    <Pressable onPress={()=>setSchedule('now')} style={[styles.schedule,schedule==='now'&&styles.scheduleActive]}><Text style={styles.scheduleTitle}>⚡ Book now</Text><Text style={styles.scheduleCopy}>As soon as possible</Text></Pressable>
    <Pressable onPress={()=>setSchedule('later')} style={[styles.schedule,schedule==='later'&&styles.scheduleActive]}><Text style={styles.scheduleTitle}>▦ Schedule later</Text><Text style={styles.scheduleCopy}>Choose a preferred time</Text></Pressable>
   </View>
   {schedule==='later'?<TextInput value={scheduleText} onChangeText={setScheduleText} placeholder="e.g. 20 Nov, 4:30 PM" style={styles.input}/>:null}
   <View style={styles.priorityRow}>
    <View style={{flex:1}}><Text style={styles.fieldLabel}>Priority request</Text><Text style={styles.small}>Faster matching request; subject to availability.</Text></View>
    <Switch value={priority} onValueChange={setPriority} trackColor={{true:'#0F766E',false:'#DCE5EA'}}/>
   </View>
  </Panel>

  <Panel>
   <View style={styles.quoteHeading}>
    <Text style={styles.section}>3. Your estimated price</Text>
    <View ref={sourceRef} collapsable={false} style={styles.serviceGlyph}><Text style={styles.serviceGlyphText}>{SERVICE_GLYPHS[category]}</Text></View>
   </View>
   <View style={styles.priceLine}><Text style={styles.priceLabel}>Task base charge</Text><Text style={styles.priceValue}>₹{breakdown.base}</Text></View>
   {breakdown.distance>0?<View style={styles.priceLine}><Text style={styles.priceLabel}>Distance adjustment</Text><Text style={styles.priceValue}>₹{breakdown.distance}</Text></View>:null}
   {breakdown.time>0?<View style={styles.priceLine}><Text style={styles.priceLabel}>Additional time</Text><Text style={styles.priceValue}>₹{breakdown.time}</Text></View>:null}
   {breakdown.items>0?<View style={styles.priceLine}><Text style={styles.priceLabel}>Additional items</Text><Text style={styles.priceValue}>₹{breakdown.items}</Text></View>:null}
   {breakdown.priority>0?<View style={styles.priceLine}><Text style={styles.priceLabel}>Priority request</Text><Text style={styles.priceValue}>₹{breakdown.priority}</Text></View>:null}
   <View style={styles.totalLine}><Text style={styles.totalLabel}>Estimated service total</Text><Text style={styles.totalValue}>₹{breakdown.total}</Text></View>
   <Text style={styles.small}>The displayed service price includes platform operations charges. Product purchases, where applicable, are separate. Final quote must be approved before the task is accepted.</Text>
  </Panel>

  <View style={styles.actions}>
   <View style={{flex:1}}><ActionButton label="Back" onPress={onCancel} secondary disabled={isAnimating}/></View>
   <View style={styles.confirmGroup}>
    <Animated.View ref={basketRef} collapsable={false} style={[styles.basketTarget,{transform:[{scale:basketScale}]}]}>
     <Animated.View pointerEvents="none" style={[styles.ripple,{opacity:ringOpacity,transform:[{scale:ringScale}]}]}/>
     <Text style={styles.basketIcon}>🧺</Text>
     <View style={styles.basketBadge}><Text style={styles.basketBadgeText}>{bookingCount}</Text></View>
    </Animated.View>
    <Pressable disabled={isAnimating} onPress={submit} style={({pressed})=>[styles.confirmButton,(pressed||isAnimating)&&styles.confirmPressed]}>
     <Text style={styles.confirmText}>{isAnimating?'Adding task…':'Confirm task request →'}</Text>
    </Pressable>
   </View>
  </View>

  {/* A temporary native Animated overlay follows the same service-to-basket flight on web and mobile. */}
  <Animated.View pointerEvents="none" style={[styles.flyingIcon,{
   opacity:flyOpacity,
   transform:[
    {translateX:flyX},{translateY:flyY},{scale:flyScale},
    {rotate:flyRotate.interpolate({inputRange:[0,360],outputRange:['0deg','360deg']})}
   ]
  }]}>
   <Text style={styles.flyingGlyph}>{SERVICE_GLYPHS[category]}</Text>
  </Animated.View>
 </View>;
}

const styles=StyleSheet.create({
 screen:{position:'relative'},
 section:{fontSize:13,color:'#102A43',fontWeight:'900',marginBottom:12},
 categories:{flexDirection:'row',flexWrap:'wrap',gap:7,marginBottom:15},
 category:{paddingHorizontal:10,paddingVertical:8,borderRadius:8,borderWidth:1,borderColor:'#E1E9ED'},
 categoryActive:{backgroundColor:'#E8F5F1',borderColor:'#0F766E'},
 categoryText:{fontSize:9,color:'#52606D',fontWeight:'800'},
 categoryTextActive:{color:'#0F766E'},
 fieldLabel:{fontSize:10,color:'#52606D',fontWeight:'800',marginTop:11,marginBottom:5},
 input:{minHeight:41,borderWidth:1,borderColor:'#DDE6EA',borderRadius:9,paddingHorizontal:11,color:'#102A43',fontSize:11,backgroundColor:'#FBFDFD'},
 multiline:{minHeight:78,textAlignVertical:'top',paddingTop:10},
 two:{flexDirection:'row',gap:10,marginTop:5},
 half:{flex:1},
 schedule:{flex:1,padding:12,borderWidth:1,borderColor:'#E2EAEE',borderRadius:10},
 scheduleActive:{borderColor:'#0F766E',backgroundColor:'#EFF8F6'},
 scheduleTitle:{color:'#102A43',fontSize:10,fontWeight:'900'},
 scheduleCopy:{color:'#829AB1',fontSize:9,marginTop:4},
 priorityRow:{flexDirection:'row',alignItems:'center',marginTop:17,borderTopWidth:1,borderTopColor:'#EDF1F3',paddingTop:10},
 small:{color:'#829AB1',fontSize:9,lineHeight:14,marginTop:6},
 quoteHeading:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
 serviceGlyph:{width:48,height:48,borderRadius:13,backgroundColor:'#E8F5F1',alignItems:'center',justifyContent:'center',marginBottom:10},
 serviceGlyphText:{fontSize:25},
 priceLine:{flexDirection:'row',justifyContent:'space-between',paddingVertical:7},
 priceLabel:{color:'#627D98',fontSize:10},
 priceValue:{color:'#334E68',fontSize:10,fontWeight:'800'},
 totalLine:{flexDirection:'row',justifyContent:'space-between',paddingTop:12,marginTop:5,borderTopWidth:1,borderTopColor:'#E8EFF1'},
 totalLabel:{color:'#102A43',fontSize:12,fontWeight:'900'},
 totalValue:{color:'#0F766E',fontSize:21,fontWeight:'900'},
 actions:{flexDirection:'row',alignItems:'center',gap:9,marginTop:2,flexWrap:'wrap'},
 confirmGroup:{flex:2,minWidth:235,flexDirection:'row',alignItems:'center',gap:9},
 basketTarget:{width:48,height:48,borderRadius:14,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#CFE8E0',alignItems:'center',justifyContent:'center'},
 basketIcon:{fontSize:22},
 basketBadge:{position:'absolute',right:-5,top:-6,minWidth:18,height:18,paddingHorizontal:4,borderRadius:9,backgroundColor:'#0F766E',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#FFFFFF'},
 basketBadgeText:{color:'#FFFFFF',fontSize:9,fontWeight:'900'},
 ripple:{position:'absolute',inset:0,borderRadius:14,borderWidth:1.5,borderColor:'#0F766E'},
 confirmButton:{flex:1,minHeight:48,paddingHorizontal:14,paddingVertical:12,borderRadius:10,backgroundColor:'#0F766E',alignItems:'center',justifyContent:'center'},
 confirmPressed:{opacity:0.78},
 confirmText:{color:'#FFFFFF',fontSize:10,fontWeight:'900',textAlign:'center'},
 flyingIcon:{position:'absolute',top:0,left:0,width:54,height:54,zIndex:1000,elevation:12,alignItems:'center',justifyContent:'center'},
 flyingGlyph:{fontSize:33},
 success:{alignItems:'center',padding:30},
 successIcon:{width:54,height:54,lineHeight:54,textAlign:'center',backgroundColor:'#EAF7EB',borderRadius:27,color:'#27803D',fontSize:28,fontWeight:'900'},
 successTitle:{color:'#102A43',fontSize:20,fontWeight:'900',marginTop:12},
 successCopy:{color:'#627D98',fontSize:12,lineHeight:19,textAlign:'center',marginVertical:12}
});
