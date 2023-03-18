import { myAxios } from "./helper";

export const signUp=(user)=>{
    const UserDto = {
        email:user.email,
        password:user.password,
        role:[
            {
                roleName:user.role
            }
        ]
    }
    return myAxios.post('/user/',UserDto).then((response)=> response.data);
}

