describe('Proxy API', () => {
    it('get values by proxy', () => {
        function Employee() {
            this.name = 'Milton Waddams',
            this.salary = 1000000;
        }
        var e = new Employee();
        var attemptedAccess = false;
        var p = new Proxy(e, {
            get: function (target, prop, receiver) {
                attemptedAccess = true;
                if (prop === 'salary')
                    return 'denied';
                return Reflect.get(target, prop, receiver);
            }
        })
        expect(attemptedAccess).toBe(false);
        expect(p.salary).toBe('denied');
        expect(attemptedAccess).toBe(true);
        expect(p.name).toBe('Milton Waddams');
    });
    it('calling function by proxy', () => {
        function getId() {
            return 55;
        }

        var attemptedAccess = false;
        var proxy = new Proxy(getId, {
            apply: function(target, thisArg, argumentsList) {
                attemptedAccess = true;
                return Reflect.apply(target, thisArg, argumentsList);
            }
        })
        
        expect(attemptedAccess).toBe(false);
        expect(getId()).toBe(55);
        expect(attemptedAccess).toBe(false);
        expect(proxy()).toBe(55);
        expect(attemptedAccess).toBe(true);

    });
    it('proxy as a prototype', () => {
        var table = {
            tableId: 99
        }
        var proxy = new Proxy({}, {
            get: function(target, prop, receiver) {
                return 'Property ' + prop + ' doesn\'t exist';
            }
        });

        Object.setPrototypeOf(table,proxy);

        expect(table.tableId).toBe(99);
        expect(table.size).toEqual('Property size doesn\'t exist');
    })
    it('revokeable proxies', () =>{ 
        var table = { 
            tableId: 99
        }
        let { proxy, revoke } = Proxy.revocable(table, { 
            get: function(target, prop, receiver) {
                return Reflect.get(target, prop, receiver) + 100;
            }
        })

        expect(proxy.tableId).toBe(199);
        revoke();
        expect(function() {proxy.tableId}).toThrow(new TypeError("Cannot perform 'get' on a proxy that has been revoked"));
    })
});