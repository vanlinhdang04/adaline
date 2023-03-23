import TextSSR from "../TextSSR";

function SectionHeading({ children }) {
  return (
    <TextSSR
      type="title"
      size="h2"
      order={2}
      align="center"
      containerProps={{
        mb: 19,
      }}
      md={{
        text: {
          fontSize: 32,
        },
        container: {
          marginBottom: 31,
        },
      }}
    >
      {children}
    </TextSSR>
  );
}

export default SectionHeading;
