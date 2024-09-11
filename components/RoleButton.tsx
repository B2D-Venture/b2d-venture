import React from "react";
import {
  PiBuildingsBold,
  PiBuildingsFill,
  PiUserListBold,
  PiUserListFill,
} from "react-icons/pi";
import "../styles/RoleRegister.css";

interface RoleButtonProps {
  role: string;
}

const RoleButton = ({ role = "Investor" }: RoleButtonProps) => {
  return (
    <div>
      <button className="role-button group">
        {role === "Investor" ? (
          <div>
            <PiUserListBold
              size={100}
              color="#181a20"
              className="block group-hover:hidden"
            />
            <PiUserListFill
              size={100}
              color="#181a20"
              className="hidden group-hover:block"
            />
          </div>
        ) : (
          <div>
            <PiBuildingsBold
              size={100}
              color="#181a20"
              className="block group-hover:hidden"
            />
            <PiBuildingsFill
              size={100}
              color="#181a20"
              className="hidden group-hover:block"
            />
          </div>
        )}
        <div className="role-text">
          {role}
        </div>
      </button>
    </div>
  );
};

export default RoleButton;
