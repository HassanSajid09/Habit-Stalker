import NavBar from "../Layout/NavBar";
import SidePanel from "../Layout/SidePanel";

const Profile = () => {
  return (
    <>
      <div className="block md:hidden w-full fixed top-0 left-0 z-20">
        <NavBar />
      </div>
      <SidePanel/>
    </>
  );
};

export default Profile;
