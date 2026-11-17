import React,{useState} from 'react';
import {View,Text,TextInput,Pressable,StyleSheet,useWindowDimensions} from 'react-native';
import type {AppRole} from '../../core/models/platform';
type Props={onLogin:(role:AppRole,name?:string,email?:string)=>void};
const roles:{key:AppRole;title:string;subtitle:string;icon:string}[]=[
 {key:'customer',title:'Customer',subtitle:'Book and track everyday tasks',icon:'🛍️'},
 {key:'helper',title:'Helper Partner',subtitle:'Accept tasks and manage earnings',icon:'🧢'},
 {key:'admin',title:'Administrator',subtitle:'Manage platform operations',icon:'🛠️'}
];
const demos:Record<AppRole,{name:string;email:string}>={customer:{name:'Demo Customer',email:'customer@quickassist.demo'},helper:{name:'Rahul Patil',email:'helper@quickassist.demo'},admin:{name:'Platform Admin',email:'admin@quickassist.demo'}};
export function RoleLoginScreen({onLogin}:Props):React.ReactElement{
 const [role,setRole]=useState<AppRole>('customer');
 const [name,setName]=useState('');const [email,setEmail]=useState('');const [password,setPassword]=useState('');
 const [error,setError]=useState('');const compact=useWindowDimensions().width<700;
 const continueDemo=()=>{setError('');const fallback=demos[role];onLogin(role,name||fallback.name,email||fallback.email);};
 const signIn=()=>{if(!email.includes('@')||password.trim().length<4){setError('Enter a valid email and at least 4 characters for the demo password.');return;}setError('');onLogin(role,name||demos[role].name,email);};
 return <View style={styles.page}>
  <View style={styles.top}><View style={styles.logo}><Text style={styles.logoText}>Q</Text></View><Text style={styles.brand}>QuickAssist</Text><Text style={styles.tag}>ONE PLATFORM · THREE WORKSPACES</Text></View>
  <View style={[styles.layout,compact&&styles.layoutMobile]}>
   <View style={styles.intro}><Text style={styles.kicker}>WELCOME TO QUICKASSIST</Text><Text style={styles.headline}>Your time matters.{"\n"}Let us handle the little things.</Text><Text style={styles.copy}>Book local help, complete tasks as a partner, or manage the platform — all from one connected demo app.</Text><View style={styles.trust}><Text style={styles.trustText}>✓ Task-based pricing</Text><Text style={styles.trustText}>✓ Shared booking workflow</Text><Text style={styles.trustText}>✓ Designed for mobile and web</Text></View></View>
   <View style={styles.card}>
    <Text style={styles.cardTitle}>Sign in to continue</Text><Text style={styles.cardSub}>Choose which workspace you want to explore.</Text>
    <View style={styles.roles}>{roles.map(item=><Pressable key={item.key} onPress={()=>{setRole(item.key);setError('');}} style={[styles.roleCard,role===item.key&&styles.roleActive]}><Text style={styles.roleIcon}>{item.icon}</Text><View style={styles.roleTextWrap}><Text style={[styles.roleTitle,role===item.key&&styles.roleTitleActive]}>{item.title}</Text><Text style={styles.roleSub}>{item.subtitle}</Text></View><Text style={styles.radio}>{role===item.key?'●':'○'}</Text></Pressable>)}</View>
    <Text style={styles.label}>Name (optional)</Text><TextInput value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#9FB3C8" style={styles.input}/>
    <Text style={styles.label}>Email</Text><TextInput value={email} onChangeText={setEmail} placeholder={demos[role].email} placeholderTextColor="#9FB3C8" autoCapitalize="none" keyboardType="email-address" style={styles.input}/>
    <Text style={styles.label}>Password (demo only)</Text><TextInput value={password} onChangeText={setPassword} placeholder="Any 4+ characters for demo" placeholderTextColor="#9FB3C8" secureTextEntry style={styles.input}/>
    {error?<Text style={styles.error}>{error}</Text>:null}
    <Pressable onPress={signIn} style={styles.primary}><Text style={styles.primaryText}>Continue to {role==='admin'?'Admin':role==='helper'?'Helper':'Customer'} workspace →</Text></Pressable>
    <Pressable onPress={continueDemo} style={styles.demo}><Text style={styles.demoText}>Quick demo access · no credentials needed</Text></Pressable>
    <Text style={styles.note}>Demo build: sign-in is simulated locally. Real OTP, password authentication and role permissions require a secured backend before public launch.</Text>
   </View>
  </View>
  <Text style={styles.footer}>© 2026 QuickAssist · Preview environment</Text>
 </View>;
}
const styles=StyleSheet.create({
 page:{flex:1,minHeight:'100%',backgroundColor:'#F4F7F8',paddingHorizontal:24,paddingTop:25,paddingBottom:20},
 top:{alignItems:'center',gap:5},logo:{width:46,height:46,borderRadius:15,backgroundColor:'#0F766E',alignItems:'center',justifyContent:'center'},logoText:{color:'#FFFFFF',fontSize:26,fontWeight:'900'},brand:{color:'#102A43',fontSize:23,fontWeight:'900'},tag:{color:'#829AB1',fontSize:8,fontWeight:'900',letterSpacing:1.4},
 layout:{width:'100%',maxWidth:1120,alignSelf:'center',flex:1,flexDirection:'row',alignItems:'center',gap:55,paddingVertical:35},layoutMobile:{flexDirection:'column',gap:24,alignItems:'stretch'},
 intro:{flex:1},kicker:{color:'#0F766E',fontSize:10,fontWeight:'900',letterSpacing:1.6,marginBottom:12},headline:{color:'#102A43',fontSize:42,lineHeight:49,fontWeight:'900',letterSpacing:-1.3},copy:{color:'#627D98',fontSize:14,lineHeight:23,maxWidth:440,marginTop:17},trust:{gap:10,marginTop:27},trustText:{color:'#486581',fontSize:12,fontWeight:'700'},
 card:{width:compact? '100%':470,maxWidth:'100%',backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E5ECEF',borderRadius:22,padding:23,shadowColor:'#102A43',shadowOpacity:0.07,shadowRadius:20,elevation:3},cardTitle:{color:'#102A43',fontSize:23,fontWeight:'900'},cardSub:{color:'#829AB1',fontSize:11,lineHeight:17,marginTop:5,marginBottom:17},
 roles:{gap:8,marginBottom:15},roleCard:{flexDirection:'row',alignItems:'center',gap:10,padding:11,borderWidth:1,borderColor:'#E6EDF0',borderRadius:12,backgroundColor:'#FFFFFF'},roleActive:{borderColor:'#0F766E',backgroundColor:'#EFF8F6'},roleIcon:{fontSize:23},roleTextWrap:{flex:1},roleTitle:{color:'#334E68',fontSize:12,fontWeight:'900'},roleTitleActive:{color:'#0F766E'},roleSub:{color:'#829AB1',fontSize:9,marginTop:2},radio:{color:'#0F766E',fontSize:16,fontWeight:'900'},
 label:{color:'#52606D',fontSize:10,fontWeight:'800',marginBottom:5,marginTop:7},input:{height:42,borderWidth:1,borderColor:'#DCE5EA',borderRadius:9,paddingHorizontal:12,color:'#102A43',fontSize:12,backgroundColor:'#FBFDFD'},error:{color:'#B42318',fontSize:10,marginTop:8},
 primary:{backgroundColor:'#0F766E',paddingVertical:13,borderRadius:10,alignItems:'center',marginTop:16},primaryText:{color:'#FFFFFF',fontWeight:'900',fontSize:11},demo:{paddingVertical:11,alignItems:'center'},demoText:{color:'#0F766E',fontSize:10,fontWeight:'900'},note:{color:'#9FB3C8',fontSize:9,lineHeight:14,marginTop:5,textAlign:'center'},footer:{color:'#9FB3C8',fontSize:9,textAlign:'center'}
});
