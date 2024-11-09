class Response {
  constructor(response) {
    this.message = response?.data?.message || "";
    this.success = response?.data?.success || false;
    this.status = response?.status || 200;
  }
}

export default Response;
