import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

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

export default function App() {
  const Y = new Animated.Value(0);

  const moveUp = () => {
    Animated.spring(Y, {
      toValue: -200,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  };

  // Y.addListener(() => console.log(Y));

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [{ translateY: Y }],
          }}
        />
      </TouchableOpacity>
    </Container>
  );
}
