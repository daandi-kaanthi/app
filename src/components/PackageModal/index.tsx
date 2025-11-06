import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import TabsHeader from "./Tabs/TabsHeader";
import TabContent from "./Tabs/TabContent";
import { useTranslation } from "react-i18next";
import { DateAvailabilityDisplay } from "./Tabs/DatesTab/DateAvailability";

const tabSlugs = ["overview", "itinerary", "gallery", "dates"];

export const PackageModal = forwardRef<HTMLDivElement>((_, ref) => {
  const {
    id = "",
    title = "",
    tab,
  } = useParams<{ id: string; title: string; tab?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(3);

  const tabs = useMemo(
    () => [t("tabOverview"), t("tabItinerary"), t("tabGallery")],
    [t]
  );

  useEffect(() => {
    if (!id) return;
    navigate(`/package/${id}/${title}/${tabSlugs[activeTab]}`, {
      replace: true,
    });
  }, [activeTab, id, title, navigate]);

  useEffect(() => {
    const tabIndex = tab ? tabSlugs.indexOf(tab) : 3;
    if (tab && tabIndex >= 0 && tabIndex !== activeTab) {
      setActiveTab(tabIndex);
    }
  }, [tab]);

  return (
    <>
      <AnimatePresence>
        <ModalContainer ref={ref} id={id}>
          {!id ? (
            <div className="p-6 text-center"></div>
          ) : (
            <>
              <TabsHeader
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <TabContent
                activeTab={activeTab}
                tabs={tabs}
                setActiveTab={setActiveTab}
                id={id}
              />
            </>
          )}
        </ModalContainer>
      </AnimatePresence>

      {/* ✅ Floating bottom button (outside modal) */}
      {id && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <DateAvailabilityDisplay id={id} />
        </motion.div>
      )}
    </>
  );
});
