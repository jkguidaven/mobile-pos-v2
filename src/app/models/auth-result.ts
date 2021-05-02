export interface AuthResult {
  result: 'success' | 'fail';
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}
