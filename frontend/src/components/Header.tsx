import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate();
  return (
    <div className='h-[10vh] flex flex-row justify-between py-[16px] px-[3rem] lg:px-[6rem] border-b-[0.1px] border-[#262626] bg-black cursor-pointer'>
        <h1 className = 'font-semibold text-[1.4rem]'
        onClick={()=>{navigate("/")}}
        >
          AutoML
        </h1>
        <button 
        className='bg-[#262626] hover:bg-[#161616] transition duration-200 ease-linear py-[5px] px-[15px] rounded-md text-[0.9rem]'
        onClick={()=>navigate("/dashboard")}
        >
          Dashboard
        </button>
    </div>
  )
}

export default Header