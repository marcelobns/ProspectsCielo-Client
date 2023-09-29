import { IFieldFormat, IAttributes } from './IMetadata';

export interface IPessoaJuridica extends IAttributes {
    attr_contatoNome: IFieldFormat;
    attr_contatoCpf: IFieldFormat;
    attr_contatoEmail: IFieldFormat;
}

export const PessoaJuridica: IPessoaJuridica = {
    attr_contatoNome: {
        order: 2,
        type: 'text',
        label: 'Nome do Contato',
        pattern: ''
    },
    attr_contatoCpf: {
        order: 3,
        type: 'text',
        label: 'CPF do Contato',
        pattern: ''
    },
    attr_contatoEmail: {
        order: 4,
        type: 'text',
        label: 'E-mail do Contato',
        pattern: ''
    }
};
