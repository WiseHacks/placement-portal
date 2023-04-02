import { getCurrentUserDetail } from "../auth";
import { myAxios } from "./helper";

export const signUp=(user)=>{
    const UserDto = {
        email:user.email,
        password:user.password,
        role:[
            {
                roleName:user.role.toUpperCase()
            }
        ],
        registerKey:{
            inviteKey:user.inviteKey
        }
    }
    return myAxios.post('/user/',UserDto).then((response)=> response.data);
}

export const logIn=(user)=>{
    const JwtRequest = {
        userName:user.email,
        password:user.password
    }
    return myAxios.post('/authenticate',JwtRequest).then((response)=> response.data);
}

export const getSingleUser=()=>{
    return myAxios.get('/user/'+getCurrentUserDetail().email).then((response)=> response.data);
}


export const getUserByEmail=(email)=>{
    return myAxios.get('/user/'+email).then((response)=> response.data);
}

export const getAllInviteKeys=()=>{
    return myAxios.get('/key/all').then((response)=> response.data);
}

export const updateUser=(userDto)=>{
    return myAxios.put('/user/'+userDto.email,userDto).then((response)=> response.data);
}

