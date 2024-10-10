import React, { ReactNode } from "react";
import SettingSideBar from "../SettingSideBar";
import NavBar from "../Header";
import { useTranslation } from "../../Translator/Provider";

interface LayoutProps {
  children: ReactNode;
}

const StoreLayout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useTranslation();

  return (
    <div className={`overflow-hidden flex h-screen ${language === "ar" ? "flex-row-reverse" : ""}`}>
      <SettingSideBar />
      <div className={`overflow-y-auto flex flex-col w-full ${language === "ar" ? "rtl-scrollbar" : "ltr-scrollbar"}`}>
        <NavBar />
        <div className="p-4">{children}</div>
        
      </div>
    </div>
  );
};

export default StoreLayout;
