import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const useConfirmAdmin = (role) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user );
    const [ confirm, setConfirm ] = useState(false);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ADMIN_CONFIRM_URL}`, {
        role: user.role,
    })
    .then(function(response){
        if (response.data !== "Role Confirmed"){
            alert("You do not have this permission!");
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            navigate("/");
        } else {
            setConfirm(true);
        }
    })
    return confirm;
}