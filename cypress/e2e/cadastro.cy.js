/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro do Hub de Leitura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    it('Deve fazer cadastro com sucesso, usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Danielle Senna')
        cy.get('#email').type(email)
        cy.get('#phone').type('21987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso, usando Faker', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('21987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });

    it('Deve preencher cadastro cm sucesso - Usando comando customizado', () => {
        let email = `teste${Date.now()}@teste.com`
        let nome = faker.person.fullName({ sex: 'female' })
        cy.preencherCadastro(
            nome,
            email,
            '21987654321',
            'Teste@123',
            'Teste@123'
        )
        cy.url().should('include', 'dashboard')

    })

    it('Deve fazer cadastro com sucesso - Usando Page Objects', () => {
        let email = `teste${Date.now()}@teste.com`
        cadastroPage.preencherCadastro('Danielle Senna', email, '2196872345', 'senha123', 'senha123')
        cy.url().should('include', 'dashboard')


    });

    it('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'danielle@teste.com', '21976543872', 'senha123', 'senha123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')

    });

    it('Deve validar mensagem ao tentar cadastrar com email invalido', () => {
        cadastroPage.preencherCadastro('Danielle Senna', 'danielle@teste', '21976543872', 'senha123', 'senha123')
        cy.get('#register-form > :nth-child(2) > .invalid-feedback').should('contain', 'Email válido é obrigatório')

    });

});