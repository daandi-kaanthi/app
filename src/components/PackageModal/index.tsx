import { AnimatePresence } from "motion/react";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderFour } from "../ui/Text/Loader";
import ModalOverlay from "../ui/modal/ModalOverlay";
import ModalContainer from "../ui/modal/ModalContainer";
import ModalHeader from "../ui/modal/ModalHeader";
import TabsHeader from "./Tabs/TabsHeader";
import TabContent from "./Tabs/TabContent";
import { useSelectedTravelPackage } from "../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";

const tabSlugs = ["overview", "itinerary", "gallery", "dates"];

export const PackageModal = forwardRef<HTMLDivElement>((_, ref) => {
  const { id = "",title, tab } = useParams<{ id: string;title:string; tab?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const travelPackage = useSelectedTravelPackage(id);

  // Determine active tab index from URL
  const initialTabIndex = tab ? tabSlugs.indexOf(tab) : 0;
  const [activeTab, setActiveTab] = useState(
    initialTabIndex >= 0 ? initialTabIndex : 0
  );

  const tabs = useMemo(
    () => [
      t("tabOverview"),
      t("tabItinerary"),
      t("tabGallery"),
      t("tabDates"),
    ],
    [t]
  );

  // Update URL when tab changes
  useEffect(() => {
    if (!id) return;
    navigate(`/package/${id}/${title}/${tabSlugs[activeTab]}`, { replace: true });
  }, [activeTab, id, navigate]);

 const closeModal = () => {
  // If history length > 2 (current + previous), go back
  if (window.history.length > 2) {
    navigate(-1);
  } else {
    navigate("/", { replace: true }); // fallback for direct links
  }
};

  // Sync activeTab if URL changes (e.g., user shares /package/:id/:tab)
  useEffect(() => {
    const tabIndex = tab ? tabSlugs.indexOf(tab) : 0;
    if (tabIndex >= 0 && tabIndex !== activeTab) {
      setActiveTab(tabIndex);
    }
  }, [tab]);

  const modalContent = useMemo(
    () => (
      <AnimatePresence>
        {id && travelPackage && (
          <>
            <ModalOverlay onClick={closeModal} />
            <ModalContainer ref={ref} id={id}>
              <ModalHeader onClose={closeModal} />
              <LoaderFour text={travelPackage.title} />
              <TabsHeader
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <TabContent activeTab={activeTab} tabs={tabs} setActiveTab={setActiveTab} id={id} />
            </ModalContainer>
          </>
        )}
      </AnimatePresence>
    ),
    [id, activeTab, travelPackage, tabs]
  );

  return modalContent;
});
