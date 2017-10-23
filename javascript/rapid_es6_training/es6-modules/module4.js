export let project = {
    projectId: 99,
    projectName: 'BuildIt'
}
export let testChanges = (projectId, projectName) => {
    expect(project.projectId).toEqual(projectId);
    expect(project.projectName).toEqual(projectName);
}