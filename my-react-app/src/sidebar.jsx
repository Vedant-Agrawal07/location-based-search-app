import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Heading,
  CloseButton,
} from "@chakra-ui/react";

function Sidebar({
  place,
  closeFunc,
  isOpen,
  onClose,
  user_latitude,
  user_longitude,
}) {
  if (!isOpen || !place) return null;

  const getDirections = () => {
    
    const url = `https://www.google.com/maps/search/?api=1&query=${place.name}`;
    window.open(url, "_blank");
  };

  return (
    <Box
      position="absolute"
      right="0"
      top="0"
      height="100%"
      width={["100%", "100%", "400px"]}
      bg="white"
      boxShadow="-2px 0 10px rgba(0,0,0,0.1)"
      p="4"
      zIndex="modal"
      transition="all 0.3s ease"
      transform={isOpen ? "translateX(0)" : "translateX(100%)"}
      overflowY="auto"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading size="md">{place.name}</Heading>
        <CloseButton
          onClick={() => {
            closeFunc();
            onClose();
          }}
        />
      </Flex>

      <Flex
        align="center"
        justify="center"
        height="200px"
        bgGradient="linear(to-r, blue.400, cyan.400)"
        color="white"
        fontSize="2xl"
        fontWeight="bold"
        borderRadius="md"
        mb="4"
      >
        {place.name.charAt(0).toUpperCase()}
      </Flex>

      <Box mb="4" p="3" bg="gray.50" borderRadius="md">
        <Text fontWeight="bold" mb="1">
          Address
        </Text>
        <Text>{place.address}</Text>
      </Box>

      <Box mb="4" p="3" bg="gray.50" borderRadius="md">
        <Text fontWeight="bold" mb="1">
          Coordinates
        </Text>
        <Flex direction="column">
          <Text fontSize="sm">Latitude: {place.lat?.toFixed(6)}</Text>
          <Text fontSize="sm">Longitude: {place.lon?.toFixed(6)}</Text>
        </Flex>
      </Box>

      <Button
        leftIcon={<span>🧭</span>}
        colorScheme="blue"
        width="full"
        onClick={getDirections}
      >
        Get Directions
      </Button>
    </Box>
  );
}

export default Sidebar;
