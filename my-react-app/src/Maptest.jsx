import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./animate_marker.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Tooltip,
} from "react-leaflet";
import "./Maptest.css";
import { icon, Icon, marker } from "leaflet";
import "leaflet.locatecontrol"; // Import plugin
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; // Import styles
import L from "leaflet"; // Import L from leaflet to start using the plugin
import { LocateControl } from "leaflet.locatecontrol";

import Sidebar from "./sidebar";
import SearchModal from "./SearchModal";
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  ChakraProvider,
  extendTheme,
  useToast,
} from "@chakra-ui/react";


const theme = extendTheme({
  styles: {
    global: {
      ".leaflet-container": {
        height: "100%",
        width: "100%",
        zIndex: 1,
      },
      ".mapArea": {
        position: "relative",
        height: "100vh",
        width: "100%",
      },
      ".animated-marker::before": {
        content: '""',
        position: "absolute",
        width: "20px",
        height: "20px",
        background: "rgba(59, 130, 246, 0.5)",
        borderRadius: "50%",
        animation: "pulse 1.5s infinite",
      },
      "@keyframes pulse": {
        "0%": {
          transform: "scale(0.5)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2)",
          opacity: 0,
        },
      },
    },
  },
});

let lat, lon;
let user_latitude;
let user_longitude;
let newLat = [];
let newLon = [];
let location_data = [];

function MarkerLocate() {
  const map = useMap();

  useEffect(() => {
    const locator = new LocateControl(
      {
        position: "topright",
        flyTo: true,
        icon: "fa fa-compass",
        showPopup: true,
        strings: {
          title: "Locate Me",
          popup: `you are here!`,
        },
      },
      []
    );

    locator.addTo(map);

    map.on("locationfound", (e) => {
      user_latitude = e.latlng.lat;
      user_latitude = parseFloat(user_latitude);
      user_longitude = e.latlng.lng;
      user_longitude = parseFloat(user_longitude);
      console.log(user_latitude, user_longitude);
    });
  }, []);

  return null;
}

