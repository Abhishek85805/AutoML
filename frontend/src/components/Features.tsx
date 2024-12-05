import FeatureComponent from "./FeatureComponent"

const features = [
    {
        title: "Multiple Model Options",
        description: "Users can choose from various machine learning models such as Logistic Regression, SVM, Random Forest, and Decision Tree for both classification and regression tasks, offering flexibility based on their data."
    },
    {
        title: "Customizable Hyperparameters",
        description: "The user can select and adjust hyperparameters specific to each model, allowing for optimized model performance based on their dataset."
    },
    {
        title: "Model Training and Evaluation",
        description: "Once a model is selected and hyperparameters are set, the system trains the model on the provided dataset and predicts its accuracy, giving users insights into model performance."
    },
    {
        title: "Seamless Frontend and Backend Integration",
        description: "The React frontend allows easy user interaction for uploading datasets and selecting models, while the Python backend handles the training and evaluation process efficiently."
    },
]

function Features() {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[5rem] p-[2rem]">
        <div className='text-[2rem] font-semibold mb-[30px]'>Features</div>

        <div className="flex flex-row w-full justify-center items-start gap-[10px] flex-wrap">
            {
                features.map((feature, index) => <FeatureComponent key={index} title = {feature.title} description = {feature.description}/>)
            }
        </div>
    </div>
  )
}

export default Features