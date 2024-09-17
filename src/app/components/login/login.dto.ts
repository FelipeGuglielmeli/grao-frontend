export interface LoginDto {
    accessToken: string
    user: User
}

interface User {
    id: number
    name: string
    email: string
}