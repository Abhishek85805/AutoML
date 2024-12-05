import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3Alt, faHtml5, faJs, faReact } from '@fortawesome/free-brands-svg-icons';

function Technologies() {
  return (
    <div className='w-full flex flex-col items-center relative overflow-hidden min-h-[400px]'>
        <div className='text-[2rem] font-semibold mb-[30px]'>Tech Stack</div>
        <div className='flex gap-[40px] md:gap-[5vw] mb-[100px] z-[300]'>
            <FontAwesomeIcon className='text-[#61DBFB] w-[40px] h-[40px]' icon={faReact} />
            <FontAwesomeIcon className='text-[#F0DB4F] w-[40px] h-[40px]' icon={faJs} />
            <FontAwesomeIcon className='text-[#e34c26] w-[40px] h-[40px]' icon={faHtml5} />
            <FontAwesomeIcon className='text-[#264de4] w-[40px] h-[40px]' icon={faCss3Alt} />
        </div>
        
        <div className='shadow-[rgba(150,_110,_90,_0.4)_0px_0px_400px_100px] w-[400px] h-[400px] rounded-[50%] absolute top-[20rem] lg:top-[25rem] md:top-[25rem]'></div>
        <div className="w-[80rem] h-[50rem] rounded-[50%] bg-black absolute top-[15rem]"></div>
    </div>
  )
}

export default Technologies