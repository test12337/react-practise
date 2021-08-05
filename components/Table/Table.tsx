import React from 'react'
import './Table.scss';
import { History } from 'history';
import { Link } from 'react-router-dom';
import { UserType } from '../../interfaces/interfaces';

interface TableProps {
  data : Array<UserType>,
  history : History
}
const Table: React.FC<TableProps> = ({data, history}) : JSX.Element => {
    let usernameIndex : number = 0;
    return data.length ? (
        <div className="users_table">
          <table>
              <thead>           
                  <tr>
                    {Object.keys(data[0]).map((key, index) => {
                      if (key === 'username') {
                        usernameIndex = index;
                      }
                      return <th>{key}</th>
                    })}
                  </tr>
              </thead>
              <tbody>
                  {
                    data.map(user => (<tr onClick={(e) => {
                    history.push(`/user/${user.id}`);
                    }} key={user.id}>{Object.values(user).map((property, index) => <td key={index}>{index === usernameIndex ? <Link to={`/user/${user.id}`}>{property}</Link> : property}</td>)}</tr>))
                  }
              </tbody>
          </table>
        </div>
    )
    : 
    <div className="card">
      <span>There is currently no data...</span>
    </div>;
  }
  
export { Table };