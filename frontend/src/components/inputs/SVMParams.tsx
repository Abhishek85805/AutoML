import InputContext from "@/context/InputContext"
import { useContext } from "react"
import Input from "./Input"
import CheckboxInput from "./CheckboxInput";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";

type Type = {
    modelType: string;
}
function SVMParams({modelType}:Type) {
    const val = useContext(InputContext);
    if(!val) return;

    const kernel = val.kernel;
    const setKernel = val.setKernel;
    const c = val.c;
    const setC = val.setC;
    const degree = val.degree;
    const setDegree = val.setDegree;
    const gamma = val.gamma;
    const setGamma = val.setGamma;
    const probability = val.probability;
    const setProbability = val.setProbability;
    const epsilon = val.epsilon;
    const setEpsilon = val.setEpsilon;
    
  return (
    <div>
        <SelectInput selectInput={kernel} setSelectInput={setKernel} data={["linear", "poly", "rbf", "sigmoid"]} name={"Kernel"}/>
        <Input name={"C"} Tag={()=><NumberInput step={0.1} state={c} setState={setC}/>}/>
        <Input name={"Degree"} Tag={()=><NumberInput step={1} state={degree} setState={setDegree}/>}/>
        <SelectInput selectInput={gamma} setSelectInput={setGamma} data={["auto", "scale"]} name={"Gamma"}/>
        {modelType === "svm_regression" && <Input name={"Epsilon"} Tag={()=><NumberInput step={0.1} state={epsilon} setState={setEpsilon}/>}/>}
        <Input name={"Probability"} Tag={()=><CheckboxInput state={probability} setState={setProbability} name={"probability"}/>}/>
    </div>
  )
}

export default SVMParams