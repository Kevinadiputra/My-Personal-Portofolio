"use client";

import { useState, useEffect } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { 
    GlowingStarsBackgroundCard, 
    GlowingStarsTitle, 
    GlowingStarsDescription 
} from "react-bits";

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
            <motion.div 
                className="flex items-center space-x-4 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="w-12 h-12 bg-tertiary group-hover:bg-accent rounded-xl flex items-center justify-center transition-colors"
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <MapPin size={20} className="text-white" />
                </motion.div>
                <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <span className="text-white/70">Loading location...</span>
                </div>
            </motion.div>
        );
    }

    return (
        <GlowingStarsBackgroundCard className="p-0 m-0 bg-transparent border-none">
            <motion.div 
                className="flex items-center space-x-4 group cursor-pointer" 
                onClick={openInGoogleMaps}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.div 
                    className="w-12 h-12 bg-tertiary group-hover:bg-accent rounded-xl flex items-center justify-center transition-colors relative overflow-hidden"
                    whileHover={{ 
                        boxShadow: "0 0 20px rgba(88, 16, 255, 0.5)",
                        rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        animate={{ 
                            y: [0, -2, 0],
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <MapPin size={20} className="text-white" />
                    </motion.div>
                    
                    {/* Glowing effect */}
                    <motion.div
                        className="absolute inset-0 bg-accent/20 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
                
                <div className="flex-1">
                    <GlowingStarsTitle className="text-white font-semibold flex items-center gap-2 text-base mb-1">
                        Location
                        <motion.div
                            animate={{ 
                                rotate: [0, 15, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <ExternalLink size={14} className="text-white/50 group-hover:text-accent transition-colors" />
                        </motion.div>
                    </GlowingStarsTitle>
                    
                    <GlowingStarsDescription className="text-white/70 hover:text-accent transition-colors text-sm">
                        {location.city}, {location.country}
                    </GlowingStarsDescription>
                </div>
            </motion.div>
        </GlowingStarsBackgroundCard>
    );
};

export default LocationMap;