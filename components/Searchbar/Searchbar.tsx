import React from 'react'
import { IFilter } from '../../interfaces/interfaces';
import { Services } from '../../services/service';
import './Searchbar.scss';
interface IProps {
  filterHandler : (filter : IFilter) => void,
  resetHandler : () => void,
  baseInput : IFilter
}
const services = new Services;
const Searchbar: React.FC<IProps> = ({filterHandler, resetHandler, baseInput}) : JSX.Element => {
    const [filter, setFilter] = React.useState<IFilter>(baseInput);
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if(event.target.value){
        setFilter({...filter, [event.target.name] : event.target.value})
      }else{
        setFilter(Object.fromEntries(Object.entries(filter).filter(([key]) => ![event.target.name].includes(key))));
      }
    }
    const startDateHandler = (event : React.FocusEvent<HTMLInputElement>) => {
      if(filter.finish_dt && services.dateToNumber(event.target.value) > services.dateToNumber(filter.finish_dt)){
        event.target.value = '';
        delete filter.start_dt;
      }
    }
    const endDateHandler = (event : React.FocusEvent<HTMLInputElement>) => {
      if(filter.start_dt && services.dateToNumber(event.target.value) < services.dateToNumber(filter.start_dt)){
        event.target.value = '';
        delete filter.finish_dt;
      }
    }
    return (
      <div className="searchbar">
          <div className="searchbar_fields">
            <input type="number" value={filter?.id || ''} name="id" onChange={inputHandler} placeholder="Идентификатор" className="searchbar_field form-control" />
            <input type="text" value={filter?.username || ''} name="username" onChange={inputHandler} placeholder="Имя" className="searchbar_field form-control" />
            <input type="date" value={filter?.start_dt || ''}  max={filter.finish_dt} name="start_dt" onChange={inputHandler} onBlur={startDateHandler} placeholder="C" className="searchbar_field form-control" />
            <input type="date" value={filter?.finish_dt || ''} min={filter.start_dt} name="finish_dt" onChange={inputHandler} onBlur={endDateHandler} placeholder="По" className="searchbar_field form-control" />
          </div>
          <div className="searchbar_handlers">
              <button className="searchbar_handler btn-default" onClick={() => {
                // @ts-ignore
                setFilter({});
                resetHandler();
              }}>Сбросить фильтр</button>
              <button className="searchbar_handler btn-primary" onClick={() => filterHandler(filter)}>Фильтровать</button>
          </div>
      </div>
    )
  }
  
export { Searchbar };