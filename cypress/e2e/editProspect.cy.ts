import { faker } from '@faker-js/faker';

describe('Prospects Management', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('Fluxo para editar um Prospecto', () => {
        cy.get('[icon="pi pi-pencil"]').first().click();

        cy.get('[formControlName="input_mcCode"]').click();
        cy.get('.p-dropdown-filter').type(getRandomMCC());
        cy.get('#pn_id_3_list > .p-element.ng-star-inserted > .p-ripple').click();

        cy.get('p-button[label="Salvar"]').click();
        cy.get('.p-toast-message-text').should('contain', 'Pre Registration successfully Updated');
    });
});

function getRandomMCC() {
    const mccs = ['GCAS Emergency Services', 'Business Services', 'Trailer Parks and Campgrounds', 'Furriers & Fur Shops', 'Airlines and Air Carriers'];
    const randomIndex = faker.number.int({ min: 0, max: mccs.length - 1 });
    return mccs[randomIndex];
}