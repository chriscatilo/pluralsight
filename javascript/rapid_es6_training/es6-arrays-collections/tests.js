describe('Array extensions', () => {
    it('Array.of() creates an array and appends the argument', () => {
        let a = Array.of(9000);
        expect(a).toEqual([9000]);
    })
    it('Array.from() creates an array and for each value it calls a lambda function', () => {
        let a = [800, 810, 820];

        let b = Array.from(a, v => v + 100 );
        expect(b).toEqual([900, 910, 920]);

        let c = Array.from(a, function(v) { return v + this.adjustment}, { adjustment: 50 });
    })
    it('fill() will override the content of an array', () => {
        let a = [800, 810, 820, 830];

        a.fill(900);
        expect(a).toEqual([900, 900, 900, 900]);

        a.fill(800, 1);
        expect(a).toEqual([900, 800, 800, 800]);

        a.fill(700, 2, 3);
        expect(a).toEqual([900, 800, 700, 800]);

        a.fill(600, -1);
        expect(a).toEqual([900, 800, 700, 600]);
    });
    it('find() will return the first value with matching the criteria', () => {
        let a = [900, 800, 700, 600];

        let b = a.find(v => v >= 700 && v <= 800);
        expect(b).toEqual(800);
        
        let c = a.find(function(value, index, array) { 
            return value >= this.min && value <= this.max}, 
            { min: 699, max: 899 }
        );
        expect(c).toEqual(800);
    })
    it('findIndex() will return the index of the first value with matching the criteria', () => {
        let a = [900, 800, 700, 600];

        let b = a.findIndex(v => v >= 700 && v <= 800);
        expect(b).toEqual(1);

        let c = a.findIndex(function(value, index, array) { 
            return value >= this.min && value <= this.max}, 
            { min: 699, max: 899 }
        );
        expect(c).toEqual(1);
    })
    it('copyWithin() overrides the values from the first index with the values from the second index', () => {
        let a = [900, 800, 700, 600, 500];

        a.copyWithin(2, 0);

        expect(a).toEqual([900, 800, 900, 800, 700]);
    })
    it('entries() returns the entries in the array paired with the index', () => {
        let a = [900, 800];
        expect([...a.entries()]).toEqual([[0,900], [1, 800]]);
    })
    it('keys() returns the indices in the array', () => {
        let a = [900, 800];
        expect([...a.keys()]).toEqual([0,1]);
    })
});
describe('ArrayBuffer and Typed Arrays', () => {
    it('ArrayBuffer stores a byte array', () => {
        let b = new ArrayBuffer(1024);
        b[0] = 0xff;
        expect(b.byteLength).toEqual(1024);
        expect(b.length).toBe(undefined);
        expect(b[0]).toBe(255);
    })
    it(`With an Array Buffer, you can then pass its contents to 
        Int8Array(), Uint8Array(), Uint8ClampedArray(), 
        Int16Array(), Uint16Array(), 
        Int32Array(), Uint32Array(), 
        Float32Array(), Float64Array()`, () =>
    {        
        let b = new ArrayBuffer(1024);

        let uint8 = new Uint8Array(b);

        let uint16 = new Uint16Array(b);

        uint8[1] = 1;

        expect(uint8[0]).toBe(0);
        expect(uint16[0]).toBe(256);
    })
    it(`DataView provides a low-level interface for reading and writing multiple number types 
        in an ArrayBuffer irrespective of the platform\'s endianness (or byteorder)`, () => 
    {
        let b = new ArrayBuffer(1024);
        let dv = new DataView(b);

        let bytes = [0x0, 0x1];
        dv.setUint8(...bytes);

        expect(dv.getUint16(0)).toBe(256); // little endian
        expect(dv.getUint16(0, true)).toBe(1); // big endian
    })
})
describe('Map and WeakMap', () => {
    it('Map class allows values to be mapped to keys', () => {
        let emp1 = { name: 'jake'};
        let emp2 = { name: 'janet'};
        let emps = new Map();
        emps.set(emp1, 'ABC');
        emps.set(emp2, '123');
        expect(emps.size).toBe(2);
        expect(emps.get(emp1)).toBe('ABC');
        expect(emps.get(emp2)).toBe('123');
    })
    it('You can delete a map entry', () => {
        let emp1 = { name: 'jake'};
        let emp2 = { name: 'janet'};
        let emps = new Map();
        emps.set(emp1, 'ABC');
        emps.set(emp2, '123');
        emps.delete(emp1);
        expect(emps.size).toBe(1);
        expect(emps.has(emp1)).toBe(false);
    })
    it('You can clear the entire map', () => {
        let emp1 = { name: 'jake'};
        let emp2 = { name: 'janet'};
        let emps = new Map();
        emps.set(emp1, 'ABC');
        emps.set(emp2, '123');
        emps.clear();
        expect(emps.has(emp1)).toBe(false);
        expect(emps.has(emp2)).toBe(false);
        expect(emps.size).toBe(0);
    })
    it('You can pair the key and value in an iterable before mapping', () => {
        let emp1 = { name: 'jake'};
        let emp2 = { name: 'janet'};
        let arr = [
            [emp1, 'ABC'],
            [emp2, '123']
        ];
        let emps = new Map(arr);
        expect(emps.size).toBe(2);
        expect(emps.get(emp1)).toBe('ABC');
        expect(emps.get(emp2)).toBe('123');
    })
    it('values(), keys() and entries() retieves the value part, key part and entries of the map respectively', () => {
        let emp1 = { name: 'jake'};
        let emp2 = { name: 'janet'};
        let arr = [
            [emp1, 'ABC'],
            [emp2, '123']
        ];
        let emps = new Map(arr);

        let values = [...emps.values()]
        expect(values).toEqual(['ABC', '123']);

        let keys = [...emps.keys()]
        expect(keys).toEqual([emp1, emp2]);

        let entries = [...emps.entries()]
        expect(entries).toEqual([
            [emp1, 'ABC'],
            [emp2, '123']
        ]);
    })
})
describe('Set and WeakSet', () => {
    it('Set is a unique collection of single values and objects', () => {
        
        let perks = new Set();
        perks.add('Car');
        perks.add('Super Long Vacation');
        perks.add('Car');
        expect(perks.size).not.toBe(3);
        expect(perks.size).toBe(2);
        expect(perks.has('Car')).toBe(true);
        expect(perks.has('Hat')).toBe(false);
    })
    it('It can take an iterator when created', () => {
        let perks = new Set([
            'Car', '10 Week Vacation', 'Jet'
        ]);
        expect(perks.size).toBe(3);
    })
    it('The entries in a set are treated as keys and values', () => {
        let perks = new Set([
            'Car', 'Jet'
        ]);
        expect([...perks.keys()]).toEqual(['Car','Jet']);
        expect([...perks.values()]).toEqual(['Car','Jet']);
        expect([...perks.entries()]).toEqual([['Car','Car'],['Jet','Jet']]);
    })
    it('Equal object that are not the same instance are added to the set', () => {
        let o = new Set([
            { id: 800 },
            { id: 800 },
        ]);
        expect(o.size).toBe(2);
    })
    it('Primitive types are put on the set', () => {
        let v = new Set([1, '1']);
        expect(v.size).toBe(2);
    })
    it('Weak sets cannot accept primitive types, only object types', () => {
        let a = {name: 'Car'}, b = {name: 'Jet'};
        let l1 = new WeakSet([a,b]);
        expect(l1.has(a)).toBe(false);
        
        expect(function(){ l1.add(1); }).toThrow(new TypeError('value must be an object'));

        l1.add(a);
        l1.add(b);
        expect(l1.size).toBe(undefined);
        expect(l1.has(a)).toBe(true);
    })
    it('')
})
describe('Subclassing', () => {
    it('Arrays, RegEx, Function, Promises can be extended by class', () => {
        class Perks extends Array {
            sum(){
                let total = 0;
                this.map(v => total += v);
                return total;
            }
        }
        let a;
        expect(function(){a = Perks.from([5,10,15])}).not.toThrow();
        expect(a instanceof Perks).toBe(true);
        expect(a instanceof Array).toBe(true);
        expect(a.sum()).toBe(30);
    })
})