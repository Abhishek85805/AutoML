import InputContext from '@/context/InputContext'
import {useContext} from 'react'
import SelectInput from './SelectInput';
import Input from './Input';
import NumberInput from './NumberInput';

type Type = {
  modelType: string;
}
function DecisionTreeParams({modelType}: Type) {
    const val = useContext(InputContext);
    if(!val) return;

    const criterion = val.criterion;
    const setCriterion = val.setCriterion;
    const maxDepth = val.maxDepth;
    const setMaxDepth = val.setMaxDepth;
    const minSampleSplit = val.minSampleSplit;
    const setMinSampleSplit = val.setMinSampleSplit;
    const minSampleLeaf = val.minSampleLeaf;
    const setMinSampleLeaf = val.setMinSampleLeaf
  return (
    <div>
        <SelectInput selectInput={criterion} setSelectInput={setCriterion} data={modelType === "decision_tree_classification" ? ["gini", "entropy"] : ["squared_error", "friedman_mse", "absolute_error"]} name={"Criterion"}/>
        <Input Tag={()=><NumberInput step={1} state={maxDepth} setState={setMaxDepth}/>} name={"Max Depth"}/>
        <Input name={"Min Sample Split"} Tag={()=><NumberInput step={1} state={minSampleSplit} setState={setMinSampleSplit}/>}/>
        <Input name={"Min Sample Leaf"} Tag={()=><NumberInput step={1} state={minSampleLeaf} setState={setMinSampleLeaf}/>}/>
    </div>
  )
}

export default DecisionTreeParams