interface TabsHeaderProps {
  tabs: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => (
  <div className="flex justify-center py-2 px-4 overflow-x-auto">
    <div className="flex gap-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTab(index)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
            activeTab === index
              ? "bg-gray-200 dark:bg-white/20 border border-gray-300/30 dark:border-white/30 shadow-md text-black dark:text-white"
              : "hover:bg-gray-100/20 dark:hover:bg-white/10 text-gray-800 dark:text-gray-300"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

export default TabsHeader;
