import TextSSR from "../TextSSR";

function BannerHeading({ children, ...props }) {
  return (
    <TextSSR
      {...props}
      type="title"
      order={1}
      weight={700}
      size={32}
      md={{
        text: {
          fontSize: 40,
        },
      }}
    >
      {children}
    </TextSSR>
  );
}

export default BannerHeading;
