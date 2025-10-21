// components/common/SuspenseWrapper.tsx
import { Suspense, type ReactNode } from "react";
import { LoaderOne } from "../ui/Text/Loader";

export const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-full py-10">
          <LoaderOne />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
