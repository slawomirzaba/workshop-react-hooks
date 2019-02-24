export interface DataBaseItemI {
    title: string;
    description: string;
    isFinished: boolean;
    isImportant: boolean;
}
export interface ItemI extends DataBaseItemI {
    id: string;
}
