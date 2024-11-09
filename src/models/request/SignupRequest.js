class SignupRequest {
  constructor(data) {
    this.email = data.email;
    this.fullName = data.fullname;
    this.password = data.password;
  }
}

export default SignupRequest;
