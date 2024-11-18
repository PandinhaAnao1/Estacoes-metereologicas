import authentication from '../../../middleware/authenticationUser.js';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

describe('Teste para verificar o middleware de autenticação', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer token'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('Teste para cobrir o erro 401', () => {
    jest.spyOn(Jwt, 'verify').mockImplementation(() => {
      throw new Error('Token invalido!');
    });

    authentication(req, res, next);


    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
