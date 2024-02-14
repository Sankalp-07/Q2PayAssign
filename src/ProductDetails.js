import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image
} from 'react-native';
import axios from 'axios';

const ProductDetails = (props) => {
    console.log('ProductDetails ==>', props.route.params.id);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [productId, setProductId] = useState(props.route.params.id);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setError(false);
          const response = await axios.get(`https://dummyjson.com/products/${productId}`);
          console.log('response ==> ', response.data.images[0]);
          setProducts(response.data);
        } catch (error) {
          console.log('error ==>', error);
          setError(true);
        }
      };
  
      fetchData();
    }, [productId]); // Include productId in the dependency array to trigger the effect when it changes
  
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Error fetching data</Text>
        </View>
      );
    }
  
    return (
      <>
        {Object.keys(products).length > 0 && ( // Check if products array is not empty
          <View style={styles.container}>
            <Image source={{ uri: products.images[0] }} style={styles.imgStyle} />
  
            <View style={{ width: '90%', borderWidth: 0, marginTop: 20 }}>
              <View style={styles.productdetails}>
                <Text style={styles.title}>{products.title}</Text>
              </View>
              <View style={styles.productdetails}>
                <Text>{products.brand}</Text>
              </View>
  
              <View style={styles.productdetails}>
                <Text>{products.category}</Text>
              </View>

              <View style={styles.productdetails}>
                <Text>{products.description}</Text>
              </View>
  
              <View style={styles.productdetails}>
                <Text>{products.discountPercentage}</Text>
              </View>
            </View>
          </View>
        )}
      </>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems:'center'
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
    justifyContent:'center'
  },
  imgStyle: {
    width: 100, 
    height: 100
  },
  productdetails: {
    height:40,
    marginLeft:5,
    backgroundColor:'grey',
    marginBottom:10,
    justifyContent:'center',
    paddingLeft:10
  }
});

export default ProductDetails;
