import { useRecoilState } from 'recoil';
import { accessTokenState, usernameState } from '../hooks/Auth'; // 상태 atom 임포트
import { useNavigate } from 'react-router-dom';
const useLogout = () => {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
    const [user, setUser] = useRecoilState(usernameState);
    const navigate = useNavigate();
    const logout = () => {
        setAccessToken('');
        setUser('');
        navigate('/main');
    };

    return logout;
};

export default useLogout;