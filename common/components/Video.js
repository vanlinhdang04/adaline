import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { Box, Modal } from "@mantine/core";
import Image from "next/image";
import React from "react";

function Video({ video_url, placeholderImageUrl }) {
  const [isVideoOpen, setIsVideoOpen] = React.useState();
  const hasVideo = !!video_url;

  return (
    <>
      <Box
        sx={(theme) => ({
          width: "85%",
          height: "85%",
          border: `3px solid ${theme.colors.main[2]}`,
          borderRadius: "56px",
          position: "absolute",
          bottom: "4%",
          right: "-1%",
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            borderRadius: "16px",
          },
        })}
      ></Box>

      <Box
        sx={(theme) => ({
          boxShadow: `20px 20px 40px rgba(43, 223, 206, 0.3)`,
          width: "90%",
          height: "90%",
          position: "relative",

          borderRadius: "56px",
          overflow: "hidden",
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            borderRadius: "16px",
          },
        })}
      >
        <Image
          src={appendImageFromAPI(placeholderImageUrl)}
          alt="image placeholder for video"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Box
            sx={(theme) => ({
              width: 104,
              height: 104,
              background: theme.colors.accent[19],
              borderRadius: "50%",
              position: "relative",
              cursor: "pointer",

              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                width: 53,
                height: 53,
              },
            })}
            onClick={() => {
              setIsVideoOpen(true);
            }}
          >
            <Box
              sx={(theme) => ({
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 0,
                height: 0,
                borderTop: "15px solid transparent",
                borderBottom: "15px solid transparent",
                borderLeft: `28px solid ${theme.colors.main[0]}`,
                borderRadius: "4px",
                [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                  borderTop: "8px solid transparent",
                  borderBottom: "8px solid transparent",
                  borderLeft: `14px solid ${theme.colors.main[0]}`,
                },
              })}
            ></Box>
          </Box>
        </div>
      </Box>

      <Modal
        opened={isVideoOpen && hasVideo}
        onClose={() => setIsVideoOpen(false)}
        padding={0}
        size="78%"
        styles={(theme) => ({
          header: {
            display: "none",
          },
          body: {
            display: "flex",
            aspectRatio: "1.77",
            width: "100%",
          },
          modal: {
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
              width: "100%",
            },
          },
        })}
      >
        <iframe
          width="100%"
          height="100%"
          src={`${video_url}`}
          frameBorder="0"
          title=""
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          autoPlay
        ></iframe>
      </Modal>
    </>
  );
}

export default Video;
