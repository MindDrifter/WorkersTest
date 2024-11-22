import { Link, useNavigate, useParams } from "react-router-dom";
import { Option, Select } from "../../components/select/select"
import { useEffect, useState } from "react";
import { updateWorker, WorkerI } from "../../redux/workersSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import InputMask from 'react-input-mask';
import { useForm } from "react-hook-form";
import styles from './style.module.scss'

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


export const Worker = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WorkerI>()

  const params = useParams()
  const navigate = useNavigate()

  const workers = useSelector((state: RootState) => state.workers)
  const dispatch = useDispatch<AppDispatch>()
  const [name, setName] = useState('')

  useEffect(() => {
    const worker = workers.data.filter(worker => worker.id === Number(params.id))[0]
    
    if (!worker) {
      navigate('/')
      return
    }
    setValue('birthday', worker.birthday)
    setValue('id', worker.id)
    setValue('isArchive', worker.isArchive)
    setValue('name', worker.name)
    setValue('phone', worker.phone)
    setValue('role', worker.role)
    setName(worker.name)


  }, [])

  const handleFormSubmit = (data: WorkerI) => {
    dispatch(updateWorker({ ...data, id: Number(params.id)! }))
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <Link to={'/'}>На главную</Link>
      <h1>Сотрудник {name} </h1>
      <form className={styles.from_container} onSubmit={handleSubmit(handleFormSubmit)} >
        <input
          className={errors.name ? styles.error : ''}

          {...register("name", { required: true, minLength: 5 })}
          type="text"
          placeholder="Имя" />
        <InputMask
          className={errors.phone ? styles.error : ''}
          maskChar={null}
          {...register("phone", { required: true, maxLength: 17, minLength: 17 })}
          mask="+7 (999) 999-9999"
          placeholder="+7 (___) ___-____"

        />
        <InputMask
          className={errors.birthday ? styles.error : ''}
          {...register("birthday", { required: true, minLength: 10, maxLength: 10 })}
          maskChar={null}
          mask="99.99.9999"
          placeholder="ДД.ММ.ГГГГ"

        />
        <Select
          className={errors.role ? styles.error : ''}
          register={{ ...register("role", { required: true, }) }}
          options={roleOptions} />
        <div>
          <span> в архиве</span>
          <input   {...register("isArchive")} type="checkbox" />
        </div>
        <button type="submit">Обновить</button>
      </form>
      {errors.name?.type === 'required' ? <p role="alert">{'Введите имя сотрудника'}</p> : ''}
      {errors.name?.type === 'minLength' ? <p role="alert">{'Минимальная длина имени - 5 символов'}</p> : ''}

      {errors.phone?.type === 'required' ? <p role="alert">{'Введите телефон'}</p> : ''}
      {errors.phone?.type === 'minLength' ? <p role="alert">{'Длина телефона - 17 символов'}</p> : ''}

      {errors.birthday?.type === 'required' ? <p role="alert">{'Введите день рождения'}</p> : ''}
      {errors.birthday?.type === 'minLength' ? <p role="alert">{'Длина поля дня рождения - 10 символов'}</p> : ''}

      {errors.role?.type === 'required' ? <p role="alert">{'Введите роль сотрудника'}</p> : ''}

    </div>


  )
}

