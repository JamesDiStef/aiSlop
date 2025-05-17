import React, { useEffect, useState } from "react";

interface Place {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
}

const GoogleMapsTable = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=REPLACE_WITH_YOUR_VALID_API_KEY&libraries=places`;
      script.async = true;
      script.onload = () => initPlacesService();
      script.onerror = () => setError("Failed to load Google Maps API");
      document.body.appendChild(script);
    };

    const initPlacesService = () => {
      const service = new google.maps.places.PlacesService(document.createElement("div"));
      const request = {
        location: new google.maps.LatLng(37.7749, -122.4194),
        radius: 1500,
        type: "restaurant",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results.map((place) => ({
            place_id: place.place_id,
            name: place.name,
            vicinity: place.vicinity,
            rating: place.rating,
          })));
        } else {
          setError("Failed to fetch places: " + status);
        }
        setIsLoading(false);
      });
    };

    loadGoogleMapsAPI();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table className="table-auto border-collapse border border-gray-400">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Address</th>
          <th className="border border-gray-300 px-4 py-2">Rating</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place) => (
          <tr key={place.place_id}>
            <td className="border border-gray-300 px-4 py-2">{place.name}</td>
            <td className="border border-gray-300 px-4 py-2">{place.vicinity}</td>
            <td className="border border-gray-300 px-4 py-2">{place.rating || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GoogleMapsTable;