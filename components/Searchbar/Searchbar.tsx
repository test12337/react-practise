import React from 'react'
import { IFilter } from '../../interfaces/interfaces';
import './Searchbar.scss';
interface IProps {
  filterHandler : (filter : IFilter) => void,
  resetHandler : () => void,
  baseInput : IFilter
}

const Searchbar: React.FC<IProps> = ({filterHandler, resetHandler, baseInput}) : JSX.Element => {
    const [filter, setFilter] = React.useState<IFilter>(baseInput);
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter({...filter, [event.target.name] : event.target.value})
    }
    return (
      <div className="searchbar">
          <div className="searchbar_fields">
            <input type="number" value={filter.id} name="id" onChange={inputHandler} placeholder="Идентификатор" className="searchbar_field form-control" />
            <input type="text" value={filter.username} name="username" onChange={inputHandler} placeholder="Имя" className="searchbar_field form-control" />
            <input type="date" value={filter.start_dt}  max={filter.finish_dt} name="start_dt" onChange={inputHandler} placeholder="C" className="searchbar_field form-control" />
            <input type="date" value={filter.finish_dt} min={filter.start_dt} name="finish_dt" onChange={inputHandler} placeholder="По" className="searchbar_field form-control" />
          </div>
          <div className="searchbar_handlers">
              <button className="searchbar_handler btn-default" onClick={() => {
                setFilter({id : '', username : '', start_dt : '', finish_dt : ''});
                resetHandler();
              }}>Сбросить фильтр</button>
              <button className="searchbar_handler btn-primary" onClick={() => filterHandler(filter)}>Фильтровать</button>
          </div>
      </div>
    )
  }
  
export { Searchbar };