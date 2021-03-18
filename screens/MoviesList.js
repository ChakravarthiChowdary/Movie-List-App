import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Animated, View, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getMovies } from "../store/actions";
import Movie from "../components/Movie";
import Backdrop from "../components/BackdropList";
import Loading from "../components/Loading";
import Error from "../components/Error";

const { width } = Dimensions.get("window");

const ITEM_SIZE = width * 0.72;

const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state);
  const [refreshing, setRefreshing] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  const refreshHandler = useCallback(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  let data = [{ id: "left-spacer" }, ...movies, { id: "right-spacer" }];

  return (
    <View style={{ flex: 1 }}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Movie item={item} index={index} scrollX={scrollX} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["tomato"]}
            onRefresh={refreshHandler}
          />
        }
      />
    </View>
  );
};

export default MoviesList;
