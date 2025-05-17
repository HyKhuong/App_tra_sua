import React, { FC, useEffect } from "react";
import { useLocation, Location } from "react-router-dom";

const scrollPositions: Record<string, number> = {};

function findElementWithScrollbar(rootElement: Element = document.body): Element | null {
  if (rootElement.scrollHeight > rootElement.clientHeight) {
    return rootElement;
  }

  for (let i = 0; i < rootElement.children.length; i++) {
    const childElement = rootElement.children[i];
    const elementWithScrollbar = findElementWithScrollbar(childElement);
    if (elementWithScrollbar) {
      return elementWithScrollbar;
    }
  }

  return null;
}

// Helper to safely get location or return null if not in Router context
function useSafeLocation(): Location | null {
  try {
    return useLocation();
  } catch (error) {
    // Not inside a Router context
    return null;
  }
}

export const ScrollRestoration: FC = () => {
  const location = useSafeLocation();

  useEffect(() => {
    if (!location) return;

    const content = findElementWithScrollbar();
    if (content) {
      const key = `${location.pathname}${location.search}`;
      if (scrollPositions[key]) {
        content.scrollTo(0, scrollPositions[key]);
      }

      const saveScrollPosition = () => {
        scrollPositions[key] = content.scrollTop;
      };

      content.addEventListener("scroll", saveScrollPosition);
      return () => content.removeEventListener("scroll", saveScrollPosition);
    }
  }, [location]);

  return null;
};
