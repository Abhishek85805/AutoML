import CsvUpload from "./CsvUpload"
import Input from "./Input"
import SelectInput from "./SelectInput"
import TargetColumn from "./TargetColumn"
import { useContext } from "react"
import InputContext from "@/context/InputContext";
import LogisticParams from "./LogisticParams"
import LinearParamas from "./LinearParamas"
import DecisionTreeParams from "./DecisionTreeParams"
import SVMParams from "./SVMParams"
import RandomForest from "./RandomForest"

const model_types = ["linear_regression",
"logistic_regression",
"decision_tree_classification",
"decision_tree_regression",
"svm_classification",
"svm_regression",
"random_forest_classification",
"random_forest_regression"]

function Inputs() {
  const val = useContext(InputContext);

  if(!val) return;

  const modelType = val?.modelType;
  const setModelType = val?.setModelType;
  const imputeStrategy = val?.imputeStrategy;
  const setImputeStrategy = val?.setImputeStrategy;
  return (
    <div className="w-full flex-1 h-0 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#424242] [&::-webkit-scrollbar-track]:bg-[#171717]">
        <Input Tag={CsvUpload} name={"Select CSV"}/>
        <SelectInput selectInput={modelType} setSelectInput={setModelType} data={model_types} name={"Model Type"} />
        <Input Tag={TargetColumn} name={"Target Column"}/>
        <SelectInput selectInput={imputeStrategy} setSelectInput={setImputeStrategy} data={["mean", "median", "most_frequent", "constant"]} name={"Imputer Strategy"} />
        {modelType === "logistic_regression" && <LogisticParams/>}
        {modelType === "linear_regression" && <LinearParamas/>}
        {(modelType === "decision_tree_classification" || modelType === "decision_tree_regression") && <DecisionTreeParams modelType={modelType}/>}
        {(modelType === "svm_classification" || modelType === "svm_regression") && <SVMParams modelType={modelType}/>}
        {(modelType === "random_forest_classification" || modelType === "random_forest_regression") && <RandomForest/>}
    </div>
  )
}

export default Inputs