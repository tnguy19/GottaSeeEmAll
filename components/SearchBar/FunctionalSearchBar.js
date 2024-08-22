import { View, TouchableOpacity, StyleSheet, FlatList, TextInput, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from './Button';
import HistoryTab from './HistoryTab';
import { useState } from 'react';
import SearchResults from './SearchResults';

export default function FunctionalSearchBar({ onPress, data }) {

    const [input, setInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    function handleSearch(input) {
        setInput(input);
        if (input) {
            const matches = data.filter(item =>
                item.name.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredData(matches);
        } else {
            setFilteredData([]);
        }
    }

    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBarContent}>
                        <View style={styles.placeholderContainer}>
                            <FontAwesome name="search" size={15} color="black" />
                            <TextInput
                                style={styles.text}
                                placeholder='Search Landmark'
                                value={input}
                                onChangeText={handleSearch}
                            />
                        </View>
                        <Button city='Boston' name='my-location' />
                    </View>
                </View>
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <SearchResults name={item.name} rating={item.rating} />}
                    />
                </View>

            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    searchBarContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    placeholderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'figtree-bold',
        color: '#36454F',
        marginLeft: 5,
        lineHeight: 20,
        fontSize: 18,
        paddingTop: 3
    },
    resultsContainer: {
        marginTop: 10,
        marginLeft: 5
    }
});