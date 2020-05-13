import layoutSettings from 'layout.json';
import { mocked } from 'ts-jest/utils';

import { mapWindowPathNameToPageTitle } from './businessRules';

jest.mock('layout.json', () => {
  const menuItems = [
    {
      label: 'Home',
      icon: 'Home',
      path: '/home'
    },
    {
      label: 'School',
      icon: 'school',
      menuItems: [
        {
          label: 'Student',
          icon: 'student',
          path: '/students'
        },
        {
          label: 'Class',
          icon: 'class',
          path: '/school/class'
        },
        {
          label: 'Teachers',
          icon: 'teacher',
          path: '/school/teacher'
        }
      ]
    }
  ];
  return {
    mainMenu: menuItems
  };
});
const mockedLayoutSettings = mocked(layoutSettings);

describe('mapWindowPathNameToPageTitle', () => {
  it('should map /home to Home', () => {
    const path = '/home';
    const result = mapWindowPathNameToPageTitle(path);
    expect(result).toBe('Home');
  });

  it('should map /students to Student.', () => {
    const path = '/students';
    const result = mapWindowPathNameToPageTitle(path);
    expect(result).toBe('Student');
  });

  it('should map /school/teacher to Teachers', () => {
    const path = '/school/teacher';
    const result = mapWindowPathNameToPageTitle(path);
    expect(result).toBe('Teachers');
  });

  it('should map bad route to no title', () => {
    const path = '/foobar';
    const result = mapWindowPathNameToPageTitle(path);
    expect(result).toBe('No title.');
  });
});
