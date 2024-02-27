
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from './useAuthRedirect';

const useAuthRedirectAdmin = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useAuthRedirect()
  useEffect(() => {
          if (userInfo && userInfo.role !== 'admin') {
            navigate('/', { replace: true });
          }
        }, [userInfo, navigate]);
      };

export default useAuthRedirectAdmin;
