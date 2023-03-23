import { useSetState } from "@mantine/hooks";
import React from "react";

const useCountdownTimer = (durationInSeconds) => {
  const [{ isExpired, start, durationLeftInSeconds }, setState] = useSetState({
    durationLeftInSeconds: null,
    isExpired: false,
    start: false,
  });

  const startCountdown = () => {
    reset();
    setState({ start: true });
  };
  const reset = () => {
    setState({
      durationLeftInSeconds: durationInSeconds,
      isExpired: false,
      start: false,
    });
  };

  React.useEffect(
    () => setState({ durationLeftInSeconds: durationInSeconds }),
    [durationInSeconds]
  );

  React.useEffect(() => {
    if (!start) return;

    const intervalId = setInterval(() => {
      setState({
        durationLeftInSeconds: durationLeftInSeconds - 1,
      });
    }, 1000);

    if (durationLeftInSeconds <= 0) {
      setState({
        isExpired: true,
      });
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [durationLeftInSeconds, start]);

  return { isExpired, durationLeftInSeconds, startCountdown };
};

export default useCountdownTimer;
