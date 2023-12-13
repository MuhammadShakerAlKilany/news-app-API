import { Jwt } from './jwtStrategy';

describe('Jwt', () => {
  it('should be defined', () => {
    expect(new Jwt()).toBeDefined();
  });
});
