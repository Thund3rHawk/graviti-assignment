"use client";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import useMap  from "@/hooks/useMap";

const limeOptions = { color: "blue" };

// Fix for missing marker icons
// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const sourceIcon = L.icon({
  iconUrl: "../public/Source.png",
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [0, -41],
});

const destinationIcon = L.icon({
  iconUrl: "../public/Destination.png",
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [0, -41], 
});

const Map: React.FC = () => {
    const {setDistance, sourceCoords, destCoords} = useMap()
    const [route, setRoute] = useState<any>([sourceCoords, destCoords]);
    const [loading, setLoading] = useState(true);

  const sourcePoints = sourceCoords;
  const destinationPoints = destCoords;
  const raindropPositions: [number, number][] = [sourceCoords, destCoords];
console.log (sourcePoints, destinationPoints)

  useEffect(() => {
    async function getMapData() {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/routing?waypoints=${sourcePoints[0]},${sourcePoints[1]}|${destinationPoints[0]},${destinationPoints[1]}&mode=drive&details=route_details&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`,
        );

        const coordinates = response.data.features[0].geometry.coordinates;
        const polyline: [number, number][] = coordinates.map(
          (coord: [number, number]) => [coord[1], coord[0]],
        );

        setDistance(Math.round(response.data.features[0].properties.distance / 1000));
        setRoute(polyline);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching directions:", error);
        setLoading(false);
      }
    }
    getMapData();
  }, [sourcePoints, destinationPoints]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={[34.083658, 74.797368]}
      zoom={13}
      className="sm:h-[511px] sm:w-[560px] w-screen h-auto aspect-square"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
      />

      {raindropPositions.map((value) => (
        <Marker key={value.join(",")} position={value} />
      ))}
      <Polyline pathOptions={limeOptions} positions={route} />
    </MapContainer>
  );
};

export default Map;
