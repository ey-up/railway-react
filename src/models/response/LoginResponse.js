import Response from "./Response";

class LoginResponse extends Response {
    constructor(response) {
      super(response)
      if(this.success){
        this.token = response.data.jwt;
        this.refreshToken = response.data.refreshToken;
        this.expiresIn = response.data.expiresIn;
      }
    }
  
  }
  
  export default LoginResponse;