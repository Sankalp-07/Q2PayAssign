import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ProductScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const response = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: endIndex,
        },
      });

      const newProducts = response.data.products.slice(startIndex, endIndex);

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log('error ==>', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      );
    }
    return null;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { id: item.id })} style={styles.item}>
      <View style={styles.imgStyleView}>
        <Image source={{ uri: item.images[0] }} style={styles.imgStyle} />
      </View>
      <View style={styles.productdetails}>
        <Text style={styles.title}>{item.brand}</Text>
        <Text style={styles.title}>{item.category}</Text>
        <Text style={styles.title}>{item.description}</Text>
        <Text style={styles.title}>{item.discountPercentage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={fetchProducts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  imgStyleView: {
    justifyContent: 'center',
  },
  imgStyle: {
    width: 100,
    height: 100,
  },
  productdetails: {
    width: '68%',
    marginLeft: 5,
  },
  loader: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

export default ProductScreen;
