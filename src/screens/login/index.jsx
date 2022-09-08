export const LogInScreen = () => {

    const apiURL = process.env.REACT_APP_API_URL

    const login = (param) => {
        fetch(`${apiURL}/login`,{
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(param)
        })
        .then(async(response)=>{
            if(response.ok){
            }
        })
    }

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