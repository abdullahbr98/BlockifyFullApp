import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class GoogleMaps extends Component {
    loadMap = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: 31.5160, lng: 74.3429 },
            map,
            draggable: true,
        });
    };
    render() {
        return (
            <div style={{ height: "60vh", width: "40vw" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "AIzaSyCJikCEsC6sImWdw2Q97SWsS7145s-TtLo",
                    }}
                    defaultCenter={{ lat: 31.5160, lng: 74.3429 }}
                    //31.5160° N, 74.3429° E
                    defaultZoom={14}
                    // yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>
                        this.loadMap(map, maps)
                    }
                    onDragEnd={(map) => console.log(map)}
                />
            </div>
        );
    }
}

export default GoogleMaps;
