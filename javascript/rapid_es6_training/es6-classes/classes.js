describe('ES6 Classes', () => {
    it('Classes are constructed using the class keyword but are function type', () =>{
        class Task {};
        expect(typeof Task).toBe('function');
    });
    it('When instanciated they are of type object', () =>{
        class Task {};
        var task = new Task();
        expect(typeof task).toBe('object');
    });
    it('...and are an instance of the class type', () =>{
        class Task {};
        var task = new Task();
        expect(task instanceof Task).toBe(true);
    });
    it('Functions can be declared in shorthand', () =>{
        class Task {
            getId() {
                return 10;
            }
        };
        var task = new Task();
        expect(task.getId()).toBe(10);
    });
    it('And functions are the same as creating a method using prototype', () =>{
        class Task {
            getId() {
                return 10;
            }
        };
        var task = new Task();
        expect(task.getId == Task.prototype.getId).toBe(true);
    });
    it('We can have constructors in a class', () =>{
        let constructorCalled = false;
        class Task {
            constructor() {
                constructorCalled = true;
            }
            getId() {
                return 10;
            }
        }
        var task = new Task();
        expect(constructorCalled).toBe(true);
    });
    it('Class body is not the place to create variables', () =>{
        expect(function(){
            new Function('', `
            class Task {
                let bar;
            }
        `);
        }).toThrow(new SyntaxError('Unexpected identifier'));
    });
    it('Class declarations cannot be hoisted', () =>{
        expect(function(){
            let task = new Task();
            class Task {
                constructor(){}
            }
        })
        .toThrow(new TypeError('Task is not a constructor'));
    });
    it('Class can be assigned to a variable', () => {
        class Task {
            constructor(){}
        }
        let NewClass = Task;
        var newClass = new NewClass();
        expect(newClass instanceof Task).toBe(true);
    });
    it('Class is not added to the global namespace', () => {
        class Task {
            constructor(){}
        }
        expect(window.Task === Task).toBe(false);
    });
    it('extend keyword allows a class to inherit another', () => { 
        let constructorCalled = false;
        class Project { 
            constructor() { 
                constructorCalled = true;
            }
            getTaskCount() {
                return 10;
            }
        }
        class SoftwareProject extends Project {
        }
        let p = new SoftwareProject();
        expect(constructorCalled).toBe(true);
        expect(p instanceof SoftwareProject).toBe(true);
        expect(p.getTaskCount()).toBe(10);
    })
    it('super keyword allows the base constructor to be called; an error is thrown without it', () => {
        let constructorCalled = 0;
        class Project { 
            constructor() { 
                constructorCalled++;
            }
        }
        class SoftwareProject extends Project {
            constructor() { 
                super();
                constructorCalled++;
            }
        }
        let p = new SoftwareProject();
        expect(constructorCalled).toBe(2);
    })
    it('Inherited function can be overriden', () => { 
        let constructorCalled = false;
        class Project { 
            constructor() { 
                constructorCalled = true;
            }
            getTaskCount() {
                return 10;
            }
        }
        class SoftwareProject extends Project {
            getTaskCount() {
                return 20;
            }
        }
        let p = new SoftwareProject();
        expect(p.getTaskCount()).toBe(20);
    })
    it('...and the base implementation can be accessed by using super', () => { 
        class Project { 
            getTaskCount() {
                return 10;
            }
        }
        class SoftwareProject extends Project {
            getTaskCount() {
                return super.getTaskCount() + 20;
            }
        }
        let p = new SoftwareProject();
        expect(p.getTaskCount()).toBe(30);
    })
    it('using super is valid in an Object literal', () => { 
        let project = { 
            getTaskCount() {
                return 10;
            }
        }
        let softwareProject = {
            getTaskCount() {
                return super.getTaskCount() + 20;
            }
        }
        Object.setPrototypeOf(softwareProject, project)
        expect(softwareProject.getTaskCount()).toBe(30);
    })    
    it('this keyword can be used in class heirarchy',()=>{
        class Project { 
            constructor() { 
                this.location = 'Mazatlan';
            }
        }
        class SoftwareProject extends Project {
            constructor() { 
                super();
                this.location = `${this.location} Beach`;
            }
        }
        let p = new SoftwareProject();
        expect(p.location).toBe('Mazatlan Beach');
    })
    it('Functions with static keywords are accessible at the type level but not the object level',()=>{
        class Project {
            static getDefaultId() {
                return 0;                
            }
        }
        let p = new Project();
        expect(Project.getDefaultId()).toBe(0);
        expect(function(){
            p.getDefaultId();
        }).toThrow(new TypeError('p.getDefaultId is not a function'));
    })  
    it('new.target refers to the constructor of the ascendant class in the heirarchy',() => {
        class Project { 
            constructor() { 
                //new.target;
                expect(true).toBe(true);
            }
        }
        class SoftwareProject extends Project {
            constructor() { 
                super();
            }
        }
        let p = new SoftwareProject();
        
    })
});