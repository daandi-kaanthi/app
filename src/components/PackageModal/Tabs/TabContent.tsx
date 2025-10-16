import { motion } from "motion/react";
import { useRef } from "react";
import Overview from "./OverviewTab";
import { MediaTabs } from "./MediaTab";
import { AiTab } from "./AiTab";
import { DatesTab } from "./DatesTab";

interface TabContentProps {
  activeTab: number;
  tabs: string[];
  setActiveTab: (index: number) => void;
  id: string;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  tabs,
  setActiveTab,
  id
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDragEnd = (_: any, info: any) => {
    const threshold = 25;
    if (info.offset.x < -threshold && activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    } else if (info.offset.x > threshold && activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Overview id={id} />;
      case 1:
        return <MediaTabs id={id} />;
      case 2:
        return <AiTab id={id} />;
      case 3:
        return <DatesTab id={id} />;
      default:
        return <Overview id={id} />;
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-1 pb-4 text-black dark:text-white"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
    >
      {renderTabContent()}
    </motion.div>
  );
};

export default TabContent;
