import { Suspense } from "react";
import SurveyPage from "@/views/survey/SurveyPage";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SurveyPage />
    </Suspense>
  );
}
