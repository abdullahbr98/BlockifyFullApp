import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { Icon, Box, Text } from "@chakra-ui/react";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = () => {
    return (
        <>
            <Box position="absolute"></Box>
            <Box position="relative" left="-23px" top="-45px">
                <Icon as={IoLocation} color="blue" h="50px" w="50px" />
            </Box>
        </>
    );
};
// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(props) {
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    console.log("props of cordinates:", props.cordinates);

    useEffect(() => {
        if(props.cordinates){
        var myArray = props.cordinates.split(",", 2);
        setlatitude(parseFloat(myArray[0]));
        setlongitude(parseFloat(myArray[1]));
        console.log(latitude);
        console.log(longitude);
        }
    }, []);

    let defaultProps = {
        center: {
            lat: latitude,
            lng: longitude,
        },
        zoom: 14,
    };
    if (latitude != 0) {
        return (
            <div style={{ height: "60vh", width: "40vw", cursor: "pointer" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyBWbI__mwrOAas2KtVKlM1Dx_VH_WNVfjw",
                    }}
                    center={{ lat: latitude, lng: longitude }}
                    defaultZoom={14}
                >
                    <AnyReactComponent
                        lat={latitude}
                        lng={longitude}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
    else{
        return(
            <Text>Nothing to show</Text>
        )
    }
}
