describe('Reflect', () => {
    it('...an object that can', () => {
        expect(typeof Reflect).toBe('object');
    });
    describe('do Object Contruction', () => {
        it('..by calling construct()', () => {
            class Restaurant {
                constructor(name, city) {
                    this.name = name,
                        this.city = city
                }
            }
            let r = Reflect.construct(Restaurant, ['Zoey\'s', 'Goleta']);
            expect(r instanceof Restaurant).toBe(true);
            expect(r).toEqual(new Restaurant('Zoey\'s', 'Goleta'));
        });
    });
    describe('Method Calls', () => {
        it('...by calling apply()', () => {
            class Restaurant {
                constructor() {
                    this.id = 33
                }
                getId(prefix) {
                    return `${prefix}${this.id}`;
                }
            }
            let proxy = { id: 19 }
            let id = Reflect.apply(Restaurant.prototype.getId, proxy, ['ID']);
            expect(id).toBe('ID19');

        });
    });
    describe('Prototypes', () => {
        it('setPrototypeOf and getPrototypeOf', () => {
            class Restaurant { }
            let setup = {
                getId() { return 88 }
            }
            let r = new Restaurant();
            Reflect.setPrototypeOf(r, setup);
            expect(r.getId()).toBe(88);
            expect(Reflect.getPrototypeOf(r)).toBe(setup);
        })
    });
    describe('Properties', () => {
        it('get and set', () => {
            class Restaurant {
                constructor() {
                    this._id = 8000
                }
                get id() {
                    return this._id;
                }
                set id(value) {
                    this._id = value;
                }
            }
            let r = new Restaurant();

            expect(Reflect.get(r, '_id')).toBe(8000);
            expect(Reflect.get(r, 'id', { _id: 88 })).toBe(88);

            Reflect.set(r, '_id', 99);
            expect(r.id).toBe(99);
            expect(Reflect.get(r, '_id')).toBe(99);
            expect(Reflect.get(r, 'id')).toBe(99);

            let alt = { id: 88 };
            Reflect.set(r, '_id', 88, alt);
            expect(r._id).toBe(99);
            expect(alt._id).toBe(88);
        })
        it('has and ownKeys', () => {
            class Location {
                constructor() {
                    this.city = 'Goleta'
                }
            }
            class Restaurant extends Location {
                constructor() {
                    super();
                    this.id = 9000;
                }
            }
            let r = new Restaurant();
            expect(Reflect.has(r, 'id')).toBe(true);
            expect(Reflect.has(r, 'city')).toBe(true);
            expect(Reflect.has(r, 'postcode')).toBe(false);
            expect(Reflect.ownKeys(r)).toEqual(['city', 'id'])
        })
        it('defineProperty', () => {
            class Restaurant {}
            let r = new Restaurant();
            Reflect.defineProperty(r, 'id', {
                value: 2000, configurable: true, enumerable: true
            });
            expect(r.id).toBe(2000);
        })
        it('deleteProperty', () => {
            class Restaurant {
                constructor() {
                    this.id = 100;
                }
            }
            let r = new Restaurant();
            expect(r.id).toBe(100);
            Reflect.deleteProperty(r, 'id');
            expect(r.id).toBe(undefined);
        })
        it('getOwnPropertyDescriptor', () => {
            class Restaurant {
                constructor() {
                    this.id = 100;
                }
            }
            let r = new Restaurant();
            let d = Reflect.getOwnPropertyDescriptor(r, 'id');
            expect(d).toEqual({ value: 100, writable: true, enumerable: true, configurable: true });
        })
    });
    describe('Property Extensions', () => {
        it('preventExtensions, isExtensible', () => {
            let r = {
                id: 2000
            }
            expect(Reflect.isExtensible(r)).toBe(true);
            r.location = 'Goleta';
            expect(r.location).toBe('Goleta');
            
            Reflect.preventExtensions(r);
            expect(Reflect.isExtensible(r)).toBe(false);
            expect(function() {r.city = 'London'}).toThrow(new TypeError('Cannot add property city, object is not extensible'))
        });
    });
});