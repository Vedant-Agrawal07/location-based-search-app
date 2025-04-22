import React from "react";
import {
  Box,
  Flex,
  Text,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

function SearchModal({
  children,
  filter,
  setFilter,
  radius,
  setRadius,
  handlerFunction,
}) {
  return (
    <Flex direction="column" gap="3">
      <Box>
        <Text mb="2" fontWeight="medium">
          Filter by Type
        </Text>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="filled"
          placeholder="Select type"
          bg="gray.100"
        >
          <option value="">All</option>
          <option value="restaurant">Restaurant</option>
          <option value="market">Market</option>
          <option value="hospital">Hospital</option>
          <option value="gym">Gym</option>
          <option value="cafe">Cafe</option>
          <option value="hotel">Hotel</option>
          <option value="bank">Bank</option>
        </Select>
      </Box>

      <Box>
        <Flex alignItems="center" justifyContent="space-between" mb="2">
          <Text fontWeight="medium">Search Radius</Text>
          <Text fontSize="sm">{radius} km</Text>
        </Flex>
        <Slider
          aria-label="radius-slider"
          min={0}
          max={20}
          value={radius}
          onChange={(val) => setRadius(val)}
          colorScheme="blue"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize="6" boxShadow="md" />
        </Slider>
      </Box>

      <Box mt="2" onClick={handlerFunction}>
        {children}
      </Box>
    </Flex>
  );
}

export default SearchModal;
