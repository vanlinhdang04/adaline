import { createStyles } from "@mantine/core";
// import bg from "public/footer/subscribe_bg.jpg";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    background: "#3CAEA4",
    // padding: "35px 0px",
    width: "100%",
    position: "relative",
  },

  // Subscribe
  subscribe: {
    position: "relative",

    minWidth: "100%",
    minHeight: 243,

    "&:before": {
      // background: `url('${bg.src}') no-repeat center`,
      backgroundSize: "cover",

      content: "''",
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      // width: "100%",
      height: "100%",
      opacity: "0.4",
    },
  },
  subscribeContent: {
    position: "relative",
    padding: "40px 12px 12px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  // Info
  info: {
    // display: "flex",
    flexDirection: "column",
    padding: "35px 0px",
    // overflow: "hidden",
    minWidth: "100%",
    // background: "#3CAEA4",
    color: "#fff",
    position: "relative",
    zIndex: 2,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      padding: "8px 0px",
    },
  },
  infoBody: {
    // width: "100%",
    padding: "30px 0 20px",
  },
  logoWrapper: {
    position: "relative",
    aspectRatio: "3.05",
    height: "50px",
    width: "152px",
    marginBottom: "10px",
  },
  infoText: {
    transition: "0.3s",
    cursor: "pointer",
    // "&:hover": {
    //   color: "#EBBC1D",
    // },
  },
  infoBottom: {
    padding: "20px 0 25px",

    color: "#ffffff",
    fontWeight: "400",
    fontSize: 14,
  },
}));

export default useStyles;
