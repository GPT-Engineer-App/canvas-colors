import React, { useRef, useState } from "react";
import { Container, Box, Button, VStack, HStack } from "@chakra-ui/react";

const colors = ["#FF0000", "#0000FF", "#FFFF00", "#000000", "#FFFFFF"];

const Index = () => {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    const rect = canvas.getBoundingClientRect();
    const offsetX = rect.left;
    const offsetY = rect.top;

    const draw = (event) => {
      ctx.lineTo(event.clientX - offsetX, event.clientY - offsetY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
    };

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    ctx.beginPath();
    ctx.moveTo(e.clientX - offsetX, e.clientY - offsetY);
  };

  return (
    <Container maxW="100vw" maxH="100vh" p={0} m={0} centerContent>
      <Box position="relative" width="100vw" height="100vh">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: "1px solid #000", display: "block" }}
          onMouseDown={handleMouseDown}
        />
        <VStack
          position="absolute"
          top={4}
          left={4}
          spacing={2}
          bg="rgba(255, 255, 255, 0.8)"
          p={2}
          borderRadius="md"
        >
          {colors.map((color) => (
            <Button
              key={color}
              bg={color}
              width="40px"
              height="40px"
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;