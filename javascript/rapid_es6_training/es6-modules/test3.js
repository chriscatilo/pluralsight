import { projectId, projectName } from 'module3.js';

export let test3a = () => {
    expect(projectId).toBe(99);
    expect(projectName).toEqual('BuildIt');
};

import * as vals from 'module3.js';

export let test3b = () => {
    expect(vals.projectId).toBe(99);
    expect(vals.projectName).toEqual('BuildIt');
};