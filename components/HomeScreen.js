import { View, Text, Button, FlatList, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { loadData, saveData } from './Storage';

export default function HomeScreen({navigation}) {
    const [data,setdata] = useState("");
  useEffect(()=>{
     imagesdata();
  }
    ,[])
 const imagesdata = async ()=>{
    const response = await fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s");
    const images = await response.json();
    console.log(images.photos.photo)
    setdata(images.photos.photo)
 }
 saveData("1",data)
 const data2 = loadData("1",data)
 
  return (
    <SafeAreaView style={{ flex:1,flexDirection:"column", alignItems: 'center', justifyContent: 'center' }}>
        {
            data===""?(<FlatList
                numColumns={3}
         data={data2}
         renderItem={({item}) => <Image  style={{width:110,height:120,margin:2,borderRadius:15}} src={item.url_s}/>}
         keyExtractor={(item) => item.id}
        />):(<FlatList
            numColumns={3}
     data={data}
     renderItem={({item}) => <Image  style={{width:110,height:120,margin:2,borderRadius:15}} src={item.url_s}/>}
     keyExtractor={(item) => item.id}
    />)
        }
        {/* <FlatList
        numColumns={3}
 data={data}
 renderItem={({item}) => <Image  style={{width:110,height:120,margin:2,borderRadius:15}} src={item.url_s}/>}
 keyExtractor={(item) => item.id}
/> */}
       
    </SafeAreaView>
  )
}


