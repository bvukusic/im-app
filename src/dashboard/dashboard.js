import React from 'react';
import ChatListComponent from '../chatlist/chatlist';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import ChatViewComponent from '../chatview/chatview';
import ChatTextBoxComponent from '../chattextbox/chattextbox';
import NewChatComponent from '../newchat/newchat';
const firebase = require("firebase");

class DashboardComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        };
    }

    componentDidMount = () => {
        this.fetchUserChatCollection();
    }

    render() {
        
        const { classes } = this.props;
        
        return(
        <div>
            <ChatListComponent history={this.props.history} 
            newChatBtnFn={this.newChatBtnClicked} 
            selectChatFn={this.selectChat}
            chats={this.state.chats}
            userEmail={this.state.email}
            selectedChatIndex={this.state.selectedChat}></ChatListComponent>
            
            {this.renderChatViewComponent()}
            {this.renderChatBoxComponent()}
            {this.renderNewChatComponent()}
            
            <Button fullWidth onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button>
        </div>
        );
    }

    fetchUserChatCollection = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr)
                this.props.history.push('/login');
            else {
                await firebase
                    .firestore().collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());
                        //setState is asynchronous
                        await this.setState({ email: _usr.email, chats: chats });
                        console.log(this.state, "Email: " + _usr.email);
                    })
            }
        })
    }

    renderChatViewComponent = () => {
        if (this.state.newChatFormVisible)
        return null 
        else return (<ChatViewComponent user={this.state.email} chat={this.state.chats[this.state.selectedChat]} />)
    }

    renderChatBoxComponent = () => {
        if(this.state.selectedChat !== null && !this.state.newChatFormVisible) 
        return (<ChatTextBoxComponent messageReadFn={this.messageRead} submitMessageFn={this.submitMessage} />)
        else return null
    }

    renderNewChatComponent = () => {
        if (this.state.newChatFormVisible) 
        return (<NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}/>) 
        else return null
    }

    signOut = () => firebase.auth().signOut();

    selectChat = async (chatIndex) => {
        await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
        this.messageRead();
    }

    newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

    clickedChatWhereNotSender = (chatIndex) => this.state.chats[chatIndex]
                                                .messages[this.state.chats[chatIndex].messages.length -1].sender !== this.state.email;

    messageRead = () => {
        const docKeySlot = this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email);
        let docKey = "";
        if(docKeySlot.length !== 0) docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.find(_usr => _usr !== this.state.email));
        if(this.clickedChatWhereNotSender(this.state.selectedChat))
            firebase.firestore().collection('chats').doc(docKey).update({ receiverHasRead: true })
    }

    goToChat = async (docKey, msg) => {
        const usersInChat = docKey.split(':');
        const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
        this.setState({ newChatFormVisible: false });
        await this.selectChat(this.state.chats.indexOf(chat));
        this.submitMessage(msg);
    } 

    newChatSubmit = async (chatObj) => {
        const docKey = this.buildDocKey(chatObj.sendTo);
        await firebase.firestore().collection('chats').doc(docKey).set({
            receiverHasRead: false,
            users: [this.state.email, chatObj.sendTo],
            messages: [{
                message: chatObj.message,
                sender: this.state.email
            }]
        })
        this.setState({ newChatFormVisible: false });
        this.selectChat(this.state.chats.length - 1);
    }

    submitMessage = (msg) => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.find(_usr => _usr !== this.state.email));
        console.log(docKey);
        firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                    messages: firebase.firestore.FieldValue.arrayUnion({
                        sender: this.state.email,
                        message: msg,
                        timestamp: Date.now()
                }),
                receiverHasRead: false
            });
    }

    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');


}

export default withStyles(styles)(DashboardComponent);