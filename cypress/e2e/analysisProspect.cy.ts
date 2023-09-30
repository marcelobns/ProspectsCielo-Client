import { faker } from '@faker-js/faker';

describe('Prospects Management', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('Fluxo quando não há prospectos na fila', () => {
        cy.get('p-button[label="Analisar"]').click();
        cy.get('.p-toast-message-text').should('contain', 'Não há prospectos na fila')
    });
    
    it('Fluxo para analisar um Prospecto', () => {
        cy.get('p-button[label="Analisar"]').click();
        
        const observacao = faker.lorem.sentence({ min: 5, max: 15 });
        cy.get('.p-inputtextarea').type(observacao);
        cy.get('p-button[label="Salvar"]').click();
        cy.get('.p-toast-message-text').should('contain', 'Pre Registration successfully Updated');
    });
});