import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

})
    describe('UserService - deleteUser', () => {
        let userService: UserService;
    
        beforeEach(() => {
            userService = new UserService();
            userService['db'] = [
                { name: 'nath', email: 'nath@test.com' },
            ];
        });
    
        it('Deve deletar um usuário com sucesso', () => {
            userService.delete('nath@test.com');
    
            expect(userService['db']).toHaveLength(1);
            expect(userService['db'][0].email).toBe('user2@test.com');
        });
    
        it('Deve lançar um erro se o usuário não for encontrado', () => {
            expect(userService.delete('notfound@test.com')).rejects.toThrow('Usuário não encontrado');
            expect(userService['db']).toHaveLength(2); // Verifica se o array permanece inalterado
        });
});
