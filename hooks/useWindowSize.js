import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

// default mantine breakpoint
// xs	576px
// sm	768px
// md	992px
// lg	1200px
// xl	1400px

// Usage
export default function useWindowSize() {
  const size = useWindowSizes();
  const theme = useMantineTheme();

  //   console.log(size);
  return {
    size,
    isMobile: size.width < theme.breakpoints.xs, // iphone 8 plus or below
    isTablet: size.width < theme.breakpoints.md, // ipad air
    isLaptop: size.width > theme.breakpoints.lg,
    isDesktop: size.width > theme.breakpoints.xl,
    aboveTablet: size.width > theme.breakpoints.md,
    xs: theme.breakpoints.xs,
    sm: theme.breakpoints.sm,
    md: theme.breakpoints.md,
  };
}

// Hook
function useWindowSizes() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
