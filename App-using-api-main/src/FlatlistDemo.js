import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
    StatusBar
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

export function FlatlistDemo({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const [oldData, setOldData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(0);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(response => {
                //console.log(response);
                setData(response);
                setOldData(response);
            });
    }, []);
    const searchFilterFunction = text => {
        // Check if searched text is not blank
        if (text !== '') {
            let tempData = data.filter(item => {
                return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(oldData);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor='black' style="auto" />
            <View style={{ marginTop: '8%', flexDirection: 'row', justifyContent: "space-evenly" }}>
                <TouchableOpacity style={{ height: 50, width: '50%', backgroundColor: '#00ffff', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                    }}
                >
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '600' }}>Available Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, width: 100, backgroundColor: '#7fffd4', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        navigation.navigate('MyPoducts')
                    }}
                >
                    <Text style={{ color: 'black', fontSize: 17, fontWeight: '600' }}>My Product</Text>
                </TouchableOpacity>
            </View>

































            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '10%',
                    justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        //width: '80%',
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.2,

                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 15,
                    }}>
                    <Image
                        source={require('../img/search.png')}
                        style={{ width: 24, height: 24, marginLeft: 15, opacity: 0.5 }}
                    />
                    <TextInput
                        ref={searchRef}
                        placeholder="search item here..."
                        style={{ width: '76%', height: 50 }}
                        value={search}
                        onChangeText={txt => {
                            searchFilterFunction(txt);
                            setSearch(txt);
                        }}
                    />
                    {search == '' ? null : (
                        <TouchableOpacity
                            style={{ marginRight: 13 }}
                            onPress={() => {
                                searchRef.current.clear();
                                searchFilterFunction('');
                                setSearch('');
                            }}>
                            <Image
                                source={require('../img/close.png')}
                                style={{ width: 16, height: 16, opacity: 0.5 }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    style={{
                        marginRight: 15,
                    }}
                    onPress={() => {
                        setVisible(true);
                    }}>
                    <Image
                        source={require('../img/filter.png')}
                        style={{ width: 27, height: 30 }}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width: '90%',

                                borderRadius: 10,
                                borderWidth: 0.5,
                                alignSelf: 'center',
                                marginTop: 20,
                                marginBottom: index == data.length - 1 ? 20 : 0,
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 60,
                                    height: '90%',
                                    marginLeft: 10,
                                    borderRadius: 10,
                                }}
                            />
                            <View style={{ width: '80%' }}>
                                <Text
                                    style={{ fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
                                    {item.title.substring(0, 30)}
                                </Text>
                                <Text style={{ fontSize: 12, margin: 10 }}>
                                    {item.description.substring(0, 50)}
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            marginLeft: 10,
                                            fontWeight: '800',
                                            color: 'green',
                                        }}>
                                        {'$ ' + item.price}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            marginLeft: 50,
                                            fontWeight: '800',
                                            color: 'orange',
                                        }}>
                                        {item.rating.rate}
                                    </Text>
                                    <Image
                                        source={require('../img/star.png')}
                                        style={{ width: 12, height: 12, marginLeft: 5 }}
                                    />
                                    <TouchableOpacity style={{ marginLeft: 20 }}
                                        onPress={() => {
                                            //navigation.navigate('')
                                        }}
                                    >
                                        <Image
                                            source={require('../img/star.png')}
                                            style={{ width: 12, height: 12, marginLeft: 5 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    );
                }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,.5)',
                    }}>
                    <View
                        style={{
                            width: '80%',
                            height: 200,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                        }}>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 0.5,
                                justifyContent: 'center',
                                paddingLeft: 20,
                            }}
                            onPress={() => {
                                setSelectedFilter(1);
                                const strAscending = data.sort((a, b) =>
                                    a.title > b.title ? 1 : -1,
                                );
                                setData(strAscending);
                                setVisible(false);
                            }}>
                            <Text style={{ fontSize: 18, color: '#000' }}> Sort By Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 0.5,
                                justifyContent: 'center',
                                paddingLeft: 20,
                            }}
                            onPress={() => {
                                setSelectedFilter(2);
                                setData(data.sort((a, b) => a.price - b.price));
                                setVisible(false);
                            }}>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                Low to High Price
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 0.5,
                                justifyContent: 'center',
                                paddingLeft: 20,
                            }}
                            onPress={() => {
                                setSelectedFilter(3);
                                setData(data.sort((a, b) => b.price - a.price));
                                setVisible(false);
                            }}>
                            <Text style={{ fontSize: 18, color: '#000' }}>
                                Hight to Low Price
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 0.5,
                                justifyContent: 'center',
                                paddingLeft: 20,
                            }}
                            onPress={() => {
                                setSelectedFilter(4);
                                setData(data.sort((a, b) => a.rating.rate - b.rating.rate));
                                setVisible(false);
                            }}>
                            <Text style={{ fontSize: 18, color: '#000' }}> Sort By Rating</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// api data
