import { useNavigate } from "react-router-dom"

function DashboardLogo() {
  const navigate = useNavigate();
  return (
    <h1 
    className="font-semibold box-border text-[1.4rem] pt-[15px] pl-[15px] pb-[30px] tracking-wider h-[4rem] cursor-pointer"
    onClick={()=>{navigate("/")}}
    >
        AutoML
    </h1>
  )
}

export default DashboardLogo