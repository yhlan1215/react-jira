import { useAuth } from "../context/auth-context"

export const LoginScreen = () => {

    const {login} = useAuth()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const username = e.currentTarget.elements[0].value
        const password = e.currentTarget.elements[1].value
        login({username,password})
    }

    return<form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'} />
        </div>
        <button type="submit">登录</button>
    </form>
}