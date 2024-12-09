export type Role = 'admin' | 'user';

export interface User {
    username: string;
    role: Role;
}
