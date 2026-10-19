export type LoginData = {
    email: string,
    name: string,
    updatedAt: Date,
    createdAt: Date,
    emailVerified: boolean,
    image: string | null,
    age: number,
    role: string,
    city: string,
    sex: string
}

export type CreateUser = { 
    email: string, 
    password: string,
    user: LoginData,
    role: string
}
