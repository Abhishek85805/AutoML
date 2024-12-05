import InputContext from "@/context/InputContext"
import DashboardLogo from "./DashboardLogo"
import GenerateButton from "./GenerateButton"
import Inputs from "./inputs/Inputs"
import { useState } from "react"

function Lefty() {
  const [targetColumn, setTargetColumn] = useState("");
  const [modelType, setModelType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imputeStrategy, setImputeStrategy] = useState("");
  const [c, setC] = useState<number>(1.0);
  const [penalty, setPenalty] = useState("");
  const [solver, setSolver] = useState("");
  const [maxIteration, setMaxIteration] = useState(100);

  const [fitIntercept, setFitIntercept] = useState(false);
  const [copyX, setCopyX] = useState(false);

  const [criterion, setCriterion] = useState("");
  const [maxDepth, setMaxDepth] = useState(3);
  const [minSampleSplit, setMinSampleSplit] = useState(2);
  const [minSampleLeaf, setMinSampleLeaf] = useState(1);

  const [kernel, setKernel] = useState("");
  const [degree, setDegree] = useState(3);
  const [gamma, setGamma] = useState("");
  const [probability, setProbability] = useState(false);
  const [epsilon, setEpsilon] = useState(0.1);

  const [nEstimators, setNEstimators] = useState(100);
  
  return (
    <div className="w-[25vw] h-full bg-[#171717] box-border flex flex-col">
      <InputContext.Provider value={{targetColumn, setTargetColumn, modelType, setModelType, file, setFile, c, setC, penalty, setPenalty, solver, setSolver, maxIteration, setMaxIteration, imputeStrategy, setImputeStrategy, fitIntercept, setFitIntercept, copyX, setCopyX, criterion, setCriterion, maxDepth, setMaxDepth, minSampleSplit, setMinSampleSplit, minSampleLeaf, setMinSampleLeaf, kernel, setKernel, degree, setDegree, gamma, setGamma, probability, setProbability, epsilon, setEpsilon, nEstimators, setNEstimators}}>
        <DashboardLogo/>
        <Inputs/>
        <GenerateButton/>
      </InputContext.Provider>
    </div>
  )
}

export default Lefty