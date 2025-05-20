import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";

export default function SimpleMap({pointer,setPointer,disable=false}){
  const getLocation = () =>{
    
    if (navigator.geolocation && !disable) {
      navigator.geolocation.watchPosition(function(position) {
        setPointer({
          lat : position.coords.latitude,
          lng : position.coords.longitude
        })
      });
    }
  }

  useEffect(()=>{
    console.log("AMAN DON");
    
      getLocation()
  },[disable])
  

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAH_Ef64PHRFg4To9Mgdn8U-78jAc_sfAU",
          language: "en",
          region: "US"
        }}
        center={pointer}
        zoom={10}
        onClick={!disable?(e)=>{
          setPointer({
            lat : e.lat,
            lng : e.lng
          })
        }:null}
      >
        <Marker
          lat={pointer.lat}
          lng={pointer.lng}
        />
      </GoogleMapReact>
    </div>
  );
}