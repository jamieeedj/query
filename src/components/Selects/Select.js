import React from 'react';
import {keys} from 'lodash';
import equal from 'deep-equal';

import ReactSelect from 'react-select';

function withObjectSource(Component) {
	return function (props) {
		const {name, defaultValue, source, ...rest} = props;

		const _options = keys(source).map((key) => {
			return {
				label: source[key],
				value: key,
			};
		});

		const _defaultValue = _options.find((option) => {
			return equal(option.value, defaultValue);
		});

		return (
			<Component
				name={name}
				options={_options}
				defaultValue={_defaultValue}
				{...rest}
			/>
		);
	};
}

function Select(props) {
	const {id, name, onChange, placeholder, defaultValue, options, ...rest} =
		props;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<ReactSelect
				id={id}
				options={options}
				name={name}
				placeholder={placeholder}
				defaultValue={defaultValue}
				onChange={onChange}
				isClearable={true}
				{...rest}
			/>
		</div>
	);
}

export default withObjectSource(Select);

{
	/* <label htmlFor={id}>{placeholder}</label>
<select
	id={id}
	defaultValue={defaultValue}
	name={name}
	onChange={(e) => onChange(e.target)}
	{...rest}
>
	{options.map((v, index) => {
		const {label, value} = v || {};

		return (
			<option key={index} value={value}>
				{label}
			</option>
		);
	})}
</select> */
}
