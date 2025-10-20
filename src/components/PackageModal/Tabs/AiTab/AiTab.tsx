import { Description } from "../../../ui/Text/Description";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useSelectedTravelPackage } from "../../../redux/slices/Travel/TravelSlice";
import type { AppDispatch } from "../../../../redux/store";
import { useTranslation } from "react-i18next";

interface AiTabProps {
  id: string;
}

export const AiTab = ({ id }: AiTabProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  // const selectedTravelPackage = useSelectedTravelPackage(id);

  useEffect(() => {
    // dispatch(
    //   fetchSingleTravelPackageApi({
    //     itemId: id,
    //     select: "description",
    //   })
    // );
  }, [dispatch, id]);

  return (
    <div className="bg-black/40 rounded-xl p-4 md:p-8 pb-28 text-white border border-white/20 shadow-xl">
      <div className="md:flex-row items-center">
        <div className="w-full mb-4 md:mb-0 md:pr-6 lg:pr-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-white">
            {t('aiTab.needHelpPlanning')}
          </h2>
        </div>
        <div className="w-full bg-black/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 shadow-xl">
          {/* <AiPromptGenerator ... /> */}
        </div>
      </div>

      <Description
        className="text-gray-200 mb-3 md:mb-4 text-sm md:text-base pt-6"
        description={t('aiTab.description')}
      />

      <div className="flex items-center space-x-2 mb-2 md:mb-6">
        <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
        <p className="text-white text-sm md:text-base">{t('aiTab.instantAnswers')}</p>
      </div>

      <div className="flex items-center space-x-2 mb-2 md:mb-6">
        <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
        <p className="text-white text-sm md:text-base">{t('aiTab.personalizedSuggestions')}</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
        <p className="text-white text-sm md:text-base">{t('aiTab.virtualAssistance')}</p>
      </div>
    </div>
  );
};
