export class Upload {
    $key: string;
    createdAt: any;
    file: File;
    name: string;
    progress: number =0 ;
    url: string;
    uid: string;

    constructor(file: File) {
        this.file = file;
        this.name = new Date().getTime() + '_' + this.getRandomInt(1, 999999) + '_' + this.file.name
    }

    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
