import { useVirtualKeyboardVisible } from "hooks/hooks";
import React, { FC, useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Updated to `react-router-dom` for correct routing
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";

// Define the available tabs
const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/notification": {
    label: "Thông báo",
    icon: <Icon icon="zi-notif" />,
  },
  "/cart": {
    label: "Giỏ hàng",
    icon: <CartIcon />,
    activeIcon: <CartIcon active />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};

// Define the keys for tabs
export type TabKeys = keyof typeof tabs;

// List of pages where the bottom navigation should not be displayed
export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyboardVisible = useVirtualKeyboardVisible();

  // Determine if the current page is in the exclusion list
  const noBottomNav = useMemo(() => NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname), [location.pathname]);

  // Set the active tab based on the current location
  const [activeTab, setActiveTab] = useState<TabKeys>(location.pathname as TabKeys);

  useEffect(() => {
    // Update the active tab whenever the location changes
    setActiveTab(location.pathname as TabKeys);
  }, [location.pathname]);

  // Skip rendering the bottom navigation if the page is in the exclusion list or if the keyboard is visible
  if (noBottomNav || keyboardVisible) {
    return null;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={activeTab}
      onChange={(key: TabKeys) => setActiveTab(key)} // Update active tab on change
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => navigate(path)} // Navigate to the selected tab
        />
      ))}
    </BottomNavigation>
  );
};
