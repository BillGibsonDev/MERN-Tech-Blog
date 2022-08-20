import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const useConfirmRole = (role) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user );
    const [ confirm, setConfirm ] = useState(false);
    axios.post(`${process.env.REACT_APP_ROLE_CONFIRM_URL}`, {
        role: user.role,
    })
    .then(function(response){
        if (response.data !== "Role Confirmed" ){
            navigate("/");
            alert("Role was not confirmed");
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        } else {
            setConfirm(true);
        }
    })
    return confirm;
}
