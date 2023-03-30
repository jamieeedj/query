import React, {useCallback} from 'react';
import {debounce} from 'lodash';
import useQuery from '../../hooks/useQuery';

function SearchFilterInput(props) {
	const {name, placeholder} = props;

	const {updateQuery} = useQuery();

	function handleChange(e) {
		const value = e.target.value;

		if (!value) {
			updateQuery({[name]: ''});
		} else {
			updateQuery({[name]: value});
		}
	}

	const handleChangeDebounce = useCallback(debounce(handleChange, 500));

	return (
		<input
			type='search'
			autoComplete='off'
			name={name}
			onChange={handleChangeDebounce}
			placeholder={placeholder}
		/>
	);
}

export default SearchFilterInput;
