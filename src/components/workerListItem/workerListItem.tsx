import { Link } from "react-router-dom"
import style from './styles.module.scss'

interface props {
  id: number
  name: string,
  role: WorkType,
  phone: string,
  archive: boolean
}

export type WorkType = 'cook'| 'waiter' | 'driver'

const roleObject = {
  'cook':'Повар',
  'waiter':'Официант',
  'driver':'Водитель',
}

export const WorkerListItem = ({ id, role, name, phone, archive }: props) => {
  return (
    <li className={style.container} >
      <div>
        <div>
          <span>Имя - </span>
          <span>
            {name}
            {
              archive &&
              <span className={style.archive_title}> - в архиве</span>
            }
          </span>
        </div>

        <div>
          <span>Роль - </span>
          
          <span>{
          roleObject[role]}
          </span>
        </div>

        <div>
          <span>Телефон - </span>
          <span>{phone}</span>
        </div>

      </div>

      <Link to={`/${id}`}>редактировать</Link>
    </li>
  )
}