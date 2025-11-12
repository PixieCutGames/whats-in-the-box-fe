import { useNavigate } from "react-router";
import useUser from "../../shared/hooks/useUser";

function Dashboard() {
  const { userDetails, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div>
      {userDetails?.user.name}
      <div className="mt-4">
        <button
          onClick={() => {
            logout();
            console.log("logout");

            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
