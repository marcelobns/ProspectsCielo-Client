import { IFieldFormat, IAttributes } from './IMetadata';

export interface IPessoaJuridica extends IAttributes {
    contato_nome: IFieldFormat;
    contato_cpf: IFieldFormat;
    contato_email: IFieldFormat;
}

export const PessoaJuridica: IPessoaJuridica = {
    contato_nome: {
        order: 2,
        type: 'text',
        label: 'Nome do Contato',
        pattern: ''
    },
    contato_cpf: {
        order: 3,
        type: 'text',
        label: 'CPF do Contato',
        pattern: ''
    },
    contato_email: {
        order: 4,
        type: 'text',
        label: 'E-mail do Contato',
        pattern: ''
    }
};
