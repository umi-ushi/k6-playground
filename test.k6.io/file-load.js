// Reference URL https://k6.io/docs/examples/data-parameterization/

import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { sleep } from 'k6';
import { md5 } from 'k6/crypto';
import http from 'k6/http';

// Using shared array to minimize loading
const params = new SharedArray("params", function() {
  return papaparse.parse(open('./data.csv'), { header: true }).data;
});

export default function () {
  console.log(`========value:${choiceData()}===============================`)
  http.get("https://test.k6.io");
}

function choiceData(){
  let randomIndex =  getRandomInt(0, params.length-1);
  return params[randomIndex].value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
