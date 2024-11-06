// Navbar.jsx
import React, { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import Avatar from "react-avatar";
import { ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../Api/api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickAway = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("id");

      if (!userId) {
        throw new Error("User ID not found");
      }

      const response = await logout({userId});

      if (response.success) {
        localStorage.clear();
        navigate("/login");
      } else {
        throw new Error(response.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setLoading(false);
      setDropdownOpen(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="navbar flex items-center px-[100px] h-[90px] flex-row justify-between w-full bg-gray-200">
        <div className="logo">
          <img src={Logo} alt="logo" className="h-auto" />
        </div>
        <div className="right flex flex-row items-center">
          <div className="searchBar relative mr-4">
            <input
              type="search"
              name="search"
              id="search"
              className="border border-gray-700 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 w-[350px] focus:ring-blue-400 pl-10"
              placeholder="Search..."
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="profile relative">
            <Avatar
              name={localStorage.getItem("name")}
              size="40"
              round="50%"
              className="cursor-pointer"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    {/* {loading ? 'Logging out...' : 'Logout'} */}
                    logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Navbar;
