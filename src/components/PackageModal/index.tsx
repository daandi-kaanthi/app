import { AnimatePresence, motion } from "motion/react";
import { forwardRef, Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import TabsHeader from "./Tabs/TabsHeader";
import TabContent from "./Tabs/TabContent";
import { useTranslation } from "react-i18next";
import { DateAvailabilityDisplay } from "./Tabs/DatesTab/DateAvailability";
import { useSelectedTravelPackage } from "../../redux/slices/Travel/TravelSlice";
import { LoaderFour } from "../ui/Text/Loader";
import ModalHeader from "./ModalHeader";
import { TrekAddOnProvider } from "../../context/TrekAddOnContext";
// import { Description } from "../ui/Text/Description";

const tabSlugs = ["overview", "itinerary", "gallery"];

export const PackageModal = forwardRef<HTMLDivElement>((_, ref) => {
  const {
    id = "",
    title = "",
    tab,
  } = useParams<{ id: string; title: string; tab?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const tabs = useMemo(
    () => [t("tabOverview"), t("tabItinerary"), t("tabGallery")],
    [t]
  );

  const travelPackage = useSelectedTravelPackage(id);

  useEffect(() => {
    if (!id) return;
    navigate(`/package/${id}/${title}/${tabSlugs[activeTab]}`, {
      replace: true,
    });
  }, [activeTab, id, title, navigate]);

  useEffect(() => {
    const tabIndex = tab ? tabSlugs.indexOf(tab) : 1;
    if (tab && tabIndex >= 0 && tabIndex !== activeTab) {
      setActiveTab(tabIndex);
    }
  }, [tab]);
  const onClose = () => {
    navigate("/");
  };

  return (
    <TrekAddOnProvider>
      <AnimatePresence>
        <ModalContainer ref={ref} id={id}>
          {!id ? (
            <div className="p-6 text-center"></div>
          ) : (
            <>
              <ModalHeader onClose={onClose} />
              <LoaderFour text={travelPackage?.title} />
              {/* <Description description={travelPackage?.subtitle || ""} className="bg-white/90 dark:bg-black/90" /> */}
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
        <Suspense fallback={null}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <DateAvailabilityDisplay id={id} />
          </motion.div>
        </Suspense>
      )}
    </TrekAddOnProvider>
  );
});
