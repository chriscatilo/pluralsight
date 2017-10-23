import { test1 } from 'test1.js';
import { test1 as test1a } from 'test1.js';
import { test2a, test2b } from 'test2.js';
import { test3a, test3b } from 'test3.js';
import { test4a, test4b } from 'test4.js';

describe('ES6 Modules', () => {
    it('Import and export command are the basic way for communication of information', test1);
    it('We can assign alias to imported variable', test1a);
    it('Import statements are hoisted', test1b);
    it('We can define a default variable to export', test2a);
    it('...we use an alias when importing a default variable', test2b);
    it('One or more variables can be exported using the curly brackets', test3a);
    it('...and can be imported as a whole', test3b);
    it('Values and references imported are readonly, but object properties are mutable', test4a);
    it('...and their values are accessible from the imported module', test4b);
});

import { test1 as test1b } from 'test1.js';