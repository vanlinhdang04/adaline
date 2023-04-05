import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { FiArrowLeft } from "@react-icons/all-files/fi/FiArrowLeft";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
export default function ThemeProvider({ children }) {
  return (
    <MantineProvider
      // withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{
        // colorScheme: ["light", "dark"], // BUG: override other css accidentally
        primaryShade: 5,
        defaultRadius: "xs",
        dateFormat: "DD/MM/YYYY",
        datesLocale: "vi",
        radius: {
          xs: 7,
          sm: 13,
          md: 16,
          lg: 56,
          xl: 63,
        },
        colors: {
          main: [
            "#178277", //0
            "#17A49C", //1
            "#1FBBAF", //2
            "#2BDFCE", //3
            "#6ED7D3", //4
            "#A8EFEB", //5
          ],
          neutral: [
            "#2a345f", //0
            "#333333", //1
            "#414141", //2
            "#ADB4BB", //3
            "#ADB4BB", //4
            "#BFC4C9", //5
            "#DFE2E4", //6
            "#F0F2F5", //7
            "#FFFFFF", //8
            "#FFFFFF", //9
          ],
          accent: [
            "#333333", //0
            "#1C655E", //1
            "#3CAEA4", //2
            "#197742", //3
            "#38C173", //4
            "#74D99F", //5
            "#A9EEC1", //6
            "#8C6C1F", //7
            "#F4CA64", //8
            "#FBE2A0", //9
            "#FDF4D7", //10
            "#891B1A", //11
            "#DC3030", //12
            "#E46463", //13
            "#F5A9A9", //14
            "#297FB0", //15
            "#40BAFF", //16
            "#80D2FF", //17
            "#BFE8FF", //18
            "#FFFFFF", //19
            "#000000", //20
            "#EB5757", //21
          ],
        },
        primaryColor: "main",

        // typo
        fontFamily: "Roboto",
        fontSizes: {
          xs: 12,
          sm: 16,
          md: 20,
          lg: 24,
          xl: 28,
        },
        breakpoints: {
          xs: 0,
          sm: 768,
          md: 992,
          lg: 1200,
          xl: 1400,
        },
        headings: {
          fontFamily: "Roboto",
          fontWeight: 700,
          sizes: {
            h1: { fontSize: 28 },
            h2: { fontSize: 24 },
            h3: { fontSize: 20 },
            h4: { fontSize: 16 },
            h5: { fontSize: 12 },
            h6: { fontSize: 8 },
          },
          color: "var(--text-heading)",
        },
        components: {
          Pagination: {
            defaultProps: {
              radius: 7,
              fontSize: 16,
              size: "md",
              color: "var(--color-primary)",
              styles: {
                item: {
                  margin: "10px 0px",
                  color: "#ADB4BB",
                  "&[data-active=true]": {
                    backgroundColor: "var(--color-primary)",
                    fontWeight: 700,
                    border: "#3caea4",
                  },
                },
              },
              itemComponent: ({
                active,
                page,
                onClick,
                className,
                disabled,
                ...data
              }) => {
                switch (page) {
                  case "dots":
                    return <div>...</div>;
                  case "prev":
                    return (
                      <button
                        onClick={onClick}
                        className={className}
                        disabled={disabled}
                        style={{ borderColor: "var(--color-primary)" }}
                      >
                        <FiArrowLeft color="var(--color-primary)" />
                      </button>
                    );
                  case "next":
                    return (
                      <button
                        onClick={onClick}
                        className={className}
                        disabled={disabled}
                        style={{ borderColor: "var(--color-primary)" }}
                      >
                        <FiArrowRight color="var(--color-primary)" />
                      </button>
                    );

                  default:
                    if (active == true) {
                      return (
                        <button
                          onClick={onClick}
                          className={className}
                          // disabled={disabled}
                          // active={active}
                          aria-current={data["aria-current"]}
                          data-active={active}
                        >
                          {page}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          onClick={onClick}
                          className={className}
                          // disabled={disabled}
                          // active={active}
                          aria-current={data["aria-current"]}
                          // data-active={active}
                        >
                          {page}
                        </button>
                      );
                    }
                }
              },
            },
          },
          Title: {
            defaultProps: {
              color: "#001529",
            },
          },
          Text: {
            defaultProps: {
              size: "sm",
            },
          },
        },
      }}
    >
      <NotificationsProvider position="top-right" zIndex={2077} limit={3}>
        {children}
      </NotificationsProvider>
    </MantineProvider>
  );
}
