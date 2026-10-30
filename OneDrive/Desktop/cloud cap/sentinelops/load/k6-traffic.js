import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    browse: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [{ target: 20, duration: '2m', mode: 'steady-state' }],
    },
    checkout: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [{ target: 5, duration: '2m', mode: 'steady-state' }],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:8080';
const PATH = __ENV.TARGET_PATH || '/orders';

export default function () {
  const res = http.get(`${BASE_URL}${PATH}`);
  check(res, { 'status ok': (r) => r.status === 200 || r.status === 201 });
  sleep(1);
}
