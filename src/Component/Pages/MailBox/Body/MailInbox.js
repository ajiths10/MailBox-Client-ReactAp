
import parse from "html-react-parser"
import './MailBox.css';

const MailInbox=(props)=>{
    console.log(props)
    return(
        <div >
            <div className="itemDivmail">
                <label className="gap">{props.subject}</label>
                <label className="gap">{parse(props.body)}</label>
                <label className="gap">{props.sender}</label>
            </div>
        </div>
    )
}

export default MailInbox;