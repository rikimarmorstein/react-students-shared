import ClientType from "./ClientType";

class CredentialsModel {
    
    public id?: number;
    public clientType?: ClientType;
    public name?: string;
    public phone?: string;
    public password?: string;


    public  setClientType(clientType: ClientType) {
		this.clientType = clientType;
	}


}

export default CredentialsModel;
