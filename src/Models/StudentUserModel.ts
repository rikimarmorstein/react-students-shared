import Cause from "./Cause";
import ClientType from "./ClientType";
import Hour from "./Hour";
import UserModel from "./UserModel";

class StudentUserModel extends UserModel {

    public constructor(clientType: ClientType, id: number, name: string, phone: string, password: string) {
        super(clientType, id, name, phone, password);
    }
    public firstName: string;
    public lastName: string;
    public hour: Hour;
    public cause: Cause;

    public pickupAddress: string;
    public studentId: string;
    public remark: string;
    public numClass: string;
    public numBus: number;
    public travel: boolean;
}

export default StudentUserModel;
