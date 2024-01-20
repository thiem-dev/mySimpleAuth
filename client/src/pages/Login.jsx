//login.jsx
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        axios.get('/profile').then(({ data }) => {
          setUserData(data);
        });
        toast.success('Login Success!');
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.request) {
        toast.error(
          'request sent, no response received from server. Check console and server logs'
        );
      } else {
        toast.error(data.error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
