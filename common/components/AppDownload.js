import { Box, SimpleGrid } from "@mantine/core";
import React from "react";
import AppStore from "./Download/AppStore";
import ChPlay from "./Download/ChPlay";
import Windows from "./Download/Windows";

function AppDownload() {
  return (
    <Box display={"flex"} style={{ alignItems: "center" }}>
      <Box>
        <SimpleGrid cols={3}>
          <AppStore width={226} height={66} />
          <ChPlay width={226} height={66} />
          <Windows width={226} height={66} />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default AppDownload;
