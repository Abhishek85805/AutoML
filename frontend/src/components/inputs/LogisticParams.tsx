import InputContext from "@/context/InputContext"
import { useContext } from "react"
import NumberInput from "./NumberInput";
import Input from "./Input";
import SelectInput from "./SelectInput";

function LogisticParams() {
    const val = useContext(InputContext);

    if(!val){
        return;
    }

    const c = val.c;
    const setC = val.setC;
    const penalty = val.penalty;
    const setPenalty = val.setPenalty;
    const solver = val.solver;
    const setSolver = val.setSolver;
    const maxIteration = val.maxIteration;
    const setMaxIteration = val.setMaxIteration;
  return (
    <div>
        <Input name="C" Tag={()=><NumberInput step={0.1} state={c} setState={setC}/>}/>
        <SelectInput selectInput={penalty} setSelectInput={setPenalty} data={["l1", "l2", "elasticnet", "none"]} name={"Penalty"}/>
        <SelectInput selectInput={solver} setSelectInput={setSolver} data={["newton-cg", "lbfgs", "liblinear", "sag", "saga"]} name={"Solver"}/>
        <Input name="Max Iteration" Tag={()=><NumberInput step={1} state={maxIteration} setState={setMaxIteration}/>}/>
    </div>
  )
}

export default LogisticParams