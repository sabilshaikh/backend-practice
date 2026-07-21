import { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

export function useAuth(){
    const context = useContext(AuthContext)
    return context
}