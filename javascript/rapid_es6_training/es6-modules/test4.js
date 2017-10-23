import { project, testChanges } from 'module4.js';

export let test4a = () => {
    project.projectId = 0;
    expect(project.projectId).toBe(0);
};

export let test4b = () => {
    project.projectId = 1;
    project.projectName = 'Done';
    testChanges(1, 'Done');
}