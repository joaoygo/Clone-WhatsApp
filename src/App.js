import React, { useEffect, useState } from 'react';
import './App.css';
import Api from './Api'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(()=>{
      if(user !== null) {
        let unsub= Api.onChatlist(user.id, setChatList)
        return unsub;
      }
  }, [user])

  const [chatlist, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }

  if(user === null) {
    return (<Login onReceive={handleLoginData} />)
  }

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  return (
    <div className="app-window">
        <div className="sidebar">
            <NewChat 
              chatlist={chatlist}
              user={user}
              show={showNewChat}
              setShow={setShowNewChat}    
            />
            <header>
              <img className='header--avatar' src={user.avatar}/>
              <div className="header--buttons">
                <div className="header--btn">
                  <DonutLargeIcon style={{color: '#919191'}} />
                </div>
                <div onClick={handleNewChat} className="header--btn">
                  <ChatIcon style={{color: '#919191'}} />
                </div>
                <div className="header--btn">
                  <MoreVertIcon style={{color: '#919191'}} />
                </div>
              </div>
            </header>

            <div className="search">
              <div className="search--input">
                <SearchIcon style={{color: '#919191'}} />
                <input type="search" placeholder='Procurar ou começar uma nova conversa'/>
              </div>
            </div>
              
            <div className="chatlist">
              {chatlist.map((item, key) => (
                  <ChatListItem 
                    key={key}
                    data={item}
                    active={activeChat.chatId === chatlist[key].chatId} 
                    onClick={()=>setActiveChat(chatlist[key])}
                  />
              ))}
            </div>

        </div>
        <div className="contentarea">
          
          {activeChat.chatId !== undefined && 
            <ChatWindow 
              user={user}
              data={activeChat}
            />
          }
          {activeChat.chatId === undefined &&
            <ChatIntro />
          }

        </div>
    </div>
  );
}

export default App;
