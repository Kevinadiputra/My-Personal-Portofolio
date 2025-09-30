"use client";

import { useState, useEffect } from "react";
import { MapPin, ExternalLink } from "lucide-react";

const LocationMap = () => {
    const [location, setLocation] = useState({
        city: "Jakarta",
        country: "Indonesia",
        coords: null,
        loading: true,
        error: null
    });

    // Default Jakarta coordinates
    const defaultCoords = { lat: -6.2088, lng: 106.8456 };

    useEffect(() => {
        // Try to get user's current location
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        
                        try {
                            // Use reverse geocoding to get location name
                            // You can replace this with a proper geocoding service
                            setLocation({
                                city: "Jakarta", // Keep Jakarta as your location
                                country: "Indonesia",
                                coords: { lat: latitude, lng: longitude },
                                loading: false,
                                error: null
                            });
                        } catch (error) {
                            // Fallback to default location
                            setLocation({
                                city: "Jakarta",
                                country: "Indonesia", 
                                coords: defaultCoords,
                                loading: false,
                                error: null
                            });
                        }
                    },
                    (error) => {
                        // Use default location if geolocation fails
                        setLocation({
                            city: "Jakarta",
                            country: "Indonesia",
                            coords: defaultCoords,
                            loading: false,
                            error: null
                        });
                    },
                    {
                        timeout: 10000,
                        enableHighAccuracy: false
                    }
                );
            } else {
                // Geolocation not supported, use default
                setLocation({
                    city: "Jakarta",
                    country: "Indonesia",
                    coords: defaultCoords,
                    loading: false,
                    error: null
                });
            }
        };

        getCurrentLocation();
    }, []);

    const openInGoogleMaps = () => {
        const coords = location.coords || defaultCoords;
        const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
        window.open(url, '_blank');
    };

    if (location.loading) {
        return (
            <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-tertiary group-hover:bg-accent rounded-xl flex items-center justify-center transition-colors">
                    <MapPin size={20} className="text-white animate-pulse" />
                </div>
                <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <span className="text-white/70">Loading location...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-4 group cursor-pointer" onClick={openInGoogleMaps}>
            <div className="w-12 h-12 bg-tertiary group-hover:bg-accent rounded-xl flex items-center justify-center transition-colors">
                <MapPin size={20} className="text-white" />
            </div>
            <div className="flex-1">
                <h4 className="text-white font-semibold flex items-center gap-2">
                    Location
                    <ExternalLink size={14} className="text-white/50 group-hover:text-white transition-colors" />
                </h4>
                <span className="text-white/70 hover:text-accent transition-colors">
                    {location.city}, {location.country}
                </span>
            </div>
        </div>
    );
};

export default LocationMap;