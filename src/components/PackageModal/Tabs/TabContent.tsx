import { motion } from "motion/react";
import { useEffect, useRef, lazy } from "react";
import { SuspenseWrapper } from "../../common/SuspenseWrapper";

// ✅ Lazy load these components
const Overview = lazy(() => import("./OverViewTab/OverviewTab"));
const ItineraryTab = lazy(() => import("./ItineraryTab"));
const MediaTabs = lazy(() => import("./MediaTab/MediaTab"));
const DatesTab = lazy(() => import("./DatesTab/DatesTab"));

interface TabContentProps {
  activeTab: number;
  tabs: string[];
  setActiveTab: (index: number) => void;
  id: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeTab, id]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <SuspenseWrapper>
            <Overview id={id} />
          </SuspenseWrapper>
        );
      case 1:
        return (
          <SuspenseWrapper>
            <ItineraryTab id={id} />
          </SuspenseWrapper>
        );
      case 2:
        return (
          <SuspenseWrapper>
            <MediaTabs id={id} />
          </SuspenseWrapper>
        );
      case 3:
        return (
          <SuspenseWrapper>
            <DatesTab id={id} />
          </SuspenseWrapper>
        );
      default:
        return (
          <SuspenseWrapper>
            <Overview id={id} />
          </SuspenseWrapper>
        );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-1 pb-4 text-black dark:text-white"
    >
      {renderTabContent()}
    </motion.div>
  );
};

export default TabContent;
