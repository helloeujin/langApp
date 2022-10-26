import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [up, setUp] = useState(false);
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;

  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
      duration: 3000,
    }).start(toggleUp);
  };

  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166 , 255)"],
  });

  // Y_POSITION.addListener(() => console.log(opacity));

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            transform: [{ translateY: POSITION.y }, { rotateY: rotation }],
            backgroundColor: bgColor,
          }}
        />
      </Pressable>
    </Container>
  );
}
