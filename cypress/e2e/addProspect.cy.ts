import { faker } from '@faker-js/faker';

describe('Prospects Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Fluxo para cadastrar um Prospecto de Pessoa Fisica', () => {
    cy.get('p-button[label="Cadastrar"]').click();
    
    cy.get('[formControlName="input_mcCode"]').click();
    cy.get('.p-dropdown-filter').type('1711');
    cy.get('#pn_id_3_list > .p-element.ng-star-inserted > .p-ripple').click();

    cy.get('[formControlName="input_registrationType"]').click();
    cy.get('[ng-reflect-label="Pessoa Física"] > .p-ripple').click();

    cy.get(':nth-child(3) > .mb-2').contains('CPF');
    
    const cpf = faker.helpers.rangeToNumber({ min: 10000000000, max: 99999999999 });
    cy.get('[formControlName="input_documentNumber"]').type(cpf.toString());

    const name = faker.person.fullName();
    cy.get('[formControlName="input_name"]').type(name);

    const email = faker.internet.email();
    cy.get('[formControlName="input_email"]').type(email);

    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
    console.log(birthDate.toLocaleDateString('pt-BR'));
    cy.get('[ng-reflect-name="attr_dataNascimento"]').click().type(birthDate.toLocaleDateString('pt-BR'));

    // cy.get('p-button[label="Salvar"]').click();
    // cy.get('.p-toast-message-text').should('contain', 'New Pre Registration created successfully');
  });

  it('Fluxo para cadastrar um Prospecto de Pessoa Jurídica', () => {
    cy.get('p-button[label="Cadastrar"]').click();

    cy.get('[formControlName="input_mcCode"]').click();
    cy.get('.p-dropdown-filter').type('1750');
    cy.get('#pn_id_3_list > .p-element.ng-star-inserted > .p-ripple').click();

    cy.get('[formControlName="input_registrationType"]').click();
    cy.get('[ng-reflect-label="Pessoa Jurídica"] > .p-ripple').click();

    cy.get(':nth-child(3) > .mb-2').contains('CNPJ');

    const cnpj = faker.helpers.rangeToNumber({ min: 10000000000000, max: 99999999999999 });
    cy.get('[formControlName="input_documentNumber"]').type(cnpj.toString());

    const nameCompany = faker.company.name();
    cy.get('[formControlName="input_name"]').type(nameCompany);

    const email = faker.internet.email();
    cy.get('[formControlName="input_email"]').type(email);

    const contatoCpf = faker.helpers.rangeToNumber({ min: 10000000000, max: 99999999999 });
    cy.get('[ng-reflect-name="attr_contatoCpf"]').type(contatoCpf.toString());

    const emailContato = faker.internet.email();
    cy.get('[ng-reflect-name="attr_contatoEmail"]').type(emailContato);

    const contatoNome = faker.person.fullName();
    cy.get('[ng-reflect-name="attr_contatoNome"]').type(contatoNome);
    

    // cy.get('p-button[label="Salvar"]').click();
    // cy.get('.p-toast-message-text').should('contain', 'New Pre Registration created successfully');
  });

});
