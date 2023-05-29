import ClientType from "./ClientType";
import UserModel from "./UserModel";

class StudentUserModel extends UserModel {

    public constructor(clientType: ClientType, id: number, name: string, phone: string, password: string) {
        super(clientType, id, name, phone, password);
    }
    public pickupAddress: string;
    public studentId: string;
    public remark: string;
    public numClass: number;
    public numBus: number;
    
}

export default StudentUserModel;
