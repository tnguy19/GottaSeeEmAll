import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        async function loadWishlist() {
            try {
                const savedFavorites = await AsyncStorage.getItem('favorites');
                if (savedFavorites) {
                    setWishlist(JSON.parse(savedFavorites));
                }
            } catch (error) {
                console.error('Error loading wishlist:', error);
            }
        }

        loadWishlist();
    }, []);

    async function addToWishlist (item) {
        try {
            setWishlist(prevWishlist => {
                const updatedWishlist = [...prevWishlist];
                const index = updatedWishlist.findIndex(fav => fav.locationId === item.locationId);
                if (index === -1) {
                    updatedWishlist.push(item);
                }
                return updatedWishlist;
            });
            await AsyncStorage.setItem('favorites', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    async function removeFromWishlist (locationId) {
        try {
            setWishlist(prevWishlist => {
                const updatedWishlist = prevWishlist.filter(fav => fav.locationId !== locationId);
                return updatedWishlist;
            });
            await AsyncStorage.setItem('favorites', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
