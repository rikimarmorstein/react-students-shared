import ClientType from "./ClientType";
import UserModel from "./UserModel";

class SchoolUserModel extends UserModel {

    public constructor(clientType: ClientType, id: number, name: string, phone: string, password: string) {
        super(clientType, id, name, phone, password);
    }
    public schoolName: string;
  
    public address: string;
}

export default SchoolUserModel;
