const expect = require('expect');
const {Users} = require('./users');

var users;
beforeEach(() => {
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Mike',
        room: 'Node course'
    },{
        id: '2',
        name: 'Jen',
        room: 'React course'
    },{
        id: '3',
        name: 'Julie',
        room: 'Node course'
    }]
});

describe('Users', () => {
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Dan',
            room: 'Room A'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var user = users.removeUser('1');
        expect(user.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var user = users.removeUser('8');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var user = users.getUser('1');
        expect(user.id).toEqual('1')
    });

    it('should not find a user', () => {
        var user = users.getUser('5');
        expect(user).toNotExist();
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React course');
        expect(userList).toEqual(['Jen']);
    });
});