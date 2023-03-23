import { Box, Text, Title } from "@mantine/core";
import PropTypes from "prop-types";

function TextSSR({
  type = "text",
  containerStyle = {},
  containerProps = {},
  xs = {},
  sm = {},
  md = {},
  lg = {},

  children,
  ...props
}) {
  const isTitle =
    props.size === "h1" ||
    props.size === "h2" ||
    props.size === "h3" ||
    props.size === "h4" ||
    props.size === "h5" ||
    props.size === "h6" ||
    props.order;

  return (
    <Box
      {...containerProps}
      sx={(theme) => ({
        ...containerStyle,
        [theme.fn.smallerThan("xs")]: { ...xs.container },
        [theme.fn.largerThan("sm")]: { ...sm.container },
        [theme.fn.largerThan("md")]: { ...md.container },
        [theme.fn.largerThan("lg")]: { ...lg.container },
      })}
    >
      {type === "text" && !isTitle && (
        <Text
          weight={400}
          {...props}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: { ...xs.text },
            [theme.fn.largerThan("sm")]: { ...sm.text },
            [theme.fn.largerThan("md")]: { ...md.text },
            [theme.fn.largerThan("lg")]: { ...lg.text },
          })}
        >
          {children}
        </Text>
      )}
      {(type === "title" || isTitle) && (
        <Title
          weight={400}
          {...props}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: { ...xs.text },
            [theme.fn.largerThan("sm")]: { ...sm.text },
            [theme.fn.largerThan("md")]: { ...md.text },
            [theme.fn.largerThan("lg")]: { ...lg.text },
          })}
        >
          {children}
        </Title>
      )}
    </Box>
  );
}

TextSSR.propTypes = {
  type: PropTypes.string,
};

export default TextSSR;
