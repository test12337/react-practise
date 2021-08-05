import React, {useEffect, useState, Context} from 'react'
import { UserType, IFilter, UserTemplate } from '../../interfaces/interfaces';
import { useHistory } from 'react-router-dom';
import { Searchbar } from '../Searchbar/Searchbar';
import { Table } from '../Table/Table';
import { apiWorker } from '../../services/api';
import { Services } from '../../services/service';
import './Users.scss';
const api = new apiWorker();
const service = new Services();
const UsersContext = React.createContext(true);
const Users: React.FC = () : JSX.Element => {
  let history = useHistory();
  const [users, setUsers] = useState<UserType[]>([]);
  const storageFilterOptions = JSON.parse(localStorage.getItem('filterOptions') || '{}');
  useEffect(() => {
    Object.keys(storageFilterOptions).length ? filterHandler(storageFilterOptions) : usersRequest();
  }, []);
  const filterHandler = async (request : IFilter) : Promise<void> => {
    if(request){
      const modifiedFilter = {...request};
      'start_dt' in modifiedFilter ? modifiedFilter.start_dt += ' 00:00:00' : null;
      'finish_dt' in modifiedFilter ? modifiedFilter.finish_dt += ' 23:59:59' : null;
      api.filterUsers(service.filterToRequest(modifiedFilter))
      .then(filteredUsers => {
        localStorage.setItem('filterOptions', JSON.stringify(request));
        setUsers(filteredUsers);
      })
      .catch(error => alert(error));
    }
  }
  const usersRequest = async () : Promise<void> => {
    api.getUsers()
    .then(users => {
      localStorage.removeItem('filterOptions');
      setUsers(users)
    })
    .catch(error => alert(error));
  }
  return (
    <UsersContext.Provider value={false}>
    <section className="users">
      <div className="container">
        <div className="users_header">
          <h1>Отзывы за визиты</h1>
          <div className="users_header_subtitle">Фильтр по отзывам за визиты</div>
        </div>
        <Searchbar 
        baseInput={Object.keys(storageFilterOptions).length ? storageFilterOptions : {}} 
        filterHandler={filterHandler} 
        resetHandler={usersRequest}/>
        <Table data={users} history={history}/>
      </div>
    </section>
    </UsersContext.Provider>
  )
}
  
export { Users, UsersContext };