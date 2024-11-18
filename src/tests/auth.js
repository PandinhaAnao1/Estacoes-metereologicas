
export const postLogin = (req) => {
    const {email, senha} = {
        email: 'maria@example.com',
        senha: 'Senha123@'
    };
	return req
	.post("/autenticacao")
	.set("Accept", "aplication/json")
	.send({
		email: email,
		senha: senha
	});
};
