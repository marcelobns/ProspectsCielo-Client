import { IFieldFormat, IAttributes } from './IMetadata';

export interface IPessoaFisica extends IAttributes{
    attr_dataNascimento: IFieldFormat;
    // estadoCivil: IFieldFormat;
}

export const PessoaFisica: IPessoaFisica = {
    attr_dataNascimento: {
        order: 1,
        type: 'date',
        label: 'Data de Nascimento',
        pattern: 'dd/mm/yyyy'
    },
    // estadoCivil: {
    //     order: 2,
    //     type: 'select',
    //     label: 'Estado Civil',
    //     pattern: '',
    //     options: [
    //         { label: 'Selecione um Estado Civil', value: '' },
    //         { label: 'Solteiro', value: 'Solteiro' },
    //         { label: 'Casado', value: 'Casado' },
    //         { label: 'Divorciado', value: 'Divorciado' },
    //         { label: 'Viúvo', value: 'Viúvo' }
    //     ]
    // }
};
    