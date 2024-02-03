const baseURL = "https://invoice-backend-gk23.onrender.com";

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
