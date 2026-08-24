import { useEffect, useState } from "react";

const TAB_ANIMATION_MS = 600;

export function useTabTransition(defaultTab) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [displayedTab, setDisplayedTab] = useState(defaultTab);
  const [closing, setClosing] = useState(false);

  const changeTab = (tab) => {
    if (tab === activeTab) {
      return;
    }
    setActiveTab(tab);
    setClosing(true);
  };

  useEffect(() => {
    if (!closing) {
      return undefined;
    }
    const timer = setTimeout(() => {
      setDisplayedTab(activeTab);
      setClosing(false);
    }, TAB_ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [closing, activeTab]);

  return { activeTab, displayedTab, closing, changeTab };
}
