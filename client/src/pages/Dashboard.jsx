import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const Dashboard = () => {
  const { userData } = useContext(UserContext);

  console.log(userData);

  return (
    <div>
      <h1>Dashboard</h1>
      {!!userData && <h2>{userData.user.name} successfully logged in</h2>}
    </div>
  );
};
export default Dashboard;
