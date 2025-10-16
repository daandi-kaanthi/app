import { AnimatePresence } from "motion/react";
import { forwardRef, useState, useMemo } from "react";
import { LoaderFour } from "../ui/Text/Loader";
import { Description } from "../ui/Text/Description";
import ModalOverlay from "./ModalOverlay";
import ModalContainer from "./ModalContainer";
import ModalHeader from "./ModalHeader";
// import ModalImage from "../ui/Image/ModalImage";
import TabsHeader from "./Tabs/TabsHeader";
import TabContent from "./Tabs/TabContent";
import {
  useSelectedTravelPackage,
} from "../../redux/slices/Travel/TravelSlice";
import { useTranslation } from "react-i18next";

interface PackageModalProps {
  id: string;
  onClose: () => void;
}

export const PackageModal = forwardRef<HTMLDivElement, PackageModalProps>(
  ({  id, onClose }, ref) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(0);

    const travelPackage = useSelectedTravelPackage(id);

    const tabs = useMemo(
      () => [t("tabOverview"), t("tabGallery"), /*t("tabAskAi"),*/ t("tabDates")],
      [t]
    );
    const modalContent = useMemo(
      () => (
        <AnimatePresence>
          {id && (
            <>
              <ModalOverlay onClick={onClose} />
              <ModalContainer ref={ref} id={id}>
                <ModalHeader onClose={onClose} />
                <LoaderFour text={travelPackage?.title} />
                <Description description={travelPackage?.subtitle || ""} />

                {/* <ModalImage title={active.title} image={active.image} id={id} /> */}
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
              </ModalContainer>
            </>
          )}
        </AnimatePresence>
      ),
      [id, activeTab]
    );

    return modalContent;
  }
);
