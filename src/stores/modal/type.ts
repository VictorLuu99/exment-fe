import { ICollection } from '../collection/type';

export interface ModalState {
    openModalConnect: boolean;
    openModalPolicy: boolean;
    openModalRegisterAccount: boolean;
    openModalNotActiveAccount: boolean;
    openModalCreateCollection: boolean;
    openModalEditCollection: boolean;
    dataCollectionForm: ICollection | null;
    openModalOrderCollection: boolean;
}
