import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SnapCarousel, {
  ParallaxImage,
  Pagination,
  AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {ICarousel} from '@/models/Home';
import {RootState} from '@/models/index';

const Carousel: React.FC = memo(() => {
  const carousels = useSelector<RootState, ICarousel[]>(
    (state) => state.home.carousels,
  );
  const activeCarouselIndex = useSelector<RootState, number>(
    (state) => state.home.activeCarouselIndex,
  );
  const dispatch = useDispatch();

  const onSnapToItem = useCallback(
    (index: number) => {
      dispatch({
        type: 'home/setState',
        payload: {
          activeCarouselIndex: index,
        },
      });
    },
    [dispatch],
  );
  const renderItem = useCallback(
    ({item}: {item: ICarousel}, parallaxProps?: AdditionalParallaxProps) => {
      return (
        <ParallaxImage
          source={{uri: item.image}}
          style={styles.image}
          containerStyle={styles.imageContainer}
          parallaxFactor={0.8}
          showSpinner
          spinnerColor="rgba(0,0,0,0.25)"
          {...parallaxProps}
        />
      );
    },
    [],
  );

  const pagination = useCallback(() => {
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          dotsLength={carousels.length}
          activeDotIndex={activeCarouselIndex}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }, [activeCarouselIndex, carousels.length]);

  return (
    <View>
      <SnapCarousel
        data={carousels}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={wp(94)}
        hasParallaxImages
        onSnapToItem={onSnapToItem}
        loop
        autoplay
      />
      {pagination()}
    </View>
  );
});

const styles = StyleSheet.create({
  imageContainer: {
    width: wp(94),
    height: hp(26),
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});

export default Carousel;
