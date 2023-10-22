
// Chakra imports
import { Box, Grid } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import Storage1 from "views/admin/points/components/Storage1";
import Storage2 from "views/admin/points/components/Storage2";
import Storage3 from "views/admin/points/components/Storage3";
import Storage4 from "views/admin/points/components/Storage4";
import Storage5 from "views/admin/points/components/Storage5";
import Storage6 from "views/admin/points/components/Storage6";

// Assets
import banner from "assets/img/auth/banner.jpg";
//import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Points() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Storage1
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={3}
          total={4}
        />
        <Storage2
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={2}
          total={4}
        />
        <Storage3
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={6}
          total={6}
        />
      </Grid>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Storage4
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={2}
          total={4}
        />
        <Storage5
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={4}
          total={4}
        />
        <Storage6
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={3}
          total={4}
        />
      </Grid>
    </Box>
  );
}
