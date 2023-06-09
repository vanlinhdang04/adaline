import { Title } from "@mantine/core";
import React from "react";

export default function HomeTitle({ children, ...style }) {
  return (
    <Title
      weight={400}
      order={2}
      color="#001529"
      align="center"
      sx={(theme) => ({
        // textAlign: "left",
        fontSize: 34,
        marginBottom: 40,
        fontWeight: "500",

        // marginTop: 0,
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
          textAlign: "center",
          fontSize: 22,
          marginBottom: 16,
          // marginTop: 24,
        },
      })}
      {...style}
    >
      {children}
    </Title>
  );
}
