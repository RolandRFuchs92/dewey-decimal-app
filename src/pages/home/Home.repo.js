import { format } from 'date-fns';

import { getStudentsWithBirthdays } from 'pages/students';

export const getBirthdays = async () => {
    return await getStudentsWithBirthdays(format(new Date(), 'YYYY-mm-dd'));
}