import {
	atom,
	constSelector,
	selector,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

export const accessTokenState = atom({
	key: 'accessToken',
	default: '',
});

export const usernameState = atom({
	key: 'usernameState',
	default: '',
  });

const accessTokenSelector = selector({
	key: 'AccessTokenSelector',
	get: ({ get }) => {
		const accessToken = get(accessTokenState); // 변수명 오타 수정
		console.log('inside selector', accessToken); // 디버깅용, 필요 없다면 삭제
		return accessToken; // 불필요한 괄호 삭제
	}
});
