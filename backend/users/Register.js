//singleton class that stores users
class Register {
    constructor(){
        this.users = new Map();
    }

    static getInstance(){
        if(!Register.instance){
            Register.instance = new Register();
        }
        return Register.instance;
    }

    addUser(token, user){
        this.users.set(token, user);
        console.log(this.users);
    }
    getUser(token){
        if (this.users.has(token)){
            return this.users.get(token);
        }
        return null;
    }
    getUsers(){
        return this.users;
    }
    removeUser(token){
        this.users.delete(token);
    }
}

module.exports = Register;