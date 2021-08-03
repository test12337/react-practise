import React, {useEffect, useState} from 'react'
import { DetailView } from '../DetailView/DetailView';
import { UserType, UserTemplate } from '../../interfaces/interfaces';
import './UserDetails.scss';
import { apiWorker } from '../../services/api';
interface UserDetailsP {
  userId : string
}
const api = new apiWorker();
const UserDetails: React.FC<UserDetailsP> = ({userId}) : JSX.Element => {
  const [user, setUser] = useState<UserType>(UserTemplate);
  useEffect(() => {
    api.getUser(userId)
    .then(user => setUser(user))
    .catch(error => alert(error));
  }, []);
  return (
    <section className="user">
      <div className="container">
        <div className="user_header">
          <h1>{user.username}</h1>
        </div>
        {Object.keys(user).length ? <DetailView data={user}/> : <div className="card"><span>Loading...</span></div>}
      </div>
    </section>
  )
}
  
export { UserDetails };