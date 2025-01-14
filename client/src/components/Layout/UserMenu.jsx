import React from "react";
import { NavLink } from "react-router-dom";

// Import Lucide icons
import { User, ShoppingCart } from "lucide-react";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <h3 className="mt-4">User Panel</h3>

        {/* Profile Link */}
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <User className="me-2 text-primary" size={20} />
          Profile
        </NavLink>

        {/* Orders Link */}
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <ShoppingCart className="me-2 text-primary" size={20} />
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
