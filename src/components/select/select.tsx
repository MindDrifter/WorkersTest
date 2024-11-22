import { RoleType, SortType } from "../../redux/workersSlice"

export type Option = {
  value: RoleType | SortType,
  title:string
}

interface props {
  options:Option[],
  onOptionChange?:(e: React.ChangeEvent<HTMLSelectElement>)=>void,
  defaultValue?:string,
  register?:any,
  className?:string

}

export const Select = ({options, onOptionChange, defaultValue, register, className}:props)=>{

  return(
    <select className={className} {...register} defaultValue={defaultValue} onChange={(e)=>onOptionChange?onOptionChange(e):''}>
      {
        options.map((option, idx)=>{
          return <option key={idx} value={option.value}>{option.title}</option>
        })
      }
    </select>
  )

}