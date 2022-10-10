import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {SET_PRODUCT, SET_CATEGORY} from '../store/actions';

const HomePage = ({product, category}) => {
  const [selectedProduct, setSelectedProduct] = useState([]);

  const addProductForCategory = id => {
    selectedProduct.map((o, i) => {
      o.checked = false;
      const indexProduct = product?.map((a, b) => {
        if (a.id === o?.id) {
          return b;
        }
      });
      product?.splice(indexProduct[1], 1);
    });
    var index = category.findIndex(item => {
      return item.id === id;
    });
    let newData = [...category[index].product, ...selectedProduct];
    category[index].product = newData;
    SET_PRODUCT([...product]);
    SET_CATEGORY([...category]);
  };

  const showRemove = categoryId => {
    let value = 0;
    const categoryProduct = category[categoryId].product;
    categoryProduct.map((o, i) => {
      if (o?.checked === true) {
        value += 1;
      }
    });
    return value;
  };

  const removeCategory = categoryId => {
    category.splice(categoryId, 1);
    SET_CATEGORY([...category]);
  };

  const addNewCategory = () => {
    let id = category?.length === 0 ? 1 : category[category.length - 1].id + 1;
    SET_CATEGORY([...category, {id: id, name: 'Category ' + id, product: []}]);
  };

  const removeHandleChange = categoryId => {
    let productData = category[categoryId].product;

    const checkedItem = productData?.filter(item => item.checked === true);
    const unCheckedItem = productData?.filter(item => item.checked === false);
    checkedItem.map((o, i) => (o.checked = false));
    unCheckedItem.map((o, i) => (o.checked = false));
    category[categoryId].product = unCheckedItem;

    SET_PRODUCT([...product, ...checkedItem]);
    SET_CATEGORY([...category]);
  };

  const handleChange = id => {
    var index = product?.findIndex(item => {
      return item.id === id;
    });
    product[index].checked = !product[index].checked;
    SET_PRODUCT([...product]);
  };

  const handleChangeRemove = (id, categoryId) => {
    var index = category[categoryId].product?.findIndex(item => {
      return item.id === id;
    });
    category[categoryId].product[index].checked =
      !category[categoryId].product[index].checked;
    SET_CATEGORY([...category]);
  };

  useEffect(() => {
    const selected = [];
    product?.map((o, i) => {
      if (o?.checked === true) {
        selected.push(o);
      }
    });
    setSelectedProduct([...selected]);
  }, [product]);

  const renderFlatList = (renderData, type, categoryId = null) => {
    const renderSortData = renderData.sort((a, b) => (a.id > b.id ? 1 : -1));
    return (
      <FlatList
        data={renderSortData}
        renderItem={({item, index}) => (
          <View key={index} flexDirection="row" style={{paddingTop: 38}}>
            <TouchableOpacity
              key={item.id}
              style={{
                borderWidth: 1,
                borderColor: item.checked
                  ? '#074EE8'
                  : 'rgba(170, 170, 170, 1)',
                width: 20,
                height: 20,
                backgroundColor: item.checked ? '#074EE8' : 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
              }}
              onPress={() =>
                type === 'add'
                  ? handleChange(item.id)
                  : handleChangeRemove(item.id, categoryId - 1)
              }>
              {item.checked && (
                <Image
                  source={require('../Image/check.png')}
                  style={{width: 12, height: 10}}
                />
              )}
            </TouchableOpacity>
            <Text style={{paddingLeft: 8, fontSize: 16, fontWeight: '400'}}>
              {item.name}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Text style={{fontSize: 32, fontWeight: '400'}}>Initial Screen</Text>
      <View style={{flexDirection: 'row', paddingTop: 20}}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              padding: 20,
              flexDirection: 'column',
            }}>
            <View flexDirection="row" style={{alignItems: 'center'}}>
              <Image source={require('../Image/box.png')} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#111111',
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                Available Products
              </Text>
            </View>
            <View>{renderFlatList(product, 'add')}</View>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#DDDDDD',
              padding: 20,
              flexDirection: 'column',
              marginTop: 22,
            }}>
            <View flexDirection="row" style={{alignItems: 'center'}}>
              <Image source={require('../Image/save.png')} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#074EE8',
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                Available Products
              </Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 20}}>
              <View style={{}}>
                <Text>Avaible Product : {product?.length}</Text>
                <Text>Categories : {category.length}</Text>
              </View>
              <View style={{marginTop: 20}}>
                {category?.map((o, i) => {
                  return (
                    <Text>
                      Categories {o?.id}: {o?.product?.length} product
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            marginLeft: 30,
          }}>
          {category?.map((o, i) => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#DDDDDD',
                  padding: 20,
                  flexDirection: 'column',
                  marginTop: i === 0 ? 0 : 16,
                }}>
                <View flexDirection="row" style={{alignItems: 'center'}}>
                  <Image source={require('../Image/boxother.png')} />
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#111111',
                      fontSize: 18,
                      fontWeight: '400',
                    }}>
                    {o?.name}
                  </Text>
                </View>
                {o?.product && o?.product?.length > 0 ? (
                  <View>{renderFlatList(o?.product, 'remove', o?.id)}</View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: 75,
                    }}>
                    <Image source={require('../Image/heart.png')} />
                    <Text
                      style={{
                        color: '#767676',
                        fontSize: 18,
                        fontWeight: '400',
                      }}>
                      Select products to add here.
                    </Text>
                  </View>
                )}
                <View style={{flexDirection: 'row', marginTop: 53}}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{
                        width: 120,
                        height: 32,
                      }}
                      onPress={() => addProductForCategory(o?.id)}>
                      <Text
                        style={{
                          color:
                            selectedProduct?.length > 0 ? 'white' : '#767676',
                          fontSize: 16,
                          fontWeight: '400',
                          backgroundColor:
                            selectedProduct?.length > 0 ? '#074EE8' : '#EEEEEE',
                          padding: 12,
                        }}>
                        Add{' '}
                        {selectedProduct?.length > 0
                          ? selectedProduct?.length
                          : ''}{' '}
                        products
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 140,
                        height: 32,
                        marginLeft: 10,
                      }}
                      onPress={() => {
                        removeHandleChange(o?.id - 1);
                      }}
                      disabled={showRemove(o?.id - 1) > 0 ? false : true}>
                      <Text
                        style={{
                          color:
                            showRemove(o?.id - 1) > 0 ? '#FFFFFF' : '#767676',
                          fontSize: 14,
                          fontWeight: '400',
                          backgroundColor:
                            showRemove(o?.id - 1) > 0 ? '#074EE8' : '#EEEEEE',
                          padding: 12,
                        }}>
                        Remove{' '}
                        {showRemove(o?.id - 1) > 0 ? showRemove(o?.id - 1) : ''}{' '}
                        Products
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{display: 'flex', flex: 1, alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      style={{
                        width: 100,
                        height: 32,
                        marginLeft: 10,
                      }}
                      onPress={() => {
                        removeCategory(i);
                      }}>
                      <Text
                        style={{
                          color: '#767676',
                          fontSize: 16,
                          fontWeight: '400',
                          backgroundColor: '#EEEEEE',
                          padding: 12,
                        }}>
                        Remove Category
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
          <View
            style={{
              display: 'flex',
              flex: 1,
              marginTop: 22,
              backgroundColor: '#074EE8',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: 48,
            }}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => addNewCategory()}>
              <Text style={{color: 'white'}}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const S = state => ({
  product: state.product,
  category: state.category,
});

export default connect(S)(HomePage);
