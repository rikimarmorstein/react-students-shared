import ClientType from "./ClientType";

class CredentialsModel {
    constructor(
        public id: number,
        public clientType: ClientType,
        public name: string,
        public phone: string,
        public password: string,
    ) { }
}
export default CredentialsModel;
