"use client";

import { useState } from "react";
import { AddOns, BillingToggle, CompareTable, EnterpriseBlock, Faq, PageIntro, PlanCards, Testimonials } from "./sections";
import { toolkits, type ToolkitSlug } from "./data";

export function PricingPage({ slug }: { slug: ToolkitSlug }) {
  const t = toolkits[slug];
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <PageIntro title={t.title} desc={t.desc} descWidth={t.descWidth} right={<BillingToggle annual={annual} onChange={setAnnual} badge={t.badge} />} />
      <div className="mt-[41px]">
        <PlanCards plans={t.plans} annual={annual} />
      </div>
      <div className="mt-[56px]">
        <CompareTable key={slug} table={t.compare} />
      </div>
      {t.addons && (
        <div className="mt-[58px]">
          <AddOns />
        </div>
      )}
      <div className="mt-[57px]">
        <EnterpriseBlock />
      </div>
      <div className="mt-[56px]">
        <Faq />
      </div>
      <div className="mt-[56px]">
        <Testimonials />
      </div>
    </div>
  );
}
