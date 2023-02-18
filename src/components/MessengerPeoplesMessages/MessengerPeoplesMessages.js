import './MessengerPeoplesMessages.css'
import MessengerPeoplesMessage from '../MessengerPeoplesMessage/MessengerPeoplesMessage'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { memo, useMemo } from 'react'

function MessengerPeoplesMessages() {
	const {currentUser, usersData} = useSelector(selectUsers)

	const users = useMemo(() => {
		return [...usersData.filter(user => user.id !== currentUser.id)]
	}, [])

  return (
	 <div className='Messenger-left-col-peoples-messages'>
		{
			users.map(el => <MessengerPeoplesMessage key={el.id} id={el.id} name={el.username} />)
		}
	 </div>
  )
}

export default memo(MessengerPeoplesMessages)
