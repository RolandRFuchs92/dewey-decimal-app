import React from 'react';

import { ensureCreated } from './Student.repo';

export default () => {
	ensureCreated();
	return <>Hello World</>;
};
