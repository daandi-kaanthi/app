import { AnimatePresence } from "motion/react";
import { forwardRef, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import TabsHeader from "../../../components/PackageModal/Tabs/TabsHeader";
import ProfileTabContent from "./ProfileTabContent";

export const PackageModal = forwardRef(() => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = useMemo(
    () => [t("currentTrip"), t("oldTrips") /*t("tabAskAi"),*/],
    [t]
  );
  const id = "Shubham";

  const modalContent = useMemo(
    () => (
      <AnimatePresence>
        <>
          {/* <ModalImage title={active.title} image={active.image} id={id} /> */}
          <TabsHeader
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <ProfileTabContent
            activeTab={activeTab}
            tabs={tabs}
            setActiveTab={setActiveTab}
            id={id}
          />
        </>
      </AnimatePresence>
    ),
    [activeTab]
  );

  return modalContent;
});
