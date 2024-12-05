import InputContext from '@/context/InputContext'
import {useContext} from 'react'
import Input from './Input'
import NumberInput from './NumberInput';

function RandomForest() {
    const val = useContext(InputContext);
    if(!val) return;
    
    const maxDepth = val.maxDepth;
    const setMaxDepth = val.setMaxDepth;
    const minSampleLeaf = val.minSampleLeaf;
    const setMinSampleLeaf = val.setMinSampleLeaf;
    const minSampleSplit = val.minSampleSplit;
    const setMinSampleSplit = val.setMinSampleSplit
    const nEstimators = val.nEstimators;
    const setNEstimators = val.setNEstimators;
  return (
    <div>
        <Input Tag={()=><NumberInput step={1} state={nEstimators} setState={setNEstimators}/>} name={"n estimator"}/>
        <Input Tag={()=><NumberInput step={1} state={maxDepth} setState={setMaxDepth}/>} name={"Max Depth"}/>
        <Input name={"Min Sample Split"} Tag={()=><NumberInput step={1} state={minSampleSplit} setState={setMinSampleSplit}/>}/>
        <Input name={"Min Sample Leaf"} Tag={()=><NumberInput step={1} state={minSampleLeaf} setState={setMinSampleLeaf}/>}/>
    </div>
  )
}

export default RandomForest