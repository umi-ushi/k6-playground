// https://k6.io/docs/using-k6/scenarios/executors/constant-vus/
// 指定されたVUが指定された期間可能な限り多くの反復を実行するエグゼキューター

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },
};

export default function () {
  const res = http.get('http://localhost:4010/users');
  sleep(0.5);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
