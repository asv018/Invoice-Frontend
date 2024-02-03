const baseURL = "http://localhost:8000";

const createUserApi = baseURL + "/register";

const loginUserApi = baseURL + "/login";
const getUserApi = baseURL + "/get";
const generatePdfApi = baseURL + "/generate";
const downloadGeneratedPdf = baseURL + "/get-pdf";
export {
  createUserApi,
  loginUserApi,
  getUserApi,
  generatePdfApi,
  downloadGeneratedPdf,
};
