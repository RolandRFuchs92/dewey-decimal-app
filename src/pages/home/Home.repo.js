import { format } from 'date-fns';

import { getStudentsWithBirthdays } from 'pages/student/Student.repo';

export const getBirthdays = async () => {
    return await getStudentsWithBirthdays(format(new Date(), 'yyyy-MM-dd'));
}