"use client";

import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import Button from "../buttons/button";

export default function SidebarDashboard() {
  const t = useTranslations("Navigation");

  return (
    <aside className="sidebar sidebar-dashboard">
      <div className="sidebar-group">
        <ul>
          <li>
            <Button
              onClick={() => redirect("/dashboard")}
              id="dashboard-home"
              label=""
              type="button"
              className=""
            >
              {t("homePage")}
            </Button>
          </li>
          <li>
            <Button
              onClick={() => redirect("/dashboard/library")}
              id="dashboard-library"
              label=""
              type="button"
              className=""
            >
              {t("library")}
            </Button>
          </li>
        </ul>
      </div>
      <div className="sidebar-group-separator"></div>
      <div className="sidebar-group">
        <div className="sidebar-group-heading">{t("folders")}</div>
        <Button
          onClick={() => redirect("/dashboard")}
          id="sidebar-add-folder"
          label=""
          type="button"
          className=""
        >
          {t("addFolder")}
        </Button>
      </div>
    </aside>
  );
}
