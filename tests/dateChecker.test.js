import { checkForDate } from '../src/client/js/dateChecker';

test('correct date format', () => {
  expect(checkForDate('05/01/2020')).toBeTruthy();
});
