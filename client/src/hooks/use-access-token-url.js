import * as React from 'react'
import { useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { USER_TOKEN, setStorageAccessToken } from '../helpers/authentication';
import { authSet } from "../plugins/http";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/slices/user'


function useWatchURLToken() {
	const dispatch = useDispatch()
	const effectRan = useRef(false)
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const accessTokenURL = searchParams.get(USER_TOKEN)

	const successToast = useToast({
		position: 'top',
		title: 'Login was successful.',
		isClosable: true,
	})

	// const errToast = (err) =>
	// 	useToast({
	// 		position: 'top',
	// 		title: err.message,
	// 		isClosable: true,
	// 	});


	useEffect(() => {
		if (!effectRan.current) {
			if (accessTokenURL && accessTokenURL.length) {
				authSet(accessTokenURL);
				setStorageAccessToken(accessTokenURL);

				searchParams.delete(USER_TOKEN);
				setSearchParams(searchParams);

				dispatch(fetchUser())
				.then(() => successToast())
				// .catch((err) => errToast(err))

				return () => { effectRan.current = true; }
			}
		}
	}, [location, searchParams])

	return null
}

export default useWatchURLToken;
