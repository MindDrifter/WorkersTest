import { Link, useNavigate } from "react-router-dom";
import { Option, Select } from "../../components/select/select"
import { addWorker, WorkerI } from "../../redux/workersSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import InputMask from 'react-input-mask';
import { useForm } from "react-hook-form";
import styles from './style.module.scss'

const roleOptions: Option[] = [
  {
    title: 'Все работы',
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


export const AddWorker = () => {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<WorkerI>()

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const handleFormSubmit = (data: Omit<WorkerI, 'id'>) => {
    dispatch(addWorker({ ...data }))
    navigate('/')
  }
  const validateSpaces = (fieldName: keyof WorkerI) => (value: string) => {
    if (value.trim() === '') {
      setError(fieldName, {
        type: 'onlySpaces', 
      });
      return false; 
    }
    if (value.trim().length < 5) { 
      setError(fieldName, {
        type: 'minLength'
      })
      return false;
    }
    return true; 
  };

  return (
    <div className={styles.container}>
      <Link to={'/'}>На главную</Link>
      <h1>Добавить сотрудника </h1>
      <form className={styles.from_container} onSubmit={handleSubmit(handleFormSubmit)} >
        <input
          className={errors.name ? styles.error : ''}
          {...register("name", { required: true, minLength: 5, validate:validateSpaces('name') })}
          type="text"
          placeholder="Имя"
          aria-invalid={errors.name ? "true" : "false"}
        />
        <InputMask
          className={errors.phone ? styles.error : ''}
          maskChar={null}
          {...register("phone", { maxLength: 17, minLength: 17, required: true, })}
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
          register={{ ...register("role", { required: true }) }}
          options={roleOptions} />
        <span> в архиве</span>
        <input   {...register("isArchive")} type="checkbox" />
        <button type="submit">Добавить</button>
      </form>
      {errors.name?.type === 'required' ? <p role="alert">{'Введите имя сотрудника'}</p> : ''}
      {errors.name?.type === 'minLength' ? <p role="alert">{'Минимальная длина имени - 5 символов'}</p> : ''}
      {errors.name?.type === 'validate' ?  <p role="alert">{'Имя сотрудника не может состоять из пробелом'}</p> : ''}

      {errors.phone?.type === 'required' ? <p role="alert">{'Введите телефон'}</p> : ''}
      {errors.phone?.type === 'minLength' ? <p role="alert">{'Длина телефона - 17 символов'}</p> : ''}

      {errors.birthday?.type === 'required' ? <p role="alert">{'Введите день рождения'}</p> : ''}
      {errors.birthday?.type === 'minLength' ? <p role="alert">{'Длина поля дня рождения - 10 символов'}</p> : ''}

      {errors.role?.type === 'required' ? <p role="alert">{'Введите роль сотрудника'}</p> : ''}

  
    </div>


  )
}

