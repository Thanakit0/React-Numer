import {Calbisection} from './BisectionCal'

test("testcal_bi", () => {
  let cal = Calbisection("x^4-13", 1.5, 2);
  expect(cal.xnew).toBe(1.8988288640975952);
});


