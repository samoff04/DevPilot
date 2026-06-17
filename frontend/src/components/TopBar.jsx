import { useNavigate } from "react-router-dom";

export default function TopBar({ createNewChat }) {

  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  return (
    <div className="topbar">

      <div className="brand">DevPilot</div>

      <div className="topbar-actions">

        <button onClick={createNewChat} className="top-btn">
          New Chat
        </button>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>

      </div>

    </div>
  );
}