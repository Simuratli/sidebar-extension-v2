export const getTimeDifferenceForToken = (refressTime: Date) => {
  const currentTime = new Date();
  return (
    Math.abs(currentTime.getTime() - refressTime.getTime()) / (1000 * 60 * 60)
  );
};
