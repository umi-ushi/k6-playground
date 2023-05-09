// https://k6.io/docs/examples/data-parameterization/

import { SharedArray } from 'k6/data';
import { scenario } from 'k6/execution';

import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const data = new SharedArray("params", function() {
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export const options = {
  scenarios: {
    'use-all-the-data': {
      executor: 'shared-iterations',
      iterations: data.length,
      maxDuration: '1h',
    },
  },
};

export default function () {
  const value = data[scenario.iterationInTest].value;
  console.log(`value=${value}`)
}
