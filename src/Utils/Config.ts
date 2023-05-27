class Config {

}

class DevelopmentConfig extends Config{
    public adminUrl = "http://localhost:8080/api/admin/";
    public authUrl = "http://localhost:8080/auth/login";
    public teacherUrl = "http://localhost:8080/api/teacher/";
    public parentUrl = "http://localhost:8080/api/parent/";
    public schoolDirectorUrl = "http://localhost:8080/api/schoolDirector/";
}

class ProductionConfig extends Config{
    public adminUrl = "http://localhost:8080/api/admin/";
    public authUrl = "http://localhost:8080/auth/login";
    public teacherUrl = "http://localhost:8080/api/teacher/";
    public parentUrl = "http://localhost:8080/api/parent/";
    public schoolDirectorUrl = "http://localhost:8080/api/schoolDirector/";
}

const appConfig = process.env.NODE_ENV == "development"
    ? new DevelopmentConfig() : new ProductionConfig();
export default appConfig;