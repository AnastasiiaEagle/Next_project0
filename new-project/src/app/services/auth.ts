import axios from "axios"

type authProps = {
    email: string,
    password: string
}

export const authRegister = async(userData: authProps) =>{
    try {
        const res = fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: userData.email,
            email: userData.password
        }),
        });
        return res
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}