function MapTest() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState("");
  const [radius, setRadius] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [marker, setMarker] = useState([
    {
      geocode: [26.87949, 75.781158],
      popUp: "general",
      type: "general",
    },
    {
      geocode: [26.89949, 75.781158],
      popUp: "market",
      type: "market",
    },
    {
      geocode: [26.88949, 75.79998],
      popUp: "food",
      type: "restaurant",
    },
    {
      geocode: [26.88949, 75.793158],
      popUp: "hospital",
      type: "hospital",
    },
  ]);
  const toast = useToast();

  async function location_api(filter, radius) {

    // const api_key = process.env.REACT_APP_API_KEY;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_API_KEY,
      },
    };

    if (!user_latitude && !user_longitude) {
      toast({
        title: "Please enable your location",
        description: "click on the compass dial on the top right corner",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else{

      try {
        const response = await fetch(
          `https://api.foursquare.com/v3/places/search?query=${filter}&ll=${user_latitude}%2C${user_longitude}&radius=${
            radius * 1000
          }`,
          options
        );
        const data = await response.json();
        console.log(data);
  
        const newMarkers = data.results.map((result) => ({
          geocode: [
            result.geocodes.main.latitude,
            result.geocodes.main.longitude,
          ],
          popUp: "api marker",
          type: `${filter}`,
        }));
  
        location_data = data.results.map((result) => ({
          place_name: result.name,
          place_prefix: result.categories[0].icon.prefix,
          place_suffix: result.categories[0].icon.suffix,
          place_address: result.location.formatted_address,
          lat: result.geocodes.main.latitude,
          lon: result.geocodes.main.longitude,
        }));
  
        console.log(lat, lon);
  
        setMarker((prevMarkers) => [...newMarkers]);
        toast({
          title: "Search Success",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Failed to Search",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        // console.log(error);
      }
    }

  }

  const restaurant = new Icon({
    iconUrl:
      "https://www.reshot.com/preview-assets/icons/LEWQ9X8VAM/hard-hat-LEWQ9X8VAM.svg",
    iconSize: [38, 38],
  });

  const market = new Icon({
    iconUrl:
      "https://www.reshot.com/preview-assets/icons/EJRG9Y783T/shopping-cart-EJRG9Y783T.svg",
    iconSize: [38, 38],
  });

  const hospital = new Icon({
    iconUrl:
      "https://www.reshot.com/preview-assets/icons/9UD76CBTKM/hospital-9UD76CBTKM.svg",
    iconSize: [38, 38],
  });

  const general = new Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=SW3XuuLGhOrk&format=png&color=000000",
    iconSize: [38, 38],
  });

  const gym = new Icon({
    iconUrl:
      "https://www.reshot.com/preview-assets/icons/H6GZ3KLYPM/gym-weights-H6GZ3KLYPM.svg",
    iconSize: [38, 38],
  });

  const cafe = new Icon({
    iconUrl:
      "https://www.reshot.com/preview-assets/icons/T8Q5CVRD3W/coffee-T8Q5CVRD3W.svg",
    iconSize: [38, 38],
  });

  const hotel = new Icon({
    iconUrl:
      "https://www.reshot.com/preview-assets/icons/3EX67A84JL/house-building-3EX67A84JL.svg",
    iconSize: [38, 38],
  });

  const bank = new Icon({
    iconUrl:
      "https://www.reshot.com/preview-assets/icons/HDJ96NVATM/bank-HDJ96NVATM.svg",
    iconSize: [38, 38],
  });

  function getIconbyType(type) {
    switch (type) {
      case "market":
        return market;
      case "general":
        return general;
      case "restaurant":
        return restaurant;
      case "hospital":
        return hospital;
      case "gym":
        return gym;
      case "cafe":
        return cafe;
      case "hotel":
        return hotel;
      case "bank":
        return bank;
      default:
        return general;
    }
  }

  const customIcons = [restaurant, market, hospital, general];

  const locationIcon = new Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=30598&format=png&color=000000",
    iconSize: [38, 38],
  });

  return (
    <ChakraProvider theme={theme}>
      <Box className="mapArea">
        <Box
          position="absolute"
          top="4"
          left="4"
          zIndex="overlay"
          bg="white"
          p="4"
          borderRadius="md"
          boxShadow="md"
          width={["90%", "300px"]}
          maxWidth="300px"
        >
          <SearchModal
            filter={filter}
            setFilter={setFilter}
            radius={radius}
            setRadius={setRadius}
            handlerFunction={() => location_api(filter, radius)}
          >
            <Button colorScheme="blue" size="md" width="full">
              Search
            </Button>
          </SearchModal>
        </Box>

        <MapContainer
          center={[26.87949, 75.781158]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {marker
            .filter((marker) => (filter ? marker.type === filter : true))
            .map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                icon={getIconbyType(marker.type)}
                eventHandlers={{
                  click: () => {
                    const place_details = location_data.find(
                      (data) =>
                        data.lat === marker.geocode[0] &&
                        data.lon === marker.geocode[1]
                    );

                    if (place_details) {
                      setSelectedPlace({
                        name: place_details.place_name,
                        prefix:place_details.place_prefix,
                        suffix:place_details.place_suffix,
                        image: `https://img.freepik.com/free-vector/mandala-pattern-design-white-background_1308-43563.jpg?t=st=1734804430~exp=1734808030~hmac=2cdb83ccd3f6882ba2bdd403ad7bc617bc788c715d429ced2b5de9ba5adfb8c6&w=826`,
                        address: place_details.place_address,
                        lat: place_details.lat,
                        lon: place_details.lon,
                      });

                      // console.log(selectedPlace);
                      onOpen();
                    }
                  },
                }}
              >
                <Box className="animated-marker"></Box>
              </Marker>
            ))}

          <MarkerLocate />
        </MapContainer>

        <Sidebar
          place={selectedPlace}
          closeFunc={() => setSelectedPlace(null)}
          isOpen={isOpen}
          onClose={onClose}
          user_latitude={user_latitude}
          user_longitude={user_longitude}
        />
      </Box>
    </ChakraProvider>
  );
}

export default MapTest;
