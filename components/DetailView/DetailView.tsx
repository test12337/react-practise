import React from 'react'
import './DetailView.scss';
import { UserType } from '../../interfaces/interfaces';

interface TableProps {
  data : UserType
}
const DetailView: React.FC<TableProps> = ({data}) : JSX.Element => {
    return Object.keys(data).length ? (
        <div className="user_table">
          <table>
              <body>           
                    {
                        Object.entries(data).map(e => {
                            return (<tr>
                                <td>{e[0]}</td>
                                <td>{e[1]}</td>
                            </tr>)
                        })
                    }
              </body>
          </table>
        </div>
    )
    : 
    <div></div>;
  }
  
export { DetailView };