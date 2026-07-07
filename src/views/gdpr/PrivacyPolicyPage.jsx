"use client";

import { useEffect } from "react";
import Loader from "../../components/common/Loader";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { useGDPR } from "../../hooks/useResources";
import TiptapContent from "../../components/common/TiptapContent";
import { gdprSchema } from "../../helpers/schemas";

const GDPRPolicyPage = () => {
  const { gdprData: privacyData, isLoading: loading } = useGDPR();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="GDPR Compliance Statement"
        description="GDPR Compliance Statement"
      />
            <SchemaMarkup schema={gdprSchema} />
<main className="mx-auto max-w-[1440px] py-10 max-tab:py-5 max-tab:px-25 px-[260px] max-lg:px-[40px] max-md::px-[20px]  space-y-20 max-lg:space-y-10 max-md::space-y-6">
        <div className="space-y-2.5">
          <h1 className="font-40-regular color-black-1 text-center">
            GDPR Compliance Statement
          </h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <TiptapContent
            className="whitespace-normal max-w-none space-y-5"
            content={privacyData?.content}
          />
        )}
      </main>
    </>
  );
};

export default GDPRPolicyPage;
