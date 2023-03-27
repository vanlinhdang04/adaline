import { Box, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";

const SpecialFeatureItem = ({ icon, iconColor, title, text }) => {
  return (
    <Box>
      <ThemeIcon color={iconColor} size="60px" radius={"50%"}>
        {icon}
      </ThemeIcon>
      <Title order={5} color="#2a354f" my={"1rem"} size="1.25rem" weight={500}>
        {title}
      </Title>
      <Text color={"#a0a0bf"} mb="1rem" size={"1rem"}>
        {text}
      </Text>
    </Box>
  );
};

export default SpecialFeatureItem;
