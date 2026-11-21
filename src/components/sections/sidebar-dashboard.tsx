"use client";

import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import Button from "../buttons/button";
import { useModal } from "@/providers/ModalProvider";
import { Folder } from "@/types/interfaces";
import { Link } from "@react-email/components";

type SidebarDashboardProps = { folders: Folder[] };

export default function SidebarDashboard({ folders }: SidebarDashboardProps) {
  const t = useTranslations("Navigation");
  const { openModal } = useModal();

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
          onClick={() => openModal("new-folder")}
          id="sidebar-add-folder"
          label=""
          type="button"
          className=""
        >
          {t("addFolder")}
        </Button>
        <ul>
          {folders.map((folder) => (
            <li key={folder.slug}>
              <Link href={"/" + folder.slug}>{folder.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
