import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

export default function App() {
  const [y, setY] = useState(0);
  const intervalId = useRef(null);

  const moveUp = () => {
    intervalId.current = setInterval(() => setY((prev) => prev + 1), 1);
  };

  useEffect(() => {
    if (y === 200) {
      clearInterval(intervalId.current);
    }
  }, [y]);

  return (
    <Container>
      <Box
        onPress={moveUp}
        style={{
          transform: [{ translateY: y }],
        }}
      />
    </Container>
  );
}
