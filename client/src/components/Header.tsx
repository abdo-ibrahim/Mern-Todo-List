import api, { authApi } from "@/utils/api";
import getUserFromToken from "@/utils/getUserFromToken";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const user = getUserFromToken();
  const location = useLocation();
  const navigate = useNavigate();

  const getPageName = (path: string): string => {
    switch (path) {
      case "/login":
        return "login";
      case "/signup":
        return "signup";
      default:
        return "home";
    }
  };
  const currentPage = getPageName(location.pathname);
  // const handleSignOut = () => {
  //   Cookies.remove("token");
  //   navigate("/login");
  // };

  const handleSignOut = async () => {
    try {
      await api.get(`${authApi}/logout`);
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <header className="bg-primary text-white p-2 h-[56px] flex items-center">
      <div className="container flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold cursor-pointer">
          TodoList
        </Link>

        <div className="flex items-center gap-4 flex-1 ">
          {currentPage === "home" && (
            <>
              <span className="text-lg flex flex-1 text-center justify-center font-[500]">Hello {user?.name}</span>
              <Button className="bg-secondary text-primary px-3 py-2 rounded-lg hover:bg-gray-100 transition duration-300" onClick={handleSignOut}>
                SignOut
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
