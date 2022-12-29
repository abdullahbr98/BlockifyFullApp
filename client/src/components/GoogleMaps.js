import React, { Component, useState } from "react";
import { Icon, Box } from '@chakra-ui/react'
//IoLocationSharp
import { IoLocationSharp } from "react-icons/io5";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ()=>{return(<><Box position="absolute"></Box><Box position="relative" left="-23px" top="-45px"><Icon as={IoLocationSharp} color="red" h="50px" w="50px"/></Box></>);};
function GoogleMaps({ latitude, longitude, onChange }) {
    const [lati, setlati] = useState(parseFloat(latitude));
    const [longi, setlongi] = useState(parseFloat(longitude));
    const _onClick = ({x, y, lat, lng, event}) => {console.log(x, y, lat, lng, event); 
        setlati(lat);
        setlongi(lng);
        onChange(lat,lng);
    }
    return (
        <div style={{ height: "60vh", width: "40vw", cursor:"pointer" }}>
            <GoogleMapReact
                onClick={_onClick}
                bootstrapURLKeys={{
                    key: "",
                }}
                center={{ lat: lati, lng: longi }}
                //31.5160° N, 74.3429° E
                defaultZoom={14}
                // yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)} 
                onDragEnd={(map) => console.log("value")}
                yesIWantToUseGoogleMapApiInternals={true}
                
            >
                {/* <Marker position={{ lat: lati, lng: longi }}/> */}
                <AnyReactComponent
                    lat={lati}
                    lng={longi}
                    text="My Marker"
        />
            </GoogleMapReact>
        </div>
    );
}

export default GoogleMaps;