import ClientType from "./ClientType";
import UserModel from "./UserModel";

class TeacherUserModel extends UserModel {

    public constructor(clientType: ClientType, id: number, name: string, phone: string, password: string) {
        super(clientType, id, name, phone, password);
    }
    public numClass:number;
}

export default TeacherUserModel;
