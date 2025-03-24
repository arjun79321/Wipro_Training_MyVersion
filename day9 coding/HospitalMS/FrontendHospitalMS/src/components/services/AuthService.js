import axios from "axios";
import { BaseURL } from "../../utils";
class AuthService { 
    async login(username,password) {
        const response = await axios.post(`${BaseURL}/login`, { username, password });
        // alert(response.data.token)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // alert("Lc " +localStorage.getItem("token"))
        }
        return response.data.token; 
    }
}
export default new AuthService();