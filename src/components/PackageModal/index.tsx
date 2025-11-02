import { AnimatePresence } from "motion/react";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderFour } from "../ui/Text/Loader";
import { Description } from "../ui/Text/Description";
import ModalContainer from "./ModalContainer";
import TabsHeader from "./Tabs/TabsHeader";
import TabContent from "./Tabs/TabContent";
import { useSelectedTravelPackage } from "../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";
import TravelExplorer from "./HomeModalData";

const tabSlugs = ["overview", "itinerary", "gallery", "dates"];

export const PackageModal = forwardRef<HTMLDivElement>((_, ref) => {
  const { id = "", title = "", tab } = useParams<{ id: string; title: string; tab?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const travelPackage = useSelectedTravelPackage(id);

  // Determine active tab index from URL
  const initialTabIndex = tab ? tabSlugs.indexOf(tab) : 0;
  const [activeTab, setActiveTab] = useState(
    initialTabIndex >= 0 ? initialTabIndex : 0
  );

  const tabs = useMemo(
    () => [t("tabOverview"), t("tabItinerary"), t("tabGallery"), t("tabDates")],
    [t]
  );

  // Update URL when tab changes (only if id exists)
  useEffect(() => {
    if (!id) return;
    navigate(`/package/${id}/${title}/${tabSlugs[activeTab]}`, { replace: true });
  }, [activeTab, id, title, navigate]);

  // Sync tab index if URL changes
  useEffect(() => {
    const tabIndex = tab ? tabSlugs.indexOf(tab) : 0;
    if (tabIndex >= 0 && tabIndex !== activeTab) {
      setActiveTab(tabIndex);
    }
  }, [tab]);

  // Rendered content
  const modalContent = useMemo(
    () => (
      <AnimatePresence>
        <>
          <ModalContainer ref={ref} id={id}>

            {/* Default modal when no id */}
            {!id ? (
              <div className="p-6 text-center">
            <TravelExplorer />
              </div>
            ) : (
              <>
                <LoaderFour text={travelPackage?.title} />
                <Description description={travelPackage?.subtitle || ""} />
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
        </>
      </AnimatePresence>
    ),
    [id, activeTab, travelPackage, tabs, t]
  );

  return modalContent;
});
