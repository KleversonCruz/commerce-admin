import { AppContext } from "@data/contexts/AppContext";
import { useContext } from "react";

const useApp = () => useContext(AppContext)

export default useApp