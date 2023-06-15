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

	// 'qs' package parses the 'search' returned by the useSearchParams hook
	// when parsed, it returns an object that has key value pairs

	// e.g.
	// search: name=james
	// const query = qs.parse(search)
	// returns {name: 'james'}

	// if an argument like this is passed
	// search: name
	// const query = qs.parse(search)
	// returns {name: ''}

	// so at the bare minimum it will return a key using the passed arg
	// '=' sign acts as a separator to create the key value pair

	// use ignoreQueryPrefix to remove leading '?' sign

	const query = useMemo(() => queryParse(search.toString()), [search]);

	function queryParse(query, options = {ignoreQueryPrefix: true}) {
		return qs.parse(query, options);
	}

	// the stringify function of the qs package does the opposite
	// it receives an object as an argument
	// then it returns a string

	// e.g.
	// object: {name: 'james'}
	// const stringified = qs.stringify(object)
	// returns name=james

	// wont return a value if passed a string
	// it uses '=' as a separator

	function queryStringify(obj, options) {
		return qs.stringify(obj, options);
	}

	// mergeQuery function
	// this basically extends the existing query and the new query

	function mergeQuery(objQuery) {
		return extend({}, query, objQuery);
	}

	// buildQueryURL

	// cleans the passed objQuery
	// Removes empty objects, arrays, empty strings, NaN, null and undefined values from objects. Does not alter the original object.
	// stringifies the cleaned query
	// then uses urlJoin to concat the pathname and the stringified query

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

	// pushQuery
	// this function builds the query, concats it with the pathname and navigates to it
	// this is useful for removing a specific part of a query

	function pushQuery(objQuery) {
		const url = buildQueryURL(objQuery);
		return navigate(url);
	}

	// updateQuery
	// this function extends from the existing query with the objQuery passed as an argument
	// builds, concats and navigates to it

	function updateQuery(objQuery) {
		let extendedQuery = mergeQuery(objQuery);
		return pushQuery(extendedQuery);
	}

	return {query, updateQuery, pushQuery, buildQueryURL};
}

export default useQuery;
