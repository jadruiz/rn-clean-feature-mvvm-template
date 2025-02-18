// tests/mocks/authMocks.ts
export const mockAuthAPI = {
  login: jest.fn().mockResolvedValue({ token: 'fakeToken' }),
  logout: jest.fn().mockResolvedValue(true),
};
