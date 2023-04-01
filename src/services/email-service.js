import { getCurrentUserDetail } from "../auth";
import { myAxios, privateAxios } from "./helper";

export const moderatorSendEmail=(sendEmailDto)=>{
    return privateAxios.post("/email/send",sendEmailDto).then((response)=> response.data)
}