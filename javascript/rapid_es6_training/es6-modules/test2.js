import someValue1 from 'module2.js';

export let test2a = () => {
    expect(someValue1).toEqual('BuildIt');
};

import { default as someValue2 } from 'module2.js'

export let test2b = () => {
    expect(someValue2).toEqual('BuildIt');
};