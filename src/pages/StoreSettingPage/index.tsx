import SettingSideBar from "../../components/Stores/SettingSideBar";
import StoreSection from "../../components/Stores/Dashboard";
import NavBar from "../../components/Stores/Header";
import StoreLayout from "../../components/Stores/StoreLayout";

const StoreSettingPage = () => {
  return (
    <div>
      <StoreLayout>
      <StoreSection />
      </StoreLayout>
    </div>
  );
};

export default StoreSettingPage;
