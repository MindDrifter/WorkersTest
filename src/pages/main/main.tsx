import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { sortWorkers, SortType, RoleType } from "../../redux/workersSlice"
import { useEffect, useState } from "react"
import Select from "../../components/select"
import { Option } from "../../components/select/select"
import WorkerListItem from "../../components/workerListItem"
import { Link } from "react-router-dom"
import styles from './styles.module.scss'
import { WorkType } from "../../components/workerListItem/workerListItem"

const roleOptions: Option[] = [
  {
    title: 'Все роли',
    value: ''
  },
  {
    title: 'Повар',
    value: 'cook'
  },
  {
    title: 'Официант',
    value: 'waiter'
  },
  {
    title: 'Водитель',
    value: 'driver',
  }
]

const sortOptions: Option[] = [
  {
    value: '',
    title: 'Не сортировать'
  },
  {
    value: 'name:asc',
    title: 'По имени: А-Я'
  }
  ,
  {
    value: 'name:desc',
    title: 'По имени: Я-А'
  }
  ,
  {
    value: 'date:asc',
    title: 'По дате: возрастание'
  }
  ,
  {
    value: 'date:desc',
    title: 'По дате: убывание'
  }
]


export const Main = () => {
  const workers = useSelector((state: RootState) => state.workers)
  const dispatch = useDispatch<AppDispatch>()

  const [sortType, setSortType] = useState<SortType>('')
  const [role, setRole] = useState<RoleType>('')
  const [archive, setArchive] = useState(false)

  const handleArchive = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArchive(e.target.checked)
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as SortType)
  }

  const handleJob = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as RoleType)
  }

  useEffect(() => {
    dispatch(sortWorkers({ archive: archive, type: sortType, role: role }))

  }, [sortType, archive, role])

  return (
    <div className={styles.container}>
      <h1>Сотрудники</h1>
      <Link to={'/addworker'}>Добавить сотрудника</Link>
      <div className={styles.filters}>

        <Select options={roleOptions} onOptionChange={(e) => handleJob(e)} />
        <Select options={sortOptions} onOptionChange={(e) => handleSort(e)} />
        <div>
          <span> в архиве</span>
          <input onChange={e => handleArchive(e)} type="checkbox" checked={archive} />
        </div>

      </div>



      <ul>
        {workers?.data.map(worker => {
          return <WorkerListItem
            key={worker.id}
            id={worker.id}
            name={worker.name}
            phone={worker.phone}
            role={worker.role as WorkType}
            archive={worker.isArchive}
          />
        })}
      </ul>

    </div>

  )
}
