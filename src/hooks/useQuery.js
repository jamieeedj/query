import {useMemo} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import qs from 'qs';
import {extend} from 'lodash';
import urlJoin from 'url-join';
import cleanDeep from 'clean-deep';

function useQuery() {
	const [search] = useSearchParams();
	const {pathname} = useLocation();
	const navigate = useNavigate();

	function queryParse(query, options = {ignoreQueryPrefix: true}) {
		return qs.parse(query, options);
	}

	function queryStringify(obj, options) {
		return qs.stringify(obj, options);
	}

	const query = useMemo(() => queryParse(search.toString()), [search]);

	function mergeQuery(objQuery) {
		return extend({}, query, objQuery);
	}

	function buildQueryURL(objQuery) {
		const cleanedQuery = cleanDeep(objQuery);
		const options = {addQueryPrefix: true};
		const strQuery = queryStringify(cleanedQuery, options);

		return urlJoin(pathname, strQuery);
	}

	// commonly used to remove a certain query => directly push a desired query
	// see usage below:

	// const _query = omit(query, 'sectors_group_id');
	//   if (!selected) {
	//     pushQuery(_query);
	//     return false;
	//   }

	function pushQuery(objQuery) {
		const url = buildQueryURL(objQuery);
		return navigate(url);
	}

	function updateQuery(objQuery) {
		let extendedQuery = mergeQuery(objQuery);

		let url = buildQueryURL(extendedQuery);

		return navigate(url);
	}

	return {query, updateQuery, pushQuery, buildQueryURL};
}

export default useQuery;
