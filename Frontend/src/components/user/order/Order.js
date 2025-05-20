import ListStation from "./ListStation";
import LoginLight from "../../../assets/images/loginLight.jpg";
import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";
import AuthService from "../../../services/auth.service";
import { getDistance } from "geolib";
function Order(){
    const [pointer,setPointer] = useState(
        {
            lat:-27.018113420677302,
            lng:-67.78490703081911
        }
    )
    const [stations,setStations] = useState([]);
   
    const getResposne = async () =>{
      try {
        await AuthService.getFuelStation().then(
          (response) => {
              console.log(response)
              setStations(response.data.stations)
  
          },
          (error) => {
            console.log(error.response.data.message);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(()=>{
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
          setPointer({
            lat : position.coords.latitude,
            lng : position.coords.longitude
          })
        });
      }
    },[])

    useEffect(()=>{
      console.log(pointer)
      getResposne()
    },[pointer])


    const renderedStations = stations ? stations.map((element) => {
      // Check if lat and lng are valid numbers before calling getDistance
      if (element.location && element.location.lat !== undefined && element.location.lng !== undefined) {
        const distance = getDistance(
          { latitude: element.location.lat, longitude: element.location.lng },
          { latitude: pointer.lat, longitude: pointer.lng }
        );
    
        // Ensure distance is a valid number
        const validDistance = !isNaN(distance) ? distance : 0;  // Set to 0 if distance is invalid
    
        // Convert distance to kilometers and handle undefined or null distances safely
        const distanceString = validDistance !== undefined && validDistance !== null 
          ? (parseInt(validDistance / 1000)).toString() 
          : 'Distance not available';
    
        // Create the station object with the computed distance
        const station = {
          ...element,
          distance: validDistance
        };
    
        // Render the ListStation component
        return <ListStation station={station} />;
      } else {
        // Log an error if lat or lng is undefined
        console.error('Latitude or Longitude is undefined for element:', element);
        return null; // Or you can return a default component for this case
      }
    }) : null;
    
    
    // const renderedStations = stations
    // ? stations.map((element) => {
    //     let { location } = element;
  
    //     // Add dummy coordinates if missing
    //     if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
    //       console.warn("Invalid station location data:", element);
    //       location = { lat: 0, lng: 0 }; // Dummy data
    //     }
  
    //     const distance = parseInt(
    //       getDistance(
    //         { latitude: location.lat, longitude: location.lng },
    //         { latitude: pointer.lat, longitude: pointer.lng }
    //       ) / 1000
    //     );
  
    //     const station = { ...element, distance };
  
    //     return <ListStation key={station._id} station={station} />;
    //   })
    // : null;
  

    
        return(
        <div
        className="w-screen h-screen flex flex-col justify-around items-center lg:md:flex-row"
        style={{
          backgroundImage: `linear-gradient(45deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0.75)),url(${LoginLight})`,
          backgroundPosition: `50% 50%`,
          backgroundSize: `cover`,
          backgroundRepeat: "no-repeat",
        }}
      >
      <div className="text-white p-3 text-center text-[54px] flex flex-row justify-center items-center gap-3  whitespace-break-spaces font-sans  lg:text-[96px] md:text-[74px] ">
            <h1>Orders</h1>
          </div>
      <div className="w-[100%] h-[100%] justify-center lg:w-[50%] items-center flex flex-row flex-wrap overflow-scroll">
        {renderedStations}
      </div>
      </div>
    )
}
export default Order;