class Config {

}

class DevelopmentConfig {
    public adminUrl = "http://localhost:8080/api/admin/";
    public authUrl = "http://localhost:8080/auth/login";
}

class ProductionConfig {
    public adminUrl = "http://localhost:8080/api/admin/";
    public authUrl = "http://localhost:8080/auth/login";
}

const appConfig = process.env.NODE_ENV == "development"
    ? new DevelopmentConfig() : new ProductionConfig();
export default appConfig;