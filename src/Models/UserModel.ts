import ClientType from "./ClientType";

class UserModel {
    public clientType: ClientType;
    public id: number;
    public name: string;
    public phone: string;
    public password: string;

    public constructor(clientType: ClientType, id: number, name: string, phone: string, password: string) {
        this.clientType = clientType;
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.password = password;
    }

}

export default UserModel;
