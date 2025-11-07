import { motion } from "motion/react";
import { useEffect, useRef, lazy } from "react";
import { SuspenseWrapper } from "../../common/SuspenseWrapper";

// ✅ Lazy load these components
const Overview = lazy(() => import("./OverViewTab/OverviewTab"));
const ItineraryTab = lazy(() => import("./ItineraryTab"));
const MediaTabs = lazy(() => import("./MediaTab/MediaTab"));
// const DatesTab = lazy(() => import("./DatesTab/DatesTab"));

interface TabContentProps {
  activeTab: number;
  tabs: string[];
  setActiveTab: (index: number) => void;
  id: string;
}
const TabContent: React.FC<TabContentProps> = ({ activeTab, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [activeTab, id]);

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 overflow-y-auto pb-4 text-black dark:text-white"
      key={activeTab} // <-- Important: remount between tabs
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <SuspenseWrapper>
        {activeTab === 0 && <Overview id={id} />}
        {activeTab === 1 && <ItineraryTab id={id} />}
        {activeTab === 2 && <MediaTabs id={id} />}
      </SuspenseWrapper>
    </motion.div>
  );
};


export default TabContent;
