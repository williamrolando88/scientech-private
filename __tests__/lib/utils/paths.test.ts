import { path } from '@src/lib/utils/path';

describe('paths', () => {
  test('should return concatenated path', () => {
    const root = '/auth';
    const sublink = '/login';
    expect(path(root, sublink)).toBe('/auth/login');
  });

  test('should return root if no parameters are given', () => {
    expect(path()).toBe('/');
  });

  test('should return root if no sublink is given', () => {
    const root = '/auth';
    expect(path(root)).toBe('/auth');
  });

  test('should return path with n sublinks', () => {
    const root = '/auth';
    const sublink1 = '/login';
    const sublink2 = '/register';
    expect(path(root, sublink1, sublink2)).toBe('/auth/login/register');
  });

  test('should add "/" to sublinks if "/" is not given', () => {
    const root = '/auth';
    const sublink1 = 'login';
    const sublink2 = 'register';
    expect(path(root, sublink1, sublink2)).toBe('/auth/login/register');
  });
});
