import { IFieldFormat, IAttributes } from './IMetadata';

export interface IPessoaFisica extends IAttributes{
    dataNascimento: IFieldFormat;
    sexo: IFieldFormat;
    estadoCivil: IFieldFormat;
}

export const PessoaFisica: IPessoaFisica = {
    dataNascimento: {
        order: 1,
        type: 'date',
        label: 'Data de Nascimento',
        pattern: 'dd/mm/yyyy'
    },
    sexo: {
        order: 2,
        type: 'select',
        label: 'Sexo',
        pattern: '',
        options: [
            { label: 'Selecione um Gênero', value: '' },
            { label: 'Masculino', value: 'M' },
            { label: 'Feminino', value: 'F' }
        ]
    },
    estadoCivil: {
        order: 3,
        type: 'select',
        label: 'Estado Civil',
        pattern: '',
        options: [
            { label: 'Selecione um Estado Civil', value: '' },
            { label: 'Solteiro', value: 'solteiro' },
            { label: 'Casado', value: 'casado' },
            { label: 'Divorciado', value: 'divorciado' },
            { label: 'Viúvo', value: 'viuvo' }
        ]
    }
};
    