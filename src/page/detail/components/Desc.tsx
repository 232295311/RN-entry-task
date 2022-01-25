import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {imgAssets} from '../../../config/ImgAsset';
import {scaleSize, setSpText2} from '../../../utils/screen';
import LinearGradient from 'react-native-linear-gradient';

const linHeight = 16;
const numberOfLines = 8;

export default (props: any) => {
  const images: string[] | undefined = props.data && props.data.images; //图片数组
  const [imagesOnError, setImagesOnError] = useState<boolean[]>([]); //存储图片数组是否加载错误的信息，如果有错则重新渲染为notFound图片

  const [hide, setHide] = useState<boolean>(true);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const textData = props.data && props.data.description;

  useEffect(() => {
    if (images && images.length > 0) {
      const a = new Array(images.length).fill(false); //初始化时先全部设置为false
      setImagesOnError(a);
    }
  }, [images]);
  //  渲染图片Item listItem为FlatList的item
  const renderPicItem = (listItem: any) => {
    return (
      <View style={styles.imgContainer}>
        <Image
          style={styles.imgItem}
          source={
            imagesOnError[listItem.index]
              ? imgAssets.notFound
              : {uri: listItem.item}
          }
          onError={() => {
            const tmp = [...imagesOnError];
            tmp[listItem.index] = true;
            setImagesOnError(tmp);
          }}></Image>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {images && images.length > 0 && (
        <View style={{paddingLeft: scaleSize(16)}}>
          <FlatList
            data={images}
            keyExtractor={(item, index) => '' + index}
            renderItem={renderPicItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      <View style={{paddingRight: scaleSize(16), paddingLeft: scaleSize(16)}}>
        <View>
          <Text
            numberOfLines={hide ? numberOfLines : undefined}
            style={styles.displayDescText}>
            {textData}
          </Text>

          {/* 隐藏节点，用于判断文字真实高度 */}
          <Text
            onLayout={e => {
              const {height} = e.nativeEvent.layout;
              if (height - 1 < scaleSize(linHeight) * numberOfLines) {
                setIsOverflow(false);
              } else {
                setIsOverflow(true);
              }
            }}
            style={{
              position: 'absolute',
              zIndex: -100,
              lineHeight: scaleSize(linHeight),
              opacity: 0, //隐藏的
            }}>
            {textData}
          </Text>
          {/* 隐藏节点，用于判断文字真实高度 */}
        </View>
      </View>
      {isOverflow && hide ? (
        // 渐变色组件
        <LinearGradient
          colors={[
            'rgba(250, 249, 252, 0)',
            'rgba(250, 249, 252, 0.7)',
            'rgba(250, 249, 252, 1)',
          ]}
          style={styles.bottomCover}>
          <Text
            style={styles.viewAll}
            onPress={() => {
              const newValue = !hide;
              setHide(newValue);
            }}>
            {'VIEW ALL'}
          </Text>
        </LinearGradient>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imgContainer: {
    paddingTop: scaleSize(16),
    marginRight: scaleSize(12),
    marginBottom: scaleSize(12),
  },
  imgItem: {
    width: scaleSize(180),
    height: scaleSize(100),
    borderRadius: scaleSize(5),
  },
  hideDescText: {
    fontSize: setSpText2(14),
    color: '#67616D',
    lineHeight: scaleSize(linHeight),
  },
  displayDescText: {
    fontSize: setSpText2(14),
    color: '#67616D',
    lineHeight: scaleSize(linHeight),
  },
  bottomCover: {
    width: '100%',
    height: scaleSize(57),
    position: 'absolute',
    bottom: 0,
  },

  viewAll: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: scaleSize(20),
    overflow: 'hidden', //使borderRadius生效
    paddingLeft: scaleSize(13),
    paddingRight: scaleSize(13),
    paddingTop: scaleSize(5),
    paddingBottom: scaleSize(6),
    backgroundColor: '#D5EF7F',
    fontSize: setSpText2(10),
    color: '#676181',
  },
});
