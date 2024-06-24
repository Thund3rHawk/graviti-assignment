"use client";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Polyline } from "react-leaflet";
import axios from "axios";
import L, { LatLngExpression } from "leaflet";
import useMap from "@/hooks/useMap";

const limeOptions = { color: "blue" };

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// const sourceIcon = L.icon({
//   iconUrl: "../public/Source.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [0, -41],
// });

// const destinationIcon = L.icon({
//   iconUrl: "../public/Destination.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [0, -41],
// });

const Map: React.FC = () => {
  const { setDistance, sourceCoords, destCoords, driveMode } = useMap();
  const [route, setRoute] = useState<LatLngExpression[][]>([]);
  const [loading, setLoading] = useState(true);

  const sourcePoints = sourceCoords;
  const destinationPoints = destCoords;
  const raindropPositions: [number, number][] = [sourceCoords, destCoords];

  useEffect(() => {
    async function getMapData() {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/routing?waypoints=${sourcePoints[0]},${sourcePoints[1]}|${destinationPoints[0]},${destinationPoints[1]}&mode=${driveMode}&details=route_details&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`,
        );
        console.log (driveMode);
        const coordinates = response.data.features[0].geometry.coordinates[0];
        const polyline = coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
        setRoute(polyline);

        setDistance(
          Math.round(response.data.features[0].properties.distance / 1000),
        );
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching directions:", error);
        setLoading(false);
      }
    }
    getMapData();
  }, [sourcePoints, destinationPoints, driveMode]);


  if (loading) {
    return <div className="lg:h-[511px] lg:w-[560px] sm:h-[30px] sm:w-[30px] border border-black w-screen h-auto aspect-square" >Loading...</div>;
  }

 
  return (
    <MapContainer
      center={[34.083658, 74.797368]}
      zoom={5}
      className="2xl:h-[511px] 2xl:w-[560px] sm:w-[430px] lg:w-[400px] w-screen h-auto aspect-square"
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
