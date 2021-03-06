import React, { useState ,useRef} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';
import parse from "html-react-parser"
import "./Compose.css";
import "./Draft.css";

const Compose = () => {
    const emailidRef = useRef();
    const SubjectRef = useRef();
    
  const [text, setText] = useState("");
  
  const submitHandler=async(event)=>{
      event.preventDefault();   
      const receiver = emailidRef.current.value;
      const sender = localStorage.getItem('Email');
      
      const name   = receiver.substring(0, receiver.lastIndexOf("@"));
      const Sendername  = sender.substring(0, sender.lastIndexOf("@"));
      console.log(Sendername);
      const data={
          sender:sender,
          receiver:receiver,
          subject:SubjectRef.current.value,
          body:text,
          read:false,
      }
      try{
          const res = await axios.post(`https://mailbox-client-default-rtdb.firebaseio.com/${name}/receive.json`,data);
          console.log(res.statusText==='OK');
          if(res.statusText==='OK'){
              
              const res2 = await axios.post(`https://mailbox-client-default-rtdb.firebaseio.com/${Sendername}/send.json`,data);
              if(res2.statusText==='OK'){
                alert('Mail Send Successfull');
              }else{
                  throw new Error('Something Went wrong!');
              }

          }else{
            throw new Error('Something Went wrong!');
          }
      }catch(err){
          alert(err);
      }

  }
  return (
    <div className="mainDivCompose">
      <div className="subDivCompose">
        <div className="toDiv">
          <label> To</label>
          <input
            type="email"
            ref={emailidRef}
            className="inputemail"
            placeholder="Email Address"
          />
        </div>
        <div className="toDiv">
          <label> Subject</label>
          <input
            type="text"
            ref={SubjectRef}
            className="inputSubject"
            placeholder="Email Subject"
          />
        </div>
        <div>
          <div className="App">
            <div className="editor">
              <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                }}
                
              />
            </div>
          </div>
          <div className="submitDiv" >
              <button className="submitBTN" onClick={submitHandler} >Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
