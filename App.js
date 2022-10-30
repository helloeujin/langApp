import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

///
export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166 , 255)"],
  });

  // Y_POSITION.addListener(() => console.log(opacity));

  const panResponder = useRef(
    PanResponder.create({
      // should become active when there is a touch
      onStartShouldSetPanResponder: () => true,
      // touch started (start from previous value)
      onPanResponderGrant: () => {
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
      // finger moving
      onPanResponderMove: (_, { dx, dy }) => {
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      // touch finished
      onPanResponderRelease: () => {
        // take the offset and turn it to zero
        // and put that offset and give it to Position
        POSITION.flattenOffset();
      },
    })
  ).current;

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          transform: POSITION.getTranslateTransform(),
          backgroundColor: bgColor,
        }}
      />
    </Container>
  );
}
