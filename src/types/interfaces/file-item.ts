export interface FileItem {
    id: number | string;
    file?: File;
    url?: string;
    name: string;
    size: number;
    type: string;
    orderNo: number;
}