"use client";

import { useState } from "react";
import { type WidgetId, project } from "./data";
import { DashboardHeader, type ModalKind } from "./DashboardHeader";
import { AiSearchWidget, SeoWidget } from "./TopWidgets";
import { PositionTrackingWidget } from "./PositionTrackingWidget";
import { PromoWidget, SiteAuditWidget } from "./SiteAuditWidgets";
import { TopPageviewsWidget, TrafficAnalyticsWidget } from "./TrafficWidgets";
import { BacklinksWidget, GscWidget, HiddenWidgets, OrganicRankingsWidget } from "./BottomWidgets";
import { CreateProjectModal, ManageCompetitorsModal, ManageTagsModal, RenameProjectModal, ShareModal } from "./modals";

const SuggestIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M8 1.5a4.5 4.5 0 0 0-2.6 8.2c.4.3.6.7.6 1.2V12h4v-1.1c0-.5.2-.9.6-1.2A4.5 4.5 0 0 0 8 1.5zM6.5 14.5h3M8 5v3M6.5 6.5h3" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Dashboard() {
  const [hidden, setHidden] = useState<WidgetId[]>([]);
  const [modal, setModal] = useState<ModalKind>(null);
  const [name, setName] = useState(project.name);
  const hide = (id: WidgetId) => () => setHidden((h) => [...h, id]);
  const shown = (id: WidgetId) => !hidden.includes(id);
  const close = () => setModal(null);

  return (
    <>
      <DashboardHeader name={name} onOpen={setModal} />
      <div className="flex flex-col gap-6 px-8 pt-4 pb-[162px]">
        {(shown("ai") || shown("seo")) && (
          <div className="grid grid-cols-2 gap-6">
            {shown("ai") && <AiSearchWidget onClose={hide("ai")} />}
            {shown("seo") && <SeoWidget onClose={hide("seo")} />}
          </div>
        )}
        {shown("pt") && <PositionTrackingWidget onClose={hide("pt")} />}
        {(shown("sa") || shown("opsc") || shown("ba") || shown("oti")) && (
          <div className="grid grid-cols-2 items-start gap-6">
            {shown("sa") && <SiteAuditWidget onClose={hide("sa")} />}
            <div className="grid grid-cols-2 gap-x-[23px] gap-y-[22px]">
              {(["opsc", "ba", "oti"] as const).filter(shown).map((id) => (
                <PromoWidget key={id} id={id} onClose={hide(id)} />
              ))}
            </div>
          </div>
        )}
        {shown("ta") && <TrafficAnalyticsWidget onClose={hide("ta")} />}
        {shown("tp") && <TopPageviewsWidget onClose={hide("tp")} />}
        {(shown("or") || shown("bl")) && (
          <div className="grid grid-cols-2 gap-6">
            {shown("or") && <OrganicRankingsWidget onClose={hide("or")} />}
            {shown("bl") && <BacklinksWidget onClose={hide("bl")} />}
          </div>
        )}
        <GscWidget />
        <HiddenWidgets hidden={hidden} onRestore={(id) => setHidden((h) => h.filter((x) => x !== id))} />
        <a href="#" onClick={(e) => e.preventDefault()} className="-mt-[11px] flex w-fit items-center gap-1 text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
          <SuggestIcon />
          Suggest new widget
        </a>
      </div>

      <ManageCompetitorsModal open={modal === "competitors"} onClose={close} />
      <ManageTagsModal open={modal === "tags"} onClose={close} />
      <RenameProjectModal key={String(modal === "rename")} open={modal === "rename"} onClose={close} name={name} onRename={setName} />
      <ShareModal open={modal === "share"} onClose={close} />
      <CreateProjectModal open={modal === "create"} onClose={close} />
    </>
  );
}
