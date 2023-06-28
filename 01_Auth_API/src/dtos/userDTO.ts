
export class UserDTO {
    id: number;
    email: string;

    constructor(args: any) {
        this.id = args.id;
        this.email = args.email;
    }
}
