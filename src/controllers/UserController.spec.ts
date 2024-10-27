import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    });

    it('Deve retornar erro se o nome não for fornecido', () => {
        const mockRequest = {
            body: {
                email: 'nath@test.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        
        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ error: 'O campo name é obrigatório' });
    });

    it('Deve retornar erro se o email não for fornecido', () => {
        const mockRequest = {
            body: {
                name: 'Nath'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        
        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ error: 'O campo e-mail é obrigatório' });
    });

    it('Deve chamar a função getAllUsers // Conferindo se está sendo chamada', () => {
        const mockRequest = {} as Request;
        const mockResponse = makeMockResponse();
        
        userController.getAllUsers(mockRequest, mockResponse);

        // Verifica se a função getAllUsers foi chamada
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });
})
