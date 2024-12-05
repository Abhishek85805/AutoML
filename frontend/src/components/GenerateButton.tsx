import InputContext from "@/context/InputContext"
import { useContext } from "react"
import {toast} from 'sonner'
import axios from 'axios';
import BlobFileContext from "@/context/BlobFileContext";

function GenerateButton() {
  const val = useContext(InputContext);
  const valu = useContext(BlobFileContext)
  if(!val || !valu) return;

  const setBlob = valu.setBlob;

  async function handleClick(){
    const file = val?.file;
    if(!file){
      toast.error("File is required");
      return;
    }

    const modelType = val?.modelType;
    if(!modelType){
      toast.error("Model type is required");
      return;
    }

    const targetColumn = val?.targetColumn;
    if(targetColumn.trim() === ""){
      toast.error("Target column is required");
      return;
    }

    const imputeStrategy = val.imputeStrategy;
    if(imputeStrategy === ""){
      toast.error("Impute Strategy is required");
      return;
    }

    if(modelType === "logistic_regression"){
      const c = val.c;
      const penalty = val.penalty;
      const solver = val.solver;
      const maxItr = val.maxIteration;

      if(c === 0 || penalty==="" || solver==="" || maxItr===0){
        toast.error("All the hyperparameters are required");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_type", modelType);
      formData.append("target_column", targetColumn);
      formData.append("C", c.toString());
      formData.append("penalty", penalty);
      formData.append("solver", solver);
      formData.append("max_iter", maxItr.toString());
      formData.append("impute_strategy", imputeStrategy);

      console.log(formData);
      try {
        const res = await axios.post('http://localhost:5000/train', formData, {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: 'blob',
        });
        console.log(res);
        setBlob(res.data);
      } catch (error:any) {
        if(error.response.data.message === "" || error.response.data.message===undefined || error.response.data.message ===null){
          toast.error("Invalid hyperparameter combination")
          return;
        }
        toast.error(error.response.data.message);
      }
      return;
    }

    if(modelType === "linear_regression"){
      const fitIntercept = val.fitIntercept;
      const copyX = val.copyX;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_type", modelType);
      formData.append("target_column", targetColumn);
      formData.append("impute_strategy", imputeStrategy);
      formData.append("fit_intercept", fitIntercept.toString());
      formData.append("copy_X", copyX.toString());

      try {
        const res = await axios.post('http://localhost:5000/train', formData, {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: 'blob',
        });
        console.log(res.data);
        setBlob(res.data);
      } catch (error:any) {
        if(error.response.data.message === "" || error.response.data.message===undefined || error.response.data.message ===null){
          toast.error("Invalid hyperparameter combination")
          return;
        }
        toast.error(error.response.data.message);
      }
      return;
    }

    if(modelType === "decision_tree_classification" || modelType === "decision_tree_regression"){
      const criterion = val.criterion;
      const maxDepth = val.maxDepth;
      const minSampleSplit = val.minSampleSplit;
      const minSampleLeaf = val.minSampleLeaf;

      if(criterion === ""){
        toast.error("Criterion is required")
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_type", modelType);
      formData.append("target_column", targetColumn);
      formData.append("impute_strategy", imputeStrategy);
      formData.append("criterion", criterion);
      formData.append("max_depth", maxDepth.toString());
      formData.append("min_samples_split", minSampleSplit.toString());
      formData.append("min_samples_leaf", minSampleLeaf.toString());

      try {
        const res = await axios.post('http://localhost:5000/train', formData, {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: 'blob',
        });
        setBlob(res.data);
      } catch (error:any) {
        if(error.response.data.message === "" || error.response.data.message===undefined || error.response.data.message ===null){
          toast.error("Invalid hyperparameter combination")
          return;
        }
        toast.error(error.response.data.message);
      }
      return;
    }

    if (modelType === "svm_classification" || modelType === "svm_regression") {
      const kernel = val.kernel; // e.g., 'linear', 'rbf', etc.
      const c = val.c; // Regularization parameter
      const degree = val.degree; // Degree for polynomial kernel (if applicable)
      const gamma = val.gamma; // Kernel coefficient
      const probability = modelType === "svm_classification" ? val.probability : null; // Only for classification
      const epsilon = modelType === "svm_regression" ? val.epsilon : null; // Only for regression
  
      // Validate required fields
      if (!kernel || c === undefined || degree === undefined || !gamma) {
          toast.error("All required SVM parameters must be provided");
          return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_type", modelType);
      formData.append("target_column", targetColumn);
      formData.append("impute_strategy", imputeStrategy);
      formData.append("kernel", kernel);
      formData.append("C", c.toString());
      formData.append("degree", degree.toString());
      formData.append("gamma", gamma);
      
      if (modelType === "svm_classification" && probability !== null) {
          formData.append("probability", probability.toString());
      }
  
      if (modelType === "svm_regression" && epsilon !== null) {
          formData.append("epsilon", epsilon.toString());
      }
  
      try {
          const res = await axios.post('http://localhost:5000/train', formData, {
              headers: { "Content-Type": "multipart/form-data" },
              responseType: 'blob',
          });
          setBlob(res.data);
      } catch (error: any) {
          if(error.response.data.message === "" || error.response.data.message===undefined || error.response.data.message ===null){
            toast.error("Invalid hyperparameter combination")
            return;
          }
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          toast.error(errorMessage);
      }
      return;
    }

    if (modelType === "random_forest_classification" || modelType === "random_forest_regression") {
      const nEstimators = val.nEstimators; // Number of trees in the forest
      const maxDepth = val.maxDepth; // Maximum depth of the tree
      const minSampleSplit = val.minSampleSplit; // Minimum samples required to split an internal node
      const minSampleLeaf = val.minSampleLeaf; // Minimum samples required to be a leaf node
  
      // Validate required fields
      if (
          nEstimators === undefined ||
          maxDepth === undefined ||
          minSampleSplit === undefined ||
          minSampleLeaf === undefined
      ) {
          toast.error("All required Random Forest parameters must be provided");
          return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_type", modelType);
      formData.append("target_column", targetColumn);
      formData.append("impute_strategy", imputeStrategy);
      formData.append("n_estimators", nEstimators.toString());
      formData.append("max_depth", maxDepth.toString());
      formData.append("min_samples_split", minSampleSplit.toString());
      formData.append("min_samples_leaf", minSampleLeaf.toString());
  
      try {
          const res = await axios.post('http://localhost:5000/train', formData, {
              headers: { "Content-Type": "multipart/form-data" },
              responseType: 'blob',
          });
          setBlob(res.data);
      } catch (error: any) {
          if(error.response.data.message === "" || error.response.data.message===undefined || error.response.data.message ===null){
            toast.error("Invalid hyperparameter combination")
            return;
          }
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          toast.error(errorMessage);
      }
      return;
    }
  
    console.log({
      file,
      modelType,
      targetColumn,
      imputeStrategy
    })
  }

  return (
    <div className="h-[4rem] box-border flex justify-center items-center px-[0.6rem]">
        <button 
        className="bg-[#757575] w-full text-black px-[1.3rem] py-[0.4rem] rounded-md font-semibold"
        onClick={handleClick}
        >
          Train Model
        </button>
    </div>
  )
}

export default GenerateButton