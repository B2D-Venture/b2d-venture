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
  focusedRole: string | null;
  onClick: (role: string) => void;
}

const RoleButton = ({ role, focusedRole, onClick }: RoleButtonProps) => {
  return (
    <div>
      <button
        data-id={`${role}-role`}
        className={`role-button group ${role === focusedRole ? "bg-[#f2efd6]" : "bg-white"
          }`}
        onClick={() => onClick(role)}
      >
        {role === "Investor" ? (
          <div>
            {focusedRole === "Investor" ? (
              <div>
                <div className="flex justify-center">
                  <PiUserListFill size={100} />
                </div>
                <span className="role-text-click">{role}</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-center">
                  <PiUserListBold
                    size={100}
                  />
                </div>
                <span className="role-text-unclick">{role}</span>
              </div>
            )}
          </div>
        ) : (
          <div>
            {focusedRole === "Company" ? (
              <div>
                <div className="flex justify-center">
                  <PiBuildingsFill size={100} />
                </div>
                <span className="role-text-click">{role}</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-center">
                  <PiBuildingsBold size={100} />
                </div>
                <span className="role-text-unclick">{role}</span>
              </div>
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default RoleButton;
