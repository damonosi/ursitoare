import { useMediaQuery } from "react-responsive";

const useDesktopMediaQuery = () => {
  useMediaQuery({ query: "(min-width: 1280px)" });
};

const useTabletAndBelowMediaQuery = () => {
  useMediaQuery({ query: "(max-width: 1279px)" });
};

export const Desktop = ({ children }) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

export const TabletAndBelow = ({ children }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};
