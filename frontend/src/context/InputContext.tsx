import { createContext } from "react"

type InputContextType = {
    targetColumn: string;
    setTargetColumn: (value:string) => void;
    modelType: string;
    setModelType: (value:string) => void;
    file: File | null;
    setFile: (value: File) => void;
    c: number;
    setC: (value: number) => void;
    penalty: string;
    setPenalty: (value:string) => void;
    solver: string;
    setSolver: (value:string) => void;
    maxIteration: number;
    setMaxIteration: (value: number) => void;
    imputeStrategy : string;
    setImputeStrategy: (value:string) => void;
    fitIntercept: boolean;
    setFitIntercept: (value: boolean) => void;
    copyX: boolean;
    setCopyX: (value: boolean) => void;
    criterion: string;
    setCriterion: (value: string) => void;
    maxDepth: number;
    setMaxDepth: (value: number) => void;
    minSampleSplit: number;
    setMinSampleSplit: (value: number) => void;
    minSampleLeaf: number;
    setMinSampleLeaf: (value: number) => void;

    kernel: string;
    setKernel: (value:string) => void;
    degree: number;
    setDegree: (value: number) => void;
    gamma: string;
    setGamma: (value:string) => void;
    probability: boolean;
    setProbability: (value: boolean) => void;
    epsilon: number;
    setEpsilon: (value: number) => void;
    
    nEstimators: number;
    setNEstimators: (value: number) => void;
  }

const InputContext = createContext<null | InputContextType>(null);

export default InputContext;

