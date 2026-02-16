"use client";

import { CustomBadge } from "@/components/CustomBadge/CustomBadge";
import { TDeliveryPartner } from "@/types/delivery-partner.type";
import { formatDateTime } from "@/utils/formatter";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

interface Props {
  selectedPartner?: TDeliveryPartner | null;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const DEFAULT_CENTER = {
  lat: 20.5937,
  lng: 78.9629,
};

const TrackingMapView = ({ selectedPartner }: Props) => {
  //   const socketRef = useRef<any>(null);
  const location = useMemo(() => {
    if (!selectedPartner?.currentSessionLocation?.coordinates) {
      return null;
    }

    const [lng, lat] = selectedPartner.currentSessionLocation.coordinates;

    return {
      lat,
      lng,
      updatedAt: selectedPartner.updatedAt,
    };
  }, [selectedPartner]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  /**
    /*
    useEffect(() => {
      if (!token) return;
  
      const socket = getSocket(token);
      socketRef.current = socket;
  
      socket.on("driver-location-update", (data: any) => {
        if (!selectedPartner) return;
  
        if (data.driverId === selectedPartner._id) {
          // This WILL use setState later when socket is enabled
        }
      });
  
      return () => {
        socket.off("driver-location-update");
      };
    }, [selectedPartner?._id, token]);
    */

  const mapCenter = useMemo(() => {
    return location ? { lat: location.lat, lng: location.lng } : DEFAULT_CENTER;
  }, [location]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={location ? 15 : 5}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: true,
        }}
      >
        {location && (
          <>
            <Marker position={{ lat: location.lat, lng: location.lng }} />

            <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 w-64">
              <div className="flex flex-row justify-between items-center">
                <h3 className="font-semibold text-sm">
                  {selectedPartner?.name?.firstName}{" "}
                  {selectedPartner?.name?.lastName}
                </h3>
                <CustomBadge
                  variant={
                    selectedPartner?.operationalData?.currentStatus ===
                    "ON_DELIVERY"
                      ? "success"
                      : "secondary"
                  }
                >
                  {selectedPartner?.operationalData?.currentStatus}
                </CustomBadge>
              </div>

              <p className="text-xs text-gray-600 mt-1">
                Lat: {location.lat.toFixed(6)}
              </p>
              <p className="text-xs text-gray-600">
                Lng: {location.lng.toFixed(6)}
              </p>

              {location.updatedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Updated: {formatDateTime(location.updatedAt)}
                </p>
              )}
            </div>
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default TrackingMapView;
