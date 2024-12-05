function FeatureComponent(props: any) {
  return (
    <div key={props.index} className="w-[18rem] border border-[#262626] rounded-lg p-[2rem]">
        <div className="font-semibold text-[20px] mb-[2rem] text-[#5e5b5b]">{props.title}</div>
        <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0 mb-[2rem]"/>
        <div className="text-[#464545]">{props.description}</div>
    </div>
  )
}

export default FeatureComponent