import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import parse from "html-react-parser"
import { MailItemActions } from '../../../store/MailFullBody';
import { InboxActions } from '../../../store/inboxToggle';

import './MailBox.css';

const MailInbox=(props)=>{
    const dispatch = useDispatch();
    const isSentbox = useSelector(state=>state.isInbox.setBox)
    console.log(props)

    const mailBoxHandler=async()=>{ 
        console.log(props)
        dispatch(MailItemActions.addNewItem(props))
        dispatch(MailItemActions.setClicked(true));
        dispatch(InboxActions.setInbox(false));
        dispatch(InboxActions.setSentBox(false));
        console.log(props.id)
        if(!isSentbox && !props.isRead){

            const receiver = props.receiver;
            const name   = receiver.substring(0, receiver.lastIndexOf("@"));
            const id = props.id;
            const data ={
                "read": true
            }
            try{
                const res = await axios.patch(`https://mailbox-client-default-rtdb.firebaseio.com/${name}/receive/${id}.json`,data)
                console.log(res)
            }catch(err){
                console.log(err);
            }
        }
    }


    return(
        <div >
            <div className="itemDivmail" onClick={mailBoxHandler}>
                {!props.isRead && !isSentbox && <span className={props.isRead? 'read' : 'unread'}>•</span>}
                <label className="gap">{props.subject}</label>
                <label className="gap">{parse(props.body)}</label>
                <label className="gap">{props.sender}</label>
            </div>
                
        </div>
    ) 
}

export default MailInbox;