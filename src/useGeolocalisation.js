import React,{useState,useEffect} from 'react'
const useGeolocalisation = () => {
    // HNA STATE PAR DEFAULT KAYAKHUD F LOADED FALSE  u latitude u longitude kayakun Khawi
    const [location,setLocation] = useState({
        loaded:false,
        coordinates : {lat:"",lng:""}
    })
    // had fuction fash Kayw9e3 DEK Event 
    // fash katch3li Location katlu7i loaded=>True u lat: location.coords.latitude   lng: location.coords.longitude
    // 
    const onSuccces = location =>{
        setLocation({
            loaded: true,
            coordinates : {
                lat:location.coords.latitude,
                lng:location.coords.longitude,
        }})  
    }
    // Hna F error Katdawzi ldek Exepction tchufi chnu fiha
    const onError = error =>{
        setLocation({
             loaded:true,
            error}
           
        )
    }
// fash ikun Component f load ula kaytbadal state
        useEffect(()=>{
            // hna 3la wed Compabilité dial les navigator ila kan support dialha makhdmach
            if(!("geolocation" in navigator)){
                onError({
                    code:0,
                    message:"Geolocation Not support"
                })
               setLocation((state)=>({
                   ...state,
                   loaded: true,
                   error:{
                       code : 0,
                       message : "Geoloacalisation Not Support"
                   }
               }))
            }
            // hada huwa film lhindi fash kaykun nav fih geolocation jib liya CurrentPosition getCurrentPosition 
            // u ndawzu lih 2 params lawal dial sucess li dayaz fih dek location latitude longitude
            // u params 2 fash kayw9e3 error kayraja3 lik chnahuwa dek eror
            navigator.geolocation.getCurrentPosition(onSuccces,onError);
        },[])



    return location


}

export default useGeolocalisation
