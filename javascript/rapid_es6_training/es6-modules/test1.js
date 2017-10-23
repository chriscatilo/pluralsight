import { projectId, projectName } from 'module1.js';

export let test1 = () => {
    expect(projectId).toBe(99);
    expect(projectName).toEqual('BuildIt');
};