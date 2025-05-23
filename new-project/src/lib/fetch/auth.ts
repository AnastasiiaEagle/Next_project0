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
            email: userData.email,
            password: userData.password
        }),
        });
        return res
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}

export const login = async(userData: authProps) =>{
    try {
        const res = fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password
        }),
        });
        return res
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}

export const refreshUser = async() =>{
    try {
        const res = fetch('/api/refresh', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}