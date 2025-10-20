import { motion } from "motion/react";
import { useRef } from "react";
import Overview from "./OverViewTab/OverviewTab";
import { MediaTabs } from "./MediaTab/MediaTab";
// import { AiTab } from "./AiTab";
import { DatesTab } from "./DatesTab/DatesTab";

interface TabContentProps {
  activeTab: number;
  tabs: string[];
  setActiveTab: (index: number) => void;
  id: string;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  id
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <DatesTab id={id} />;
      case 1:
        return <Overview id={id} />;
      case 2:
        return <MediaTabs id={id} />;
      // case 2:
      //   return <AiTab id={id} />;
      default:
        return <Overview id={id} />;
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
