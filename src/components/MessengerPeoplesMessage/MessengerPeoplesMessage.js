import { useDispatch, useSelector } from 'react-redux'
import { selectMessages, toggleActiveUser } from '../../store/slices/messages/messagesSlice'
import { selectUsers } from '../../store/slices/users/usersSlice'
import './MessengerPeoplesMessage.css'

function MessengerPeoplesMessage({ name, id }) {
	const dispatch = useDispatch()
	const {activeUserId} = useSelector(selectMessages)
	const {currentUser} = useSelector(selectUsers)

  return (
		<div className={activeUserId === id ? 'Messenger-left-col-people-message activeUser' : 'Messenger-left-col-people-message'}
			onClick={() => dispatch(toggleActiveUser({userId: id, currentUserId: currentUser.id}))}>
			<div className='Messsage-img'>
				<img src={`https://avatars.mds.yandex.net/i?id=7fbd18e4a098cfa8896ed42455ddfb70e91d31c7-8209398-images-thumbs&n=13`} alt=''/>
			</div>
			<div className='Message-info'>
				<p>{name}</p>
			</div>
	 	</div>
  )
}

export default MessengerPeoplesMessage
