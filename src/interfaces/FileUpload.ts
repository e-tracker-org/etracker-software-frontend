type ExpectedMimes = 'jpg' | 'jpeg' | 'png' | 'pdf';

export interface FileType {
    name: string;
    description: string;
    expectedMimes: ExpectedMimes[];
    askForDocID: number;
    requiredFor: number[];
    optionalFor: any[];
    createdAt: string;
    updatedAt: string;
    typeID: number;
    id: string;
}

export interface UploadedFile {
    id: string;
    userId: string;
    docTypeID: number;
    docNo: string;
    description: string;
    files: string[];
    urls: string[];
    status: Status;
}

enum Status {
    SUBMITTED = 'SUBMITTED',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}
