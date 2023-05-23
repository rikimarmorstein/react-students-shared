import ClientType from "./ClientType";

class UserModel {
    constructor(
        public clientType: ClientType,
        public id: number,
        public name: string,
        public phone: string,
        public password: string,
    ) { }

}

export default UserModel;
