import React from 'react';
import SearchFilterInput from '../../components/SearchFilters/SearchFilterInput';
import SectorSelect from '../../components/Selects/SectorSelect';
import useQuery from '../../hooks/useQuery';
import {omit} from 'lodash';

const source = {
	'b5f48308-d433-535a-afb7-f8a8f65ad13a': 'Hello',
	'115bb2fb-5141-52d6-aec4-107611dbd0c4': 'we',
	'4f718e8e-c6dd-5e18-b329-736cd23ae7af': 'peanut_butter_and_jelly_name',
	'5c21f15b-566d-5a63-b60b-568210048fa3': 'Search Me',
	'c69cc800-8cda-534c-9572-6fbee4f904c4': 'QA-Sector-Grp1',
	'b24f70ae-67c7-5a49-9d2e-237dfd8459f5': 'testing_sector_group',
	'cd3f774f-463e-55b0-919f-32d07d8f68a2': 'asdf',
	'd94ae16f-3576-50d8-9259-7125076032c3': '123',
	'59bfa165-2094-5417-8140-b7c2af20b6f8': 'tScheme',
	'd395cf41-80bb-55d9-a088-00a0e78f8ad2': 'FRMS',
	'c1b03049-c1f7-58cc-a1e0-f59ef99ed269': 'PSCMS',
	'ad71002e-0921-5223-b28b-1b31a2ede0c5': 'IAF Sectors - EnMS',
	'505a1df5-b8dc-54b3-bcc3-68a044e47987': 'Food Safety',
	'45cafe5a-77ce-57bc-918c-8092c6f71490': 'SSIP',
	'ee9bbf73-ae4c-523d-b554-6276ae69c567': 'Aerospace',
	'f4b544d3-3cc4-5145-b303-dd584c4b0652': 'ABMS',
	'838e5501-0eca-527f-b65a-d83236bd90b8': 'IAF Sectors - Med Dev',
	'61154b1e-7d6e-58f6-8338-2130b66d49d6': 'CMS',
	'2a9366af-7fd4-52ad-b79e-4dcfdf4ea63c': 'IAF Sectors',
};

function Index() {
	const {query, updateQuery, pushQuery} = useQuery();
	const {sectors_group_id} = query || {};

	function handleChange(selected) {
		const {value} = selected || {};
		const _query = omit(query, ['sectors_group_id']);

		if (!selected) {
			pushQuery(_query);
		}

		updateQuery({...query, sectors_group_id: value});
	}

	return (
		<div>
			<SearchFilterInput name='search' placeholder='Search name' />

			<SectorSelect
				source={source}
				defaultValue={sectors_group_id}
				onChange={handleChange}
				id='sectors'
				name='sector_group'
				placeholder='Select Sector'
			/>
		</div>
	);
}

export default Index;
