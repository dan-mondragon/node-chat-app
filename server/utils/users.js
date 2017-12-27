class Users {
    constructor(){
        this.users = [];
    }
    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    getUserList (room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
    removeUser(id){
        console.log(id)
        var user = this.users.filter((user) => user.id === id)[0];
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id){
        var user = this.users.filter((user) => user.id === id)[0];
        return user;
    }
    getUserByName(name){
        var user = this.users.filter((user) => user.name === name)[0];
        return user;
    }
    getUserByNameRoom(name, room){
        var user = this.users.filter((user) =>  {
            if(user.name === name && user.room === room){
                return user;
            }
        });
        return user[0];
    }
    getRooms(){
        var rooms = this.users.map((user) => {
            return user.room;
        });
        var roomNames = rooms.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
          });
        return roomNames;
    }
}

module.exports = {Users};