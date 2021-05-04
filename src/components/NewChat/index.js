import React, { useEffect, useState } from 'react';

import'./styled.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Api from '../../Api'


function NewChat({chatlist, user, show, setShow}) {
    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async () => {
            
            if(user !== null){
                let result = await Api.getContactList(user.id)
                setList(result)
            }
        
        }
        getList()
    }, [user])

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);

        handleClose();
    }

    const handleClose = () => {
        setShow(false)
    }

  return (
      <div className="newChat" style={{left: show ? 0 : -415}}>
          <div className="newChat--head">
            <div onClick={handleClose} className="newChat--backbutton">
                <ArrowBackIcon style={{color: '#FFFFFF'}} />
            </div>
            <div className="newChat--headtitle">
                Nova Conversa
            </div>
          </div>
          <div className="newChat--list">
                {list.map((item, key) => (
                    <div onClick={()=>addNewChat(item)} className="newChat--item" key={key}>
                        <img className='newChat--itemavatar' src={item.avatar} alt=""/>
                        <div className="newChat--itemname">
                            {item.name}
                        </div>
                    </div>
                ))}
          </div>
      </div>
  )
}

export default NewChat;