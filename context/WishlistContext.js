import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, []);

    async function loadWishlist (){
        try {
            const storedWishlist = await AsyncStorage.getItem('wishlist');
            if (storedWishlist) {
                setWishlist(JSON.parse(storedWishlist));
            }
        } catch (error) {
            console.error('Failed to load wishlist:', error);
        }
    };

    async function saveWishlist (newWishlist) {
        try {
            await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
        } catch (error) {
            console.error('Failed to save wishlist:', error);
        }
    };

    function addToWishlist(item) {
        const newWishlist = [...wishlist, { ...item, isFavorite: true}];
        setWishlist((prevWishlist) => [...prevWishlist, item]);
        saveWishlist(newWishlist);
    };

    function removeFromWishlist(locationId) {
        setWishlist((prevWishlist) => prevWishlist.filter(item => item.locationId !== locationId));
    }
    
    function isFavorite (locationId){
        return wishlist.some(item => item.locationId === locationId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isFavorite }}>
            {children}
        </WishlistContext.Provider>
    );
};
