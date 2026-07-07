"use client";

import { useEffect } from "react";
import Loader from "../../components/common/Loader";
import HelmetWrapper from "../../components/common/HelmetWrapper";
import SchemaMarkup from "../../components/common/SchemaMarkup";
import { usePrivacyPolicy } from "../../hooks/useResources";
import TiptapContent from "../../components/common/TiptapContent";
import { privacySchema } from "../../helpers/schemas";

const PrivacyPolicyPage = () => {
  const { privacyData, isLoading: loading } = usePrivacyPolicy();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HelmetWrapper
        title="Privacy and Cookie Policy"
        description="Website Privacy and Cookie Policy"
      />
            <SchemaMarkup schema={privacySchema} />
<main className="mx-auto max-w-[1440px] py-10 max-tab:py-5 max-tab:px-25 px-[260px] max-lg:px-[40px] max-md::px-[20px]  space-y-20 max-lg:space-y-10 max-md::space-y-6">
        <div className="space-y-2.5">
          <h1 className="font-40-regular color-black-1 text-center">
            Website Privacy and Cookie Policy
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

export default PrivacyPolicyPage;
