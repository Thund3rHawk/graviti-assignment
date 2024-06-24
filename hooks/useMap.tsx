import { mapContext } from "@/context/mapContext";
import { useContext } from "react"

const useChat =()=>{
    const context = useContext (mapContext);
    if (!context){
        throw new Error ("useChat must be used within a ChatProvider");
    }
    return context;
}

export default useChat;