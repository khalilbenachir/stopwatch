/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment'




const DATA={
  timer:1234456,
  labs:[1234,5567,5367,85435]
};


const Timer=(props)=>{
  const duration=moment.duration(props.interval);
  const centimilliseconds=Math.floor(duration.milliseconds()/10);
  return <Text style={props.style}>{duration.minutes()}:{duration.seconds()},{centimilliseconds}</Text>
};

const ButtonRow=(props)=>{
  return <View style={styles.buttonRow}>{props.children}</View>
}

const RoundButton=(props)=>{

  return <View style={[styles.button,{backgroundColor:props.background}]}>
            <View style={styles.buttonBorder}>
                <Text style={[styles.buttonTitle,{color:props.color}]} >{props.title}</Text>
            </View>

        </View>
};


const Lap=(props)=>{
  const styleLab=[
    styles.lapText,
      props.fastest && styles.fastest,
      props.slowest && styles.slowest
  ]
  return <View style={styles.lap}>
    <Text style={styleLab}>Lap {props.number}</Text>
    <Timer style={styleLab} interval={props.interval}/>
  </View>
};

const LabpsTable=(props)=>{
  const finishedlaps=props.laps.slice(1);
  let min=0;
  let max=0;

  if(finishedlaps.length>=2){
    finishedlaps.forEach(lap=>{
      if(lap<min) min=lap;
      if(lap>max) max=lap;
    })
  }

  return(
      <ScrollView style={styles.scrollView}>
        {props.laps.map((lap,number)=>{
          return <Lap key={number} slowest={lap == min} number={props.laps.length-number} interval={lap}/>
        })}
      </ScrollView>)
}
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
       <Timer style={styles.timer} interval={DATA.timer}/>
        <ButtonRow>
          <RoundButton
              title='Reset'
              color="#FFF"
              background="#3D3D3D"
          />
          <RoundButton
              title='Start'
              color="#50d167"
              background="#1b361f"
          />
        </ButtonRow>
        <LabpsTable laps={DATA.labs}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop:120,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
    paddingHorizontal:20
  },

  timer:{
    color: '#fff',
    fontSize: 66,
    fontWeight: '200'

  },
  button:{
    width:80,
    height:80,
    borderRadius:40,
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonTitle:{
    fontSize:22,
  },
  buttonBorder:{
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth:2,
    alignItems:'center',
    justifyContent: 'center'
  },
  buttonRow:{
    flexDirection:'row',
    alignSelf:'stretch',
    justifyContent:"space-between",
    marginTop:90,
    marginBottom: 20

  },
  lapText:{
    color:'#fff',
    fontSize:22,
    padding:10,
    alignSelf:'flex-start'


  },
  lap:{
    flexDirection: 'row',
    justifyContent:"space-between",
    margin: 10,
    borderColor:'#151515',
    borderWidth: 1
  },
  scrollView:{
    alignSelf:'stretch',
    fontSize:12
  },
  fastest:{
    color:'#4bc05f'
  },
  slowest:{
    color:'#cc3531'
  }
});