const Data = [
    {
        area: 'India',
        startTime: ({ hour: 9 }, 4),
        endTime: ({ hour: 12 }, 4),
    },
    {
        area: 'Haiti',
        startTime: ({ hour: 12 }, 4),
        endTime: ({ hour: 15, minutes: 30 }, 4),
    },
    {
        area: 'Ghana',
        startTime: ({ hour: 15 }, 4),
        endTime: ({ hour: 18 }, 4),
    },
    {
        area: 'Tampere',
        startTime: ({ hour: 17 }, 4),
        endTime: ({ hour: 20 }, 4),
    },
    {
        area: 'Afghanistan',
        startTime: ({ hour: 12 }),
        endTime: ({ hour: 14 }),
    },
    {
        area: 'Albania',
        startTime: ({ hour: 10 }),
        endTime: ({ hour: 12 }),
    },
    {
        area: 'Austria',
        startTime: ({ hour: 16 }),
        endTime: ({ hour: 17, minutes: 30 }),
    },
    {
        area: 'Bahamas',
        startTime: ({ hour: 16 }),
        endTime: ({ hour: 17, minutes: 30 }),
    },
    {
        area: 'Bahrain',
        startTime: ({ hour: 11 }),
        endTime: ({ hour: 13 }),
    },
    {
        area: 'Bangladesh',
        startTime: ({ hour: 10 }),
        endTime: ({ hour: 15 }),
    },
    {
        area: 'Cabo Verde',
        startTime: ({ hour: 10 }),
        endTime: ({ hour: 11, minutes: 30 }),
    },
    {
        area: 'Cambodia',
        startTime: ({ hour: 11 }),
        endTime: ({ hour: 13 }),
    },
    {
        area: 'Cameroon',
        startTime: ({ hour: 10 }),
        endTime: ({ hour: 12 }),
    },
    {
        area: 'China',
        startTime: ({ hour: 10 }),
        endTime: ({ hour: 12 }),
    },
    {
        area: 'Denmark',
        startTime: ({ hour: 12 }, 1),
        endTime: ({ hour: 14 }, 1),
    },
    {
        area: 'Djibouti',
        startTime: ({ hour: 14 }, 1),
        endTime: ({ hour: 16, minutes: 30 }, 1),
    },

    {
        area: 'Egypt',
        startTime: ({ hour: 9 }, 3),
        endTime: ({ hour: 10 }, 3),
    },
    {
        area: 'Ecuador',
        startTime: ({ hour: 10 }, 3),
        endTime: ({ hour: 12, minutes: 30 }, 3),
    },
    {
        area: 'El Salvador',
        startTime: ({ hour: 12, minutes: 30 }, 3),
        endTime: ({ hour: 15 }, 3),
    },
    {
        area: 'Helsinki',
        startTime: ({ hour: 10 }, 3),
        endTime: ({ hour: 14, minutes: 30 }, 3),
    },
    {
        area: 'Helsinki',
        startTime: ({ hour: 14 }, 3),
        endTime: ({ hour: 16, minutes: 30 }, 3),
    },
    {
        area: 'Eritrea',
        startTime: ({ hour: 10 }, 3),
        endTime: ({ hour: 12 }, 3),
    },
    {
        area: 'Estonia',
        startTime: ({ hour: 12 }, 3),
        endTime: ({ hour: 14 }, 3),
    },
    {
        area: 'Fiji',
        startTime: ({ hour: 13 }, 3),
        endTime: ({ hour: 15 }, 3),
    },

    {
        area: 'Finland',
        startTime: ({ hour: 9 }, 4),
        endTime: ({ hour: 11 }, 4),
    },
    {
        area: 'Gabon',
        startTime: ({ hour: 11 }, 4),
        endTime: ({ hour: 13, minutes: 30 }, 4),
    },
    {
        area: 'Chikago',
        startTime: ({ hour: 12 }, 4),
        endTime: ({ hour: 15 }, 4),
    },
    {
        area: 'Paria',
        startTime: ({ hour: 18 }, 4),
        endTime: ({ hour: 21 }, 4),
    },
